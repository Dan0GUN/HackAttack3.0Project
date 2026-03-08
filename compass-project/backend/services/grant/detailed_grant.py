from fastapi import APIRouter
from pydantic import BaseModel
from openai import OpenAI
from models.schema import StartupProfile, GrantInfo
import json
import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)
router2 = APIRouter(prefix="/grant-details", tags=["grant-details"])

BASE_DIR = Path(__file__).resolve().parent.parent.parent
PROMPT_PATH = BASE_DIR / "data" / "second_prompt_grant.txt"



@router2.post("/")
def get_grant_details(grant: GrantInfo):
    # Load prompt template
    with open(PROMPT_PATH, "r") as file:
        prompt_template = file.read()

    prompt = prompt_template.format(
        name=grant.name,
        url=grant.url,
        location=grant.location,
        industry=grant.industry,
        stage=grant.stage,
        team_size=grant.team_size,
        funding_need=grant.funding_need,
        business_model=grant.business_model,
        target_market=grant.target_market
    )

    # Call OpenAI
    response = client.chat.completions.create(
        model="gpt-5-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    # Parse JSON safely
    try:
        grant_details = json.loads(response.choices[0].message.content)
    except json.JSONDecodeError:
        grant_details = {"error": "Failed to parse model output. Ensure it returns valid JSON."}

    return grant_details