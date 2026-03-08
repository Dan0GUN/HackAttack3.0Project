from pathlib import Path
from dotenv import dotenv_values
from openai import OpenAI

BASE_DIR = Path(__file__).resolve().parent.parent
ENV_PATH = BASE_DIR / ".env"

env = dotenv_values(ENV_PATH)
api_key = env.get("OPENAI_API_KEY")

if not api_key:
    raise ValueError(f"OPENAI_API_KEY not found in {ENV_PATH}")

client = OpenAI(api_key=api_key)