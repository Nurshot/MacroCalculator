# routers/favorite_recipes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List

from db import get_session
from models.models import FavoriteRecipe, FavoriteRecipeCreate, FavoriteRecipeRead

router = APIRouter()

@router.post("/favorite_recipes", response_model=FavoriteRecipeRead)
async def create_favorite_recipe(*, session: AsyncSession = Depends(get_session), favorite_recipe: FavoriteRecipeCreate):
    new_favorite_recipe = FavoriteRecipe.from_orm(favorite_recipe)
    session.add(new_favorite_recipe)
    await session.commit()
    await session.refresh(new_favorite_recipe)
    return new_favorite_recipe

@router.get("/favorite_recipes", response_model=List[FavoriteRecipeRead])
async def read_favorite_recipes(*, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(FavoriteRecipe))
    favorite_recipes = result.scalars().all()
    return favorite_recipes

@router.get("/favorite_recipes/{favorite_recipe_id}", response_model=FavoriteRecipeRead)
async def read_favorite_recipe(*, session: AsyncSession = Depends(get_session), favorite_recipe_id: int):
    favorite_recipe = await session.get(FavoriteRecipe, favorite_recipe_id)
    if not favorite_recipe:
        raise HTTPException(status_code=404, detail="Favorite recipe not found")
    return favorite_recipe

@router.delete("/favorite_recipes/{favorite_recipe_id}", response_model=FavoriteRecipeRead)
async def delete_favorite_recipe(*, session: AsyncSession = Depends(get_session), favorite_recipe_id: int):
    favorite_recipe = await session.get(FavoriteRecipe, favorite_recipe_id)
    if not favorite_recipe:
        raise HTTPException(status_code=404, detail="Favorite recipe not found")
    await session.delete(favorite_recipe)
    await session.commit()
    return favorite_recipe
