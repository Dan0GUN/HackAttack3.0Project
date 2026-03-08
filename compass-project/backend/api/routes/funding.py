from fastapi import APIRouter, HTTPException
from models.startup_profile import StartupProfile
from services.grant_search_service import search_for_matching_grants

router = APIRouter(prefix="/funding", tags=["funding"])

@router.post("/search")
def search_grants(profile: StartupProfile):
    try:
        return search_for_matching_grants(profile)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
#delete this later