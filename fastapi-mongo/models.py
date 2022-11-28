from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from typing import List


class UserModel(BaseModel):
    id: str = Field(...)
    deck_ids: List[str] = Field(...)


class DeckModel(BaseModel):
    id: str = Field(...)
    name: str = Field(...)
    description: str = Field(...)
    sync: str = Field(...)


class CardModel(BaseModel):
    id: str = Field(...)
    question: str = Field(...)
    answer: str = Field(...)
    deck_id: str = Field(...)
    sync: str = Field(...)
    assessment: Optional[str] = Field('None')
    last_answer: Optional[datetime] = Field(0)
