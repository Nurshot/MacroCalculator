# routers/user_meals.py
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List

from db import get_session
from models.models import UserMeal, UserMealCreate, UserMealRead, UserMealUpdate

router = APIRouter()

@router.post("/user_meals", response_model=UserMealRead)
async def create_user_meal(*, session: AsyncSession = Depends(get_session), user_meal: UserMealCreate):
    new_user_meal = UserMeal.from_orm(user_meal)
    session.add(new_user_meal)
    await session.commit()
    await session.refresh(new_user_meal)
    return new_user_meal

@router.get("/user_meals", response_model=List[UserMealRead])
async def read_user_meals(*, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(UserMeal))
    user_meals = result.scalars().all()
    return user_meals

@router.get("/user_meals/{user_meal_id}", response_model=UserMealRead)
async def read_user_meal(*, session: AsyncSession = Depends(get_session), user_meal_id: int):
    user_meal = await session.get(UserMeal, user_meal_id)
    if not user_meal:
        raise HTTPException(status_code=404, detail="User meal not found")
    return user_meal

@router.put("/user_meals/{user_meal_id}", response_model=UserMealRead)
async def update_user_meal(*, session: AsyncSession = Depends(get_session), user_meal_id: int, user_meal_update: UserMealUpdate):
    user_meal = await session.get(UserMeal, user_meal_id)
    if not user_meal:
        raise HTTPException(status_code=404, detail="User meal not found")
    user_meal_data = user_meal_update.dict(exclude_unset=True)
    for key, value in user_meal_data.items():
        setattr(user_meal, key, value)
    session.add(user_meal)
    await session.commit()
    await session.refresh(user_meal)
    return user_meal

@router.delete("/user_meals/{user_meal_id}", response_model=UserMealRead)
async def delete_user_meal(*, session: AsyncSession = Depends(get_session), user_meal_id: int):
    user_meal = await session.get(UserMeal, user_meal_id)
    if not user_meal:
        raise HTTPException(status_code=404, detail="User meal not found")
    await session.delete(user_meal)
    await session.commit()
    return user_meal
