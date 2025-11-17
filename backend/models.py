# models.py
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, JSON, Boolean
from sqlalchemy.orm import relationship
from .database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=False)
class HistoryItem(Base):
    __tablename__ = "history_items"
    history = relationship("HistoryItem", back_populates="owner")
    id = Column(Integer, primary_key=True, index=True)
    pergunta = Column(String, index=True)
    resumo_ia = Column(Text)
    resultados = Column(JSON) 
    timestamp = Column(DateTime, default=datetime.datetime.now(datetime.timezone.utc))
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="history_items")