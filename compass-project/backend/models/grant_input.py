from pydantic import BaseModel


class GrantPasteInput(BaseModel):
    raw_text: str