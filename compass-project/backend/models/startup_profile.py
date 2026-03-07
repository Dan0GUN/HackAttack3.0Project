from pydantic import BaseModel
from typing import List, Optional


class StartupProfile(BaseModel):
    startup_name: Optional[str] = None
    stage: str
    sectors: List[str]
    country: str
    province: Optional[str] = None
    city: Optional[str] = None
    funding_needs: List[str]
    founder_tags: List[str] = []
    business_model: Optional[str] = None
    team_size: Optional[int] = None
    summary: str