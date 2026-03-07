from pydantic import BaseModel
from typing import List, Optional


class Grant(BaseModel):
    id: str
    title: str
    provider: str
    summary: str
    url: str

    regions: List[str]
    eligible_stages: List[str]
    sector_tags: List[str]
    funding_tags: List[str]
    founder_tags: List[str] = []

    deadline: Optional[str] = None
    amount_min: Optional[int] = None
    amount_max: Optional[int] = None

    source_type: str
    source_trust_score: float = 0.8