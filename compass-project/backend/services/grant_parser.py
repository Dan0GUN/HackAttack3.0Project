import re
from models.parsed_grant import ParsedGrant


KNOWN_REGIONS = [
    "canada",
    "british columbia",
    "alberta",
    "ontario",
    "quebec",
    "manitoba",
    "saskatchewan",
    "nova scotia",
    "new brunswick",
    "newfoundland",
    "prince edward island",
    "northwest territories",
    "nunavut",
    "yukon",
    "united states",
    "global",
    "remote",
]

KNOWN_STAGES = [
    "idea",
    "mvp",
    "prototype",
    "seed",
    "pre-seed",
    "early_revenue",
    "growth",
    "startup",
    "early-stage",
]

KNOWN_SECTORS = [
    "ai",
    "artificial intelligence",
    "software",
    "saas",
    "cleantech",
    "climate",
    "sustainability",
    "healthtech",
    "fintech",
    "biotech",
    "education",
    "agtech",
    "cybersecurity",
    "robotics",
]

KNOWN_FOUNDER_TAGS = [
    "women-led",
    "female founder",
    "black-led",
    "indigenous-led",
    "student founder",
    "youth-led",
    "underrepresented founder",
    "newcomer founder",
]

KNOWN_FUNDING_TAGS = [
    "grant funding",
    "pilot funding",
    "research funding",
    "product development",
    "prototype development",
    "commercialization",
    "market expansion",
    "training",
]


def extract_url(text: str):
    match = re.search(r"https?://\S+", text)
    return match.group(0) if match else None


def extract_money_range(text: str):
    amounts = re.findall(r"\$[\d,]+", text)
    if not amounts:
        return None, None, None

    nums = [int(a.replace("$", "").replace(",", "")) for a in amounts]
    if len(nums) == 1:
        return nums[0], nums[0], "CAD"

    return min(nums), max(nums), "CAD"


def extract_deadline(text: str):
    patterns = [
        r"(?:deadline|apply by|applications due|due date)[:\s]+([A-Za-z]+\s+\d{1,2},\s+\d{4})",
        r"(?:deadline|apply by|applications due|due date)[:\s]+(\d{4}-\d{2}-\d{2})",
        r"([A-Za-z]+\s+\d{1,2},\s+\d{4})",
        r"(\d{4}-\d{2}-\d{2})",
    ]

    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            return match.group(1)

    return None


def extract_known_tags(text: str, known_values: list[str]):
    lowered = text.lower()
    found = [value for value in known_values if value.lower() in lowered]
    return list(dict.fromkeys(found))


def extract_title(text: str):
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    if not lines:
        return None
    return lines[0][:120]


def extract_provider(text: str):
    patterns = [
        r"(?:provided by|offered by|funded by|administered by)[:\s]+([A-Za-z0-9&,\-'. ]+)",
        r"(?:organization|provider)[:\s]+([A-Za-z0-9&,\-'. ]+)",
    ]

    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            return match.group(1).strip()

    return None


def extract_required_documents(text: str):
    known_docs = [
        "business plan",
        "pitch deck",
        "financial statements",
        "budget",
        "project proposal",
        "tax returns",
        "incorporation documents",
        "resume",
        "proof of registration",
        "letters of support",
    ]
    return extract_known_tags(text, known_docs)


def build_summary(text: str):
    clean = " ".join(text.split())
    return clean[:300] if clean else None


def parse_grant_text(raw_text: str) -> ParsedGrant:
    amount_min, amount_max, currency = extract_money_range(raw_text)
    deadline = extract_deadline(raw_text)
    url = extract_url(raw_text)

    title = extract_title(raw_text)
    provider = extract_provider(raw_text)
    regions = extract_known_tags(raw_text, KNOWN_REGIONS)
    stages = extract_known_tags(raw_text, KNOWN_STAGES)
    sectors = extract_known_tags(raw_text, KNOWN_SECTORS)
    founder_tags = extract_known_tags(raw_text, KNOWN_FOUNDER_TAGS)
    funding_tags = extract_known_tags(raw_text, KNOWN_FUNDING_TAGS)
    required_documents = extract_required_documents(raw_text)

    return ParsedGrant(
        title=title,
        provider=provider,
        summary=build_summary(raw_text),
        url=url,
        deadline=deadline,
        amount_min=amount_min,
        amount_max=amount_max,
        currency=currency,
        regions=regions,
        eligible_stages=stages,
        sector_tags=sectors,
        funding_tags=funding_tags,
        founder_tags=founder_tags,
        eligibility_summary="Review raw text for exact eligibility wording.",
        required_documents=required_documents,
        source_type="unknown",
    )