# routers/meals.py
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select, delete
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List
from datetime import date, timedelta

from db import get_session
from models.models import Meal, UserMeal, UserMealCreate, UserMealRead, User, Food

router = APIRouter()


@router.post("/user_meals", response_model=UserMealRead)
async def create_user_meal(*, session: AsyncSession = Depends(get_session), user_meal: UserMealCreate):
    user = await session.get(User, user_meal.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    food = await session.get(Food, user_meal.food_id)
    if not food:
        raise HTTPException(status_code=404, detail="Food not found")
    
    meal = await session.get(Meal, user_meal.meal_id)
    if not meal:
        raise HTTPException(status_code=404, detail="Meal not found")
    
    new_user_meal = UserMeal.from_orm(user_meal)
    session.add(new_user_meal)
    await session.commit()
    await session.refresh(new_user_meal)
    return new_user_meal


#Read User Meals Gereksiz Şimdilik
@router.get("/user_meals", response_model=List[UserMealRead])
async def read_user_meals(*, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(UserMeal))
    user_meals = result.scalars().all()
    return user_meals


@router.get("/user_meals/{user_id}", response_model=List[UserMealRead])
async def read_user_id_meals(*, session: AsyncSession = Depends(get_session), user_id: int):
    result = await session.execute(select(UserMeal).where(
        UserMeal.user_id == user_id
    ))
    
    usermeal_id = result.scalars().all()
    if not usermeal_id:
        raise HTTPException(status_code=404, detail="User Meal not found for this user")
    return usermeal_id


@router.delete("/user_meals/{user_meal_id}", response_model=UserMealRead)
async def delete_user_meal(*, session: AsyncSession = Depends(get_session), user_meal_id: int):
    user_meal = await session.get(UserMeal, user_meal_id)
    if not user_meal:
        raise HTTPException(status_code=404, detail="User meal not found")
    await session.delete(user_meal)
    await session.commit()
    return user_meal

