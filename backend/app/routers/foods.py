# routers/foods.py
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List

from db import get_session
from models.models import Food, FoodCreate, FoodRead, FoodUpdate

router = APIRouter()

@router.post("/foods", response_model=FoodRead)
async def create_food(*, session: AsyncSession = Depends(get_session), food: FoodCreate):
    new_food = Food.from_orm(food)
    session.add(new_food)
    await session.commit()
    await session.refresh(new_food)
    return new_food

@router.get("/foods", response_model=List[FoodRead])
async def read_foods(*, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Food))
    foods = result.scalars().all()
    return foods

@router.get("/foods/{food_id}", response_model=FoodRead)
async def read_food(*, session: AsyncSession = Depends(get_session), food_id: int):
    food = await session.get(Food, food_id)
    if not food:
        raise HTTPException(status_code=404, detail="Food not found")
    return food

@router.put("/foods/{food_id}", response_model=FoodRead)
async def update_food(*, session: AsyncSession = Depends(get_session), food_id: int, food_update: FoodUpdate):
    food = await session.get(Food, food_id)
    if not food:
        raise HTTPException(status_code=404, detail="Food not found")
    food_data = food_update.dict(exclude_unset=True)
    for key, value in food_data.items():
        setattr(food, key, value)
    session.add(food)
    await session.commit()
    await session.refresh(food)
    return food

@router.delete("/foods/{food_id}", response_model=FoodRead)
async def delete_food(*, session: AsyncSession = Depends(get_session), food_id: int):
    food = await session.get(Food, food_id)
    if not food:
        raise HTTPException(status_code=404, detail="Food not found")
    await session.delete(food)
    await session.commit()
    return food
