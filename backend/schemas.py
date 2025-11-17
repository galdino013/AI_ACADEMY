# schemas.py
from pydantic import BaseModel
from typing import List, Optional, Any
import datetime

class HistoryItemBase(BaseModel):
    pergunta: str
    resumo_ia: str
    resultados: List[Any]

class HistoryItemCreate(HistoryItemBase):
    pass

class HistoryItem(HistoryItemBase):
    id: int
    owner_id: int
    timestamp: datetime.datetime

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    history_items: List[HistoryItem] = []
    is_active: bool

    class Config:
        from_attributes = True
        
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None