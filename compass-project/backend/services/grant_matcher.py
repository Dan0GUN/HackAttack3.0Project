from datetime import datetime
from typing import List
from models.startup_profile import StartupProfile
from models.grant import Grant
from models.match_result import MatchResult


WEIGHTS = {
    "sector": 0.25,
    "geography": 0.20,
    "stage": 0.15,
    "funding_need": 0.15,
    "founder_fit": 0.10,
    "text_similarity": 0.10,
    "deadline": 0.03,
    "source_trust": 0.02,
}


def normalize(text: str) -> str:
    return text.strip().lower()


def overlap_score(user_items: List[str], grant_items: List[str]) -> float:
    if not user_items or not grant_items:
        return 0.0

    user_set = {normalize(x) for x in user_items}
    grant_set = {normalize(x) for x in grant_items}

    matches = user_set.intersection(grant_set)
    return len(matches) / max(len(user_set), 1)


def geography_score(profile: StartupProfile, grant: Grant) -> float:
    grant_regions = {normalize(r) for r in grant.regions}
    country = normalize(profile.country)
    province = normalize(profile.province) if profile.province else None
    city = normalize(profile.city) if profile.city else None

    if city and city in grant_regions:
        return 1.0
    if province and province in grant_regions:
        return 0.9
    if country in grant_regions:
        return 0.75
    if "global" in grant_regions or "remote" in grant_regions:
        return 0.6
    return 0.0


def stage_score(profile: StartupProfile, grant: Grant) -> float:
    if normalize(profile.stage) in {normalize(x) for x in grant.eligible_stages}:
        return 1.0
    return 0.0


def deadline_score(deadline: str | None) -> float:
    if not deadline:
        return 0.4

    try:
        deadline_date = datetime.fromisoformat(deadline)
    except ValueError:
        return 0.3

    days_left = (deadline_date - datetime.now()).days

    if days_left < 0:
        return 0.0
    if days_left <= 7:
        return 1.0
    if days_left <= 30:
        return 0.8
    if days_left <= 90:
        return 0.6
    return 0.4


def text_similarity_score(profile: StartupProfile, grant: Grant) -> float:
    """
    Cheap MVP approximation.
    Later replace this with embeddings.
    """
    profile_words = set(normalize(profile.summary).split())
    grant_words = set(normalize(grant.summary).split())

    if not profile_words or not grant_words:
        return 0.0

    overlap = profile_words.intersection(grant_words)
    return min(len(overlap) / 20, 1.0)


def passes_hard_filters(profile: StartupProfile, grant: Grant) -> tuple[bool, List[str]]:
    warnings = []

    geo = geography_score(profile, grant)
    if geo == 0:
        warnings.append("Geographic eligibility appears incompatible.")
        return False, warnings

    if stage_score(profile, grant) == 0:
        warnings.append("Startup stage may not meet this grant's eligibility.")
        return False, warnings

    if deadline_score(grant.deadline) == 0:
        warnings.append("This grant deadline has likely passed.")
        return False, warnings

    return True, warnings


def build_reasons(
    profile: StartupProfile,
    grant: Grant,
    sector: float,
    geo: float,
    stage: float,
    funding: float,
    founder: float,
    text_sim: float
) -> List[str]:
    reasons = []

    if sector > 0:
        reasons.append("Strong sector alignment.")
    if geo >= 0.75:
        reasons.append("Geographic eligibility looks compatible.")
    if stage == 1.0:
        reasons.append("Startup stage fits the program requirements.")
    if funding > 0:
        reasons.append("Funding goals align with the grant purpose.")
    if founder > 0:
        reasons.append("Founder/background tags overlap with this opportunity.")
    if text_sim > 0.2:
        reasons.append("Startup description is semantically similar to the grant focus.")

    return reasons


def build_next_steps(grant: Grant) -> List[str]:
    steps = [
        "Review full eligibility criteria.",
        "Prepare a short funding narrative.",
        "Save supporting documents and deadlines.",
    ]

    if grant.deadline:
        steps.append("Confirm submission deadline and required attachments.")

    return steps


def score_grant(profile: StartupProfile, grant: Grant) -> MatchResult | None:
    passed, warnings = passes_hard_filters(profile, grant)
    if not passed:
        return None

    sector = overlap_score(profile.sectors, grant.sector_tags)
    geo = geography_score(profile, grant)
    stage = stage_score(profile, grant)
    funding = overlap_score(profile.funding_needs, grant.funding_tags)
    founder = overlap_score(profile.founder_tags, grant.founder_tags)
    text_sim = text_similarity_score(profile, grant)
    deadline = deadline_score(grant.deadline)
    source_trust = max(0.0, min(grant.source_trust_score, 1.0))

    breakdown = {
        "sector": sector * WEIGHTS["sector"],
        "geography": geo * WEIGHTS["geography"],
        "stage": stage * WEIGHTS["stage"],
        "funding_need": funding * WEIGHTS["funding_need"],
        "founder_fit": founder * WEIGHTS["founder_fit"],
        "text_similarity": text_sim * WEIGHTS["text_similarity"],
        "deadline": deadline * WEIGHTS["deadline"],
        "source_trust": source_trust * WEIGHTS["source_trust"],
    }

    final_score = round(sum(breakdown.values()) * 100, 2)
    confidence = round(min(final_score / 100, 1.0), 2)

    reasons = build_reasons(profile, grant, sector, geo, stage, funding, founder, text_sim)
    next_steps = build_next_steps(grant)

    return MatchResult(
        grant_id=grant.id,
        title=grant.title,
        provider=grant.provider,
        final_score=final_score,
        confidence=confidence,
        score_breakdown={k: round(v, 3) for k, v in breakdown.items()},
        reasons=reasons,
        warnings=warnings,
        next_steps=next_steps,
    )


def match_grants(profile: StartupProfile, grants: List[Grant], top_k: int = 10) -> List[MatchResult]:
    results = []

    for grant in grants:
        scored = score_grant(profile, grant)
        if scored:
            results.append(scored)

    results.sort(key=lambda x: x.final_score, reverse=True)
    return results[:top_k]