from models import *
from typing import List
import bson
from motor.motor_asyncio import AsyncIOMotorClient
import ssl as ssl


# replace this with your MongoDB connection string
conn_str = "mongodb://localhost:27017"
# conn_str = "mongodb+srv://flashcards:rNNH9IwXUN7jbwa7@cluster0.4nxap.mongodb.net/flashcards?retryWrites=true&w=majority"
client: AsyncIOMotorClient = None


async def connect():
    """Create database connection."""
    global client
    client = AsyncIOMotorClient(
        conn_str, serverSelectionTimeoutMS=5000, ssl_cert_reqs=ssl.CERT_NONE)


async def close():
    """Close database connection."""
    client.close()


async def health():
    try:
        await client.flashcards.list_collections()
        return "MONGODB - OK"
    except Exception as ex:
        print("Database health", ex)
        return "MONGODB - NOT OK"


async def get_decks(user_id: str):
    user: UserModel = await client.flashcards.users.find_one({"id": user_id}, {'_id': False})
    decks = await client.flashcards.decks.find({"id": {"$in": user["deck_ids"]}}, {'_id': False}).to_list(1000)
    print("Decks", decks)
    return decks


async def get_cards():
    cards = await client.flashcards.cards.find({}, {'_id': False}).to_list(1000)
    print("Get cards", cards)
    return cards


async def sync_decks(user_id: str, decks: List[DeckModel]):
    print("Sync decks", decks, user_id)
    for deck in decks:
        if deck.sync == "Add" or deck.sync == "Update":
            print("Decks.Add", deck)
            await client.flashcards.users.update_one({"id": user_id}, {"$push": {"deck_ids": deck.id}}, {"upsert": True})
            deck.sync = "None"
            await client.flashcards.decks.update_one({"id": deck.id}, bson.SON(deck), {"upsert": True})
            # await client.flashcards.decks.insert_one(bson.SON(deck))
        elif deck.sync == "Delete":
            print("Decks.Delete", deck)
            await client.flashcards.users.update({"id": user_id}, {"$pull": {"deck_ids": deck.id}})
            # No delete necessary. to clean up, delete cards also
            await client.flashcards.decks.delete_one({"id": deck.id})
            await client.flashcards.cards.delete({"deck_id": deck.id})
        # elif deck.sync == "Update":
        #     print("Decks.Update", deck)
        #     deck.sync = "None"
        #     await client.flashcards.decks.update_one({"id": deck.id}, bson.SON(deck))
        else:
            print("Decks.None", deck)

    user: UserModel = await client.flashcards.users.find_one({"id": user_id}, {'_id': False})
    print("user", user)
    decks = await client.flashcards.decks.find({id: {"$in": user["deck_ids"]}}, {'_id': False}).to_list(1000)
    print("Synced decks", decks)
    return decks


async def sync_cards(cards: List[CardModel]):
    print("Sync cards", cards)
    for card in cards:
        if card.sync == "Add" or card.sync == "Update":
            print("Cards.Add", card)
            card.sync = "None"
            # await client.flashcards.cards.insert_one(bson.SON(card))
            await client.flashcards.cards.update_one({"id": card.id}, bson.SON(card), {"upsert": True})
        elif card.sync == "Delete":
            print("Cards.Delete", card)
            await client.flashcards.cards.delete_one({"id": card.id})
        # elif card.sync == "Update":
        #     print("Cards.Update", card)
        #     card.sync = "None"
        #     await client.flashcards.cards.update_one({"id": card.id}, bson.SON(card))
        else:
            print("Cards.None", card)

    cards = await client.flashcards.cards.find({}, {'_id': False}).to_list(1000)
    print("Synced cards", cards)
    return cards
