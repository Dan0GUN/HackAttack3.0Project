from fastapi import APIRouter
from models.schema import StartupProfile
from core.openai_client import client
import json
from pathlib import Path

router1 = APIRouter(prefix="/funding", tags=["funding"])

BASE_DIR = Path(__file__).resolve().parent.parent.parent
PROMPT_PATH = BASE_DIR / "data" / "first_prompt_grant.txt"

@router1.post("/")
def find_funding(data: StartupProfile):

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
        messages=[{"role": "user", "content": prompt}]
    )

    try:
        grants = json.loads(response.choices[0].message.content)
    except json.JSONDecodeError:
        grants = []

    funding_plan = []

    for i, grant in enumerate(grants):
        step = f"Step {i+1} — Apply to {grant['name']}"
        funding_plan.append(step)

    return {
        "recommended_funding_plan": funding_plan,
        "grants": grants
    }