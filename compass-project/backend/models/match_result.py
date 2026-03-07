from pydantic import BaseModel
from typing import List, Dict


class MatchResult(BaseModel):
    grant_id: str
    title: str
    provider: str
    final_score: float
    confidence: float
    score_breakdown: Dict[str, float]
    reasons: List[str]
    warnings: List[str]
    next_steps: List[str]