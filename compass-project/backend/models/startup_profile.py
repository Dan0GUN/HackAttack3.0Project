from fastapi import FastAPI
from pydantic import BaseModel

class StartUpInfo(BaseModel):
    location: str
    industry: str
    stage: str
    team_size: int
    funding_need: float
    business_model: str
    target_market: str

class PromptRequest(BaseModel):
    prompt: str
    