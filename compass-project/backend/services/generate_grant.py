from fastapi import APIRouter
from pydantic import BaseModel
from openai import OpenAI
from models.startup_profile import StartUpInfo
import json
import os
from dotenv import load_dotenv

load_dotenv()  

api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)
router1 = APIRouter(prefix="/funding", tags=["funding"])



@router1.post("/")
def find_funding(data: StartUpInfo):
    with open("compass-project/backend/data/prompt.txt", "r") as file:
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
    
    grants = json.loads(response.choices[0].message.content)

    funding_plan = []

    for i, grant in enumerate(grants):
        step = f"Step {i+1} — Apply to {grant['name']} ({grant.get('match_score', 'N/A')}% match)"
        funding_plan.append(step)

    return {
        "recommended_funding_plan": funding_plan,
        "grants": grants
    }


#how to improve
#give back a percentage score of best funding option
#make prompt more specific to the startup's needs and characteristics
#make prompt smaller as well so it runs faster and more efficiently
#add tools=[{"type": "web_search"}], to the response to allow the model to search the web for up-to-date funding opportunities, and then use that information to generate a more accurate and relevant funding plan.

