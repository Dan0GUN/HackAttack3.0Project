from fastapi import APIRouter
import json
from pathlib import Path

from core.openai_client import client
from models.schema import LegalRequest

router3 = APIRouter(prefix="/legal", tags=["legal"])

# Path to prompt template
BASE_DIR = Path(__file__).resolve().parent.parent.parent
PROMPT_PATH = BASE_DIR / "data" / "legal_prompt.txt"


@router3.post("/")
def analyze_legal(data: LegalRequest):

    with open(PROMPT_PATH, "r", encoding="utf-8") as file:
        prompt_template = file.read()

    prompt = prompt_template.format(
        industry=data.industry,
        location=data.location,
        stage=data.stage,
        idea_description=data.idea_description
    )

    response = client.chat.completions.create(
        model="gpt-5-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    content = response.choices[0].message.content

    try:
        legal_info = json.loads(content)
    except json.JSONDecodeError:
        return {
            "error": "Model did not return valid JSON",
            "raw_output": content
        }

    roadmap = [
        f"Step {i+1} — {step}"
        for i, step in enumerate(legal_info.get("legal_roadmap", []))
    ]

    return {
        "business_registration": legal_info.get("business_registration", ""),
        "licenses_permits": legal_info.get("licenses_permits", []),
        "compliance_certificates": legal_info.get("compliance_certificates", []),
        "ip_advice": legal_info.get("ip_advice", ""),
        "legal_roadmap": roadmap,
        "references_links": legal_info.get("references_links", [])
    }