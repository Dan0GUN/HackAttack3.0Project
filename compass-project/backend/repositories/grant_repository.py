import json
import os
from typing import List
from models.grant import Grant


def load_json_list(file_path: str) -> list:
    if not os.path.exists(file_path):
        return []

    with open(file_path, "r") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            return []

    return data if isinstance(data, list) else []


def normalize_list(values: list[str]) -> list[str]:
    cleaned = []
    for value in values:
        if not value:
            continue
        cleaned.append(value.strip().lower().replace(" ", "_"))
    return list(dict.fromkeys(cleaned))


def normalize_regions(values: list[str]) -> list[str]:
    cleaned = []
    for value in values:
        if not value:
            continue
        cleaned.append(value.strip().lower())
    return list(dict.fromkeys(cleaned))


def parsed_grant_to_grant(parsed: dict, index: int) -> Grant:
    return Grant(
        id=parsed.get("id") or f"parsed_{index + 1}",
        title=parsed.get("title") or f"Parsed Grant {index + 1}",
        provider=parsed.get("provider") or "Unknown Provider",
        summary=parsed.get("summary") or "",
        url=parsed.get("url") or "",
        regions=normalize_regions(parsed.get("regions", [])),
        eligible_stages=normalize_list(parsed.get("eligible_stages", [])),
        sector_tags=normalize_list(parsed.get("sector_tags", [])),
        funding_tags=normalize_list(parsed.get("funding_tags", [])),
        founder_tags=normalize_list(parsed.get("founder_tags", [])),
        deadline=parsed.get("deadline"),
        amount_min=parsed.get("amount_min"),
        amount_max=parsed.get("amount_max"),
        source_type=parsed.get("source_type") or "unknown",
        source_trust_score=float(parsed.get("source_trust_score", 0.65)),
    )


def load_manual_grants() -> List[Grant]:
    items = load_json_list("data/grants.json")
    grants: List[Grant] = []

    for item in items:
        try:
            grants.append(Grant(**item))
        except Exception:
            continue

    return grants


def load_parsed_grants() -> List[Grant]:
    items = load_json_list("data/parsed_grants.json")
    grants: List[Grant] = []

    for i, item in enumerate(items):
        try:
            grants.append(parsed_grant_to_grant(item, i))
        except Exception:
            continue

    return grants


def load_all_grants() -> List[Grant]:
    return load_manual_grants() + load_parsed_grants()