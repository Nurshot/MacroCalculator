# routers/meals.py
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List

from db import get_session
from models.models import Meal, MealCreate, MealRead, MealUpdate

router = APIRouter()

@router.post("/meals", response_model=MealRead)
async def create_meal(*, session: AsyncSession = Depends(get_session), meal: MealCreate):
    new_meal = Meal.from_orm(meal)
    session.add(new_meal)
    await session.commit()
    await session.refresh(new_meal)
    return new_meal

@router.get("/meals", response_model=List[MealRead])
async def read_meals(*, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Meal))
    meals = result.scalars().all()
    return meals

@router.get("/meals/{meal_id}", response_model=MealRead)
async def read_meal(*, session: AsyncSession = Depends(get_session), meal_id: int):
    meal = await session.get(Meal, meal_id)
    if not meal:
        raise HTTPException(status_code=404, detail="Meal not found")
    return meal

@router.put("/meals/{meal_id}", response_model=MealRead)
async def update_meal(*, session: AsyncSession = Depends(get_session), meal_id: int, meal_update: MealUpdate):
    meal = await session.get(Meal, meal_id)
    if not meal:
        raise HTTPException(status_code=404, detail="Meal not found")
    meal_data = meal_update.dict(exclude_unset=True)
    for key, value in meal_data.items():
        setattr(meal, key, value)
    session.add(meal)
    await session.commit()
    await session.refresh(meal)
    return meal

@router.delete("/meals/{meal_id}", response_model=MealRead)
async def delete_meal(*, session: AsyncSession = Depends(get_session), meal_id: int):
    meal = await session.get(Meal, meal_id)
    if not meal:
        raise HTTPException(status_code=404, detail="Meal not found")
    await session.delete(meal)
    await session.commit()
    return meal
