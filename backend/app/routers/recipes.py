# routers/recipes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List

from ..db import get_session
from ..models.models import Recipe, RecipeCreate, RecipeRead, RecipeUpdate

router = APIRouter()

@router.post("/recipes", response_model=RecipeRead)
async def create_recipe(*, session: AsyncSession = Depends(get_session), recipe: RecipeCreate):
    new_recipe = Recipe.from_orm(recipe)
    session.add(new_recipe)
    await session.commit()
    await session.refresh(new_recipe)
    return new_recipe

@router.get("/recipes", response_model=List[RecipeRead])
async def read_recipes(*, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Recipe))
    recipes = result.scalars().all()
    return recipes

@router.get("/recipes/{recipe_id}", response_model=RecipeRead)
async def read_recipe(*, session: AsyncSession = Depends(get_session), recipe_id: int):
    recipe = await session.get(Recipe, recipe_id)
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe

@router.put("/recipes/{recipe_id}", response_model=RecipeRead)
async def update_recipe(*, session: AsyncSession = Depends(get_session), recipe_id: int, recipe_update: RecipeUpdate):
    recipe = await session.get(Recipe, recipe_id)
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    recipe_data = recipe_update.dict(exclude_unset=True)
    for key, value in recipe_data.items():
        setattr(recipe, key, value)
    session.add(recipe)
    await session.commit()
    await session.refresh(recipe)
    return recipe

@router.delete("/recipes/{recipe_id}", response_model=RecipeRead)
async def delete_recipe(*, session: AsyncSession = Depends(get_session), recipe_id: int):
    recipe = await session.get(Recipe, recipe_id)
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    await session.delete(recipe)
    await session.commit()
    return recipe
