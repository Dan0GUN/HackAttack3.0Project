from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from services.grant.list_grants import router1, generate_funding_recommendations
from services.grant.detailed_grant import router2
from services.legal_info.list_legal_info import router3
from services.grant.converters import convert_questionnaire_to_startup_profile


app = FastAPI(
    title="Compass Grant Finder API",
    description="API for matching startups with relevant grants",
    version="1.0.0"
)

# Allow frontend (React) to call the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Model representing the questionnaire payload sent from the frontend
class FundingRequest(BaseModel):
    location: str
    industry: str
    stage: str
    team_size: str
    funding_need: str
    business_model: str
    target_market: str


@app.get("/", tags=["root"])
def root():
    return {"message": "Compass Grant Finder API is running"}


@app.post("/find-funding", tags=["funding"])
async def find_funding(data: FundingRequest):
    """
    Endpoint used by the frontend questionnaire.

    Flow:
    1. Receive questionnaire answers from React
    2. Convert them into the StartupProfile schema used by the AI system
    3. Call the grant recommendation engine
    4. Return results to the dashboard
    """

    startup_profile = convert_questionnaire_to_startup_profile(data)

    result = generate_funding_recommendations(startup_profile)

    return {
        "matches": result["grants"],
        "recommended_funding_plan": result["recommended_funding_plan"]
    }


# Existing routers
app.include_router(router1)
app.include_router(router2)
app.include_router(router3)