# routers/favorite_foods.py
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List

from db import get_session
from models.models import FavoriteFood, FavoriteFoodCreate, FavoriteFoodRead

router = APIRouter()

@router.post("/favorite_foods", response_model=FavoriteFoodRead)
async def create_favorite_food(*, session: AsyncSession = Depends(get_session), favorite_food: FavoriteFoodCreate):
    new_favorite_food = FavoriteFood.from_orm(favorite_food)
    session.add(new_favorite_food)
    await session.commit()
    await session.refresh(new_favorite_food)
    return new_favorite_food

@router.get("/favorite_foods", response_model=List[FavoriteFoodRead])
async def read_favorite_foods(*, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(FavoriteFood))
    favorite_foods = result.scalars().all()
    return favorite_foods

@router.get("/favorite_foods/{favorite_food_id}", response_model=FavoriteFoodRead)
async def read_favorite_food(*, session: AsyncSession = Depends(get_session), favorite_food_id: int):
    favorite_food = await session.get(FavoriteFood, favorite_food_id)
    if not favorite_food:
        raise HTTPException(status_code=404, detail="Favorite food not found")
    return favorite_food

@router.delete("/favorite_foods/{favorite_food_id}", response_model=FavoriteFoodRead)
async def delete_favorite_food(*, session: AsyncSession = Depends(get_session), favorite_food_id: int):
    favorite_food = await session.get(FavoriteFood, favorite_food_id)
    if not favorite_food:
        raise HTTPException(status_code=404, detail="Favorite food not found")
    await session.delete(favorite_food)
    await session.commit()
    return favorite_food
