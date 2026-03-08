from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import List, Optional


class StartupProfile(BaseModel):
    #schema for first prompt
    location: str
    country: str
    province: Optional[str] = None
    city: Optional[str] = None

    #schema for second prompt
    industry: str
    stage: str
    team_size: int
    funding_need: float
    business_model: str
    target_market: str
    idea_description: str

class PromptRequest(BaseModel):
    prompt: str

# Input model for detailed grant info
class GrantInfo(BaseModel):
    name: str
    url: str
    location: str
    industry: str
    stage: str
    team_size: int
    funding_need: float
    business_model: str
    target_market: str

class LegalRequest(BaseModel):
    industry: str
    location: str
    stage: str
    idea_description: str
    
