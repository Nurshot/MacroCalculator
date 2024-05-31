# main.py
import logging
from fastapi import Depends, FastAPI
from sqlmodel.ext.asyncio.session import AsyncSession

from db import get_session, init_db
from routers import song
from routers import foods,recipes,users,favorite_recipes,favorite_foods

import uvicorn


app = FastAPI()

@app.on_event("startup")
async def on_startup():
    await init_db()


app.include_router(song.router)
app.include_router(foods.router)
app.include_router(recipes.router)
app.include_router(users.router)
app.include_router(favorite_recipes.router)
app.include_router(favorite_foods.router)


@app.get("/ping")
async def pong():
    return {"ping": "pong!"}


if __name__ == '__main__':
    uvicorn.run("main:app", port=8000, host='127.0.0.1',reload=True)