
from typing import List
from fastapi import Depends, FastAPI, Body, HTTPException, Request
from fastapi.security import OAuth2PasswordBearer
import mongo_asyncio as database
import jwt
from models import *

api_app = FastAPI(title="api")
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_auth_user(req: Request):
    token = req.headers["Authorization"]
    decoded = jwt.decode(token, options={"verify_signature": False})
    print(decoded)
    return f'{decoded["iss"]}+{decoded["sub"]}'


@api_app.get("/backendhealth", response_description="Check API availability", response_model=str)
async def backend_health():
    return "FASTAPI - OK"


@api_app.get("/databasehealth", response_description="Check Database availability", response_model=str)
async def database_health():
    return await database.health()


@api_app.get("/whoami", response_description="Check Database availability", response_model=str)
async def whoami(user_id: str = Depends(get_auth_user)):
    print(user_id)
    return whoami


@api_app.get("/decks", response_description="Get all decks", response_model=List[DeckModel])
async def get_decks(user_id: str = Depends(get_auth_user)):
    return await database.get_decks(user_id)


@api_app.get("/cards", response_description="Get all cards", response_model=List[CardModel])
async def get_cards(user_id: str = Depends(get_auth_user)):
    return await database.get_cards()


@api_app.post("/decks", response_description="Update a decks", response_model=List[DeckModel])
async def sync_decks(user_id: str = Depends(get_auth_user), decks: List[DeckModel] = Body(...)):
    return await database.sync_decks(user_id, decks)


@api_app.post("/cards", response_description="Update a cards", response_model=List[CardModel])
async def sync_cards(user_id: str = Depends(get_auth_user), cards: List[CardModel] = Body(...)):
    return await database.sync_cards(cards)
