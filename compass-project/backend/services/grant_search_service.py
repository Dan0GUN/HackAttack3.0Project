from models.startup_profile import StartupProfile
from repositories.grant_repository import load_all_grants
from services.grant_matcher import match_grants


def search_for_matching_grants(profile: StartupProfile):
    grants = load_all_grants()

    if not grants:
        return {
            "matches": [],
            "total_grants_loaded": 0,
            "message": "No grants found. Add manual grants or save parsed grants first."
        }

    matches = match_grants(profile, grants)

    return {
        "matches": [m.model_dump() for m in matches],
        "total_grants_loaded": len(grants),
        "message": "Grant search completed successfully"
    }