import logging
from fastapi import Depends, FastAPI
from sqlmodel.ext.asyncio.session import AsyncSession

from db import get_session, init_db
from fastapi.middleware.cors import CORSMiddleware
from routers import foods, recipes, users, favorite_recipes, favorite_foods, meals
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from fastapi.responses import JSONResponse
from pydantic import BaseModel

import uvicorn


class Settings(BaseModel):
    authjwt_secret_key: str = "raba"


@AuthJWT.load_config
def get_config():
    return Settings()


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000",
    "http://localhost:5173",
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

@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message}
    )

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
    uvicorn.run("main:app", port=8000, host='127.0.0.1', reload=True)
