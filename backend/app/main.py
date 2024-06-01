# main.py
import logging
from fastapi import Depends, FastAPI
from sqlmodel.ext.asyncio.session import AsyncSession

from db import get_session, init_db
from fastapi.middleware.cors import CORSMiddleware
from routers import foods,recipes,users,favorite_recipes,favorite_foods,meals

import uvicorn


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000",
    "http://localhost:5173",  # Add this line
    "localhost:5173" 
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.on_event("startup")
async def on_startup():
    await init_db()



app.include_router(foods.router)
app.include_router(recipes.router)
app.include_router(users.router)
app.include_router(favorite_recipes.router)
app.include_router(favorite_foods.router)
app.include_router(meals.router)


@app.get("/ping")
async def pong():
    return {"ping": "pong!"}


if __name__ == '__main__':
    uvicorn.run("main:app", port=8000, host='127.0.0.1',reload=True)