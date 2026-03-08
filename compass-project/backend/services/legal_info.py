import json
from openai import OpenAI
from fastapi import APIRouter

client = OpenAI()

router2 = APIRouter(prefix="/LegalRoute", tags=["LegalRoute"])



@router2.post("/")
def analyze_legal(data):

    with open("compass-project/backend/data/legal_prompt.txt", "r") as file:
        prompt_template = file.read()

    prompt = prompt_template.format(
        industry=data.industry,
        location=data.location,
        stage=data.stage,
        idea_description=data.idea_description
    )

    response = client.chat.completions.create(
        model="gpt-5-mini",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"}
    )

    legal_info = json.loads(response.choices[0].message.content)

    roadmap = []
    for i, step in enumerate(legal_info["legal_roadmap"]):
        roadmap.append(f"Step {i+1} — {step}")

    return {
        "business_registration": legal_info["business_registration"],
        "licenses_permits": legal_info["licenses_permits"],
        "compliance_certificates": legal_info["compliance_certificates"],
        "ip_advice": legal_info["ip_advice"],
        "legal_roadmap": roadmap,
        "references_links": legal_info["references_links"]
    }