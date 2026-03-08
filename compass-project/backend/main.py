from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.grant.list_grants import router1
from services.grant.detailed_grant import router2
from services.legal_info.list_legal_info import router3

app = FastAPI(
    title="Compass Grant Finder API",
    description="API for matching startups with relevant grants",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["root"])
def root():
    return {"message": "Compass Grant Finder API is running"}

# Include routers
app.include_router(router1)
app.include_router(router2)
app.include_router(router3)