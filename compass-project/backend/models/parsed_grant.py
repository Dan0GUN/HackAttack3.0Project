from pydantic import BaseModel
from typing import List, Optional


class ParsedGrant(BaseModel):
    title: Optional[str] = None
    provider: Optional[str] = None
    summary: Optional[str] = None
    url: Optional[str] = None

    deadline: Optional[str] = None
    amount_min: Optional[int] = None
    amount_max: Optional[int] = None
    currency: Optional[str] = None

    regions: List[str] = []
    eligible_stages: List[str] = []
    sector_tags: List[str] = []
    funding_tags: List[str] = []
    founder_tags: List[str] = []

    eligibility_summary: Optional[str] = None
    required_documents: List[str] = []
    source_type: Optional[str] = None