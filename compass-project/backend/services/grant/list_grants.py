from fastapi import APIRouter
from models.schema import StartupProfile
from core.openai_client import client
import json
import re
from pathlib import Path

router1 = APIRouter(prefix="/funding", tags=["funding"])

BASE_DIR = Path(__file__).resolve().parent.parent.parent
PROMPT_PATH = BASE_DIR / "data" / "first_prompt_grant.txt"


def extract_json_array(raw_text: str):
    """
    Try to extract a JSON array from a model response.

    This handles common LLM behavior such as:
    - wrapping JSON in ```json code fences
    - adding explanatory text before/after the JSON
    - returning malformed surrounding text with a valid array inside

    Returns:
        list if successful
        [] if no valid JSON array can be extracted
    """
    if not raw_text:
        return []

    cleaned = raw_text.strip()

    # Remove markdown code fences if present
    cleaned = cleaned.replace("```json", "").replace("```", "").strip()

    # First try parsing the whole cleaned response directly
    try:
        parsed = json.loads(cleaned)
        if isinstance(parsed, list):
            return parsed
        if isinstance(parsed, dict):
            return [parsed]
    except json.JSONDecodeError:
        pass

    # If direct parse fails, try extracting the first JSON array block
    match = re.search(r"$begin:math:display$\\s\*\{\.\*\}\\s\*$end:math:display$", cleaned, re.DOTALL)
    if match:
        candidate = match.group(0)
        try:
            parsed = json.loads(candidate)
            if isinstance(parsed, list):
                return parsed
        except json.JSONDecodeError:
            pass

    return []


def generate_funding_recommendations(data: StartupProfile):
    """
    Core grant recommendation logic.

    This is separated from the route so it can be reused by:
    1. the existing /funding/ router
    2. the frontend questionnaire route in main.py (/find-funding)

    Input:
        StartupProfile

    Output:
        {
            "recommended_funding_plan": [...],
            "grants": [...]
        }
    """
    with open(PROMPT_PATH, "r") as file:
        prompt_template = file.read()

    prompt = prompt_template.format(
        location=data.location,
        industry=data.industry,
        stage=data.stage,
        team_size=data.team_size,
        funding_need=data.funding_need,
        business_model=data.business_model,
        target_market=data.target_market
    )

    response = client.chat.completions.create(
        model="gpt-5-mini",
        messages=[
            {
                "role": "system",
                "content": (
                    "Return only valid JSON. "
                    "The response must be a JSON array of grant objects. "
                    'Each object should include: "name", "amount", and "reason". '
                    "Do not include markdown fences or extra commentary."
                ),
            },
            {"role": "user", "content": prompt},
        ]
    )

    raw_output = response.choices[0].message.content
    print("RAW AI OUTPUT:", raw_output)

    grants = extract_json_array(raw_output)

    if not grants:
        print("Failed to parse AI output into grant list.")

    # Normalize output so the frontend dashboard has predictable keys.
    normalized_grants = []
    for i, grant in enumerate(grants):
        if not isinstance(grant, dict):
            continue

        normalized_grants.append({
            "name": grant.get("name", f"Grant {i + 1}"),
            "amount": grant.get("amount", "Amount not specified"),
            "reason": grant.get("reason", "No reason provided"),
            **grant
        })

    funding_plan = []
    for i, grant in enumerate(normalized_grants):
        funding_plan.append(f"Step {i + 1} — Apply to {grant['name']}")

    print("NORMALIZED GRANTS:", normalized_grants)

    return {
        "recommended_funding_plan": funding_plan,
        "grants": normalized_grants
    }


@router1.post("/")
def find_funding(data: StartupProfile):
    """
    Route for directly submitting a fully formed StartupProfile.
    """
    return generate_funding_recommendations(data)