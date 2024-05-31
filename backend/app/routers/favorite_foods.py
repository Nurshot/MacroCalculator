from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List

from db import get_session
from models.models import Food, User, FavoriteFood, FavoriteFoodCreate,FavoriteFoodRead

router = APIRouter()

@router.post("/favorite_foods", response_model=FavoriteFood)
async def create_favorite_food(*, session: AsyncSession = Depends(get_session), favorite_food: FavoriteFoodCreate):
    if not favorite_food.user_id or not favorite_food.food_id:
        raise HTTPException(status_code=400, detail="user_id and food_id are required")
    
    user = await session.get(User, favorite_food.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    food = await session.get(Food, favorite_food.food_id)
    if not food:
        raise HTTPException(status_code=404, detail="Food not found")
    
    result = await session.execute(select(FavoriteFood).where(
        FavoriteFood.user_id == favorite_food.user_id,
        FavoriteFood.food_id == favorite_food.food_id
    ))
    existing_favorite_food = result.scalars().first()

    if existing_favorite_food:
        raise HTTPException(status_code=400, detail="Favorite Food already exists")
    
    new_favorite_food = FavoriteFood.from_orm(favorite_food)
    session.add(new_favorite_food)
    await session.commit()
    await session.refresh(new_favorite_food)
    return JSONResponse(status_code=200,media_type="application/json",content={"message": "Success"})

@router.get("/favorite_foods", response_model=List[FavoriteFoodRead])
async def read_favorite_foods(*, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(FavoriteFood))
    favorite_foods = result.scalars().all()
    return favorite_foods

@router.get("/favorite_foods/{user_id}", response_model=List[FavoriteFoodRead])
async def read_favorite_recipes_by_user(*, session: AsyncSession = Depends(get_session), user_id: int):
    result = await session.execute(select(FavoriteFood).where(
        FavoriteFood.user_id == user_id
    ))
    
    favorite_recipes = result.scalars().all()
    if not favorite_recipes:
        raise HTTPException(status_code=404, detail="Favorite recipes not found for this user")
    return favorite_recipes

@router.delete("/favorite_foods/{user_id}/{favorite_food_id}", response_model=FavoriteFood)
async def delete_favorite_food(*, session: AsyncSession = Depends(get_session), user_id: int, favorite_food_id: int):
    result = await session.execute(select(FavoriteFood).where(
        FavoriteFood.favorite_food_id == favorite_food_id, 
        FavoriteFood.user_id == user_id
    ))
    
    favorite_food = result.scalars().first()
    
    if not favorite_food:
        raise HTTPException(status_code=404, detail="Favorite food not found")
    
    await session.delete(favorite_food)
    await session.commit()
    return JSONResponse(
        status_code=200,
        content={"message": "Success"},
    )
