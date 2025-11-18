# security.py
import os
from datetime import datetime, timedelta, timezone
from typing import Optional
from dotenv import load_dotenv
from jose import JWTError, jwt
from passlib.context import CryptContext
from pathlib import Path
from .import schemas 

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(dotenv_path=BASE_DIR / ".env")

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

# --- Segredos de Autenticação (Login) ---
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 

# --- Segredos de Confirmação de E-mail ---
# (Adicione esta chave ao seu .env! Deve ser DIFERENTE da SECRET_KEY)
EMAIL_SECRET_KEY = os.getenv("EMAIL_SECRET_KEY") 
EMAIL_TOKEN_EXPIRE_MINUTES = 1440 # 24 horas

if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY não encontrada no .env. (Rode 'openssl rand -hex 32' para gerar uma)")

if not EMAIL_SECRET_KEY:
    raise RuntimeError("EMAIL_SECRET_KEY não encontrada no .env. (Rode 'openssl rand -hex 32' para gerar uma)")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

# --- Funções de Token de Acesso (Login) ---

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str, credentials_exception: Exception) -> Optional[schemas.TokenData]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
    except JWTError:
        raise credentials_exception
    return token_data

# --- Funções de Token de Confirmação (E-mail) ---
# (Esta era a lógica que faltava)

def create_confirmation_token(username: str) -> str:
    """
    Cria um token JWT específico para confirmação de e-mail.
    """
    expire = datetime.now(timezone.utc) + timedelta(minutes=EMAIL_TOKEN_EXPIRE_MINUTES)
    to_encode = {
        "sub": username,
        "exp": expire,
        "scope": "confirmation" # Define o "escopo" para não ser confundido com um token de login
    }
    encoded_jwt = jwt.encode(to_encode, EMAIL_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_confirmation_token(token: str, credentials_exception: Exception) -> Optional[str]:
    """
    Verifica um token JWT de confirmação de e-mail.
    Retorna o username se for válido.
    """
    try:
        payload = jwt.decode(token, EMAIL_SECRET_KEY, algorithms=[ALGORITHM])
        
        # Verifica se o escopo é de confirmação
        if payload.get("scope") != "confirmation":
            raise credentials_exception
            
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
            
    except JWTError:
        raise credentials_exception
    
    return username