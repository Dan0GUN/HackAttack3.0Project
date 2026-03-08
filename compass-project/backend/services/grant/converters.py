from models.schema import StartupProfile


def convert_questionnaire_to_startup_profile(data):
    """
    Convert questionnaire answers from the frontend into the StartupProfile
    format expected by the grant recommendation system.

    The frontend sends human-readable strings such as:
    - team_size: "2–5 people"
    - funding_need: "$10K – $50K"

    The AI grant logic expects:
    - team_size as an int
    - funding_need as a float
    - required extra fields like country, province, and idea_description
    """

    team_size_map = {
        "Solo founder": 1,
        "2–5 people": 4,
        "6–10 people": 8,
        "10+": 10,
    }

    funding_map = {
        "Under $10K": 10000.0,
        "$10K – $50K": 50000.0,
        "$50K – $250K": 250000.0,
        "$250K – $1M": 1000000.0,
        "$1M+": 1000000.0,
    }

    return StartupProfile(
        location=data.location,
        country="Canada",
        province=data.location,
        city=None,
        industry=data.industry,
        stage=data.stage,
        team_size=team_size_map.get(data.team_size, 1),
        funding_need=funding_map.get(data.funding_need, 10000.0),
        business_model=data.business_model,
        target_market=data.target_market,
        idea_description=""
    )