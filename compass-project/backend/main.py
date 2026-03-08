from fastapi import FastAPI
from models.startup_profile import StartupProfile
from services.grant_parser import parse_grant_text
from services.grant_search_service import search_for_matching_grants
from services.generate_grant import router1
from services.legal_info import router2
import json
import os

app = FastAPI(
    title="Compass Grant Finder API",
    description="API for matching startups with relevant grants",
    version="1.0.0"
)


@app.get("/")
def root():
    return {"message": "Compass Grant Finder API is running"}

#this include the generating_grant router
@app.include_router(router1)


@app.include_router(router2)


@app.post("/save-parsed-grant")
def save_parsed_grant(payload: GrantPasteInput):
    parsed = parse_grant_text(payload.raw_text)
    parsed_data = parsed.model_dump()

    file_path = "data/parsed_grants.json"

    if os.path.exists(file_path):
        with open(file_path, "r") as f:
            try:
                grants = json.load(f)
            except json.JSONDecodeError:
                grants = []
    else:
        grants = []

    grants.append(parsed_data)

    with open(file_path, "w") as f:
        json.dump(grants, f, indent=2)

    return {
        "message": "Grant parsed and saved successfully",
        "saved_grant": parsed_data
    }


@app.post("/search-grants")
def search_grants(profile: StartupProfile):
    return search_for_matching_grants(profile)