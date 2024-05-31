# routers/favorite_recipes.py
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse,Response
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List


from db import get_session
from models.models import Recipe, User, FavoriteRecipe, FavoriteRecipeCreate, FavoriteRecipeRead, FavoriteRecipeUpdate

router = APIRouter()

@router.post("/favorite_recipes", response_model=FavoriteRecipeRead)
async def create_favorite_recipe(*, session: AsyncSession = Depends(get_session), favorite_recipe: FavoriteRecipeCreate):
    if not favorite_recipe.user_id or not favorite_recipe.recipe_id:
        raise HTTPException(status_code=400, detail="user_id and recipe_id are required")
    
    user = await session.get(User, favorite_recipe.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    recipe = await session.get(Recipe, favorite_recipe.recipe_id)
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    

    result = await session.execute(select(FavoriteRecipe).where(
        FavoriteRecipe.user_id == favorite_recipe.user_id,
        FavoriteRecipe.recipe_id == favorite_recipe.recipe_id
    ))
    existing_favorite_recipe = result.scalars().first()

    if existing_favorite_recipe:
        raise HTTPException(status_code=400, detail="Favorite Recipe already exists")
    
    new_favorite_recipe = FavoriteRecipe.from_orm(favorite_recipe)
    session.add(new_favorite_recipe)
    await session.commit()
    await session.refresh(new_favorite_recipe)
    return JSONResponse(status_code=200,media_type="application/json",content={"message": "Success"})

@router.get("/favorite_recipes", response_model=List[FavoriteRecipeRead])
async def read_favorite_recipes(*, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(FavoriteRecipe))
    favorite_recipes = result.scalars().all()
    return favorite_recipes


@router.get("/favorite_recipes/{user_id}", response_model=List[FavoriteRecipeRead])
async def read_favorite_recipes_by_user(*, session: AsyncSession = Depends(get_session), user_id: int):
    result = await session.execute(select(FavoriteRecipe).where(
        FavoriteRecipe.user_id == user_id
    ))
    
    favorite_recipes = result.scalars().all()
    if not favorite_recipes:
        raise HTTPException(status_code=404, detail="Favorite recipes not found for this user")
    return favorite_recipes


#şimdilik gerek yok kullanmaya kalsın.
@router.put("/favorite_recipes/{user_id}/{recipe_id}", response_model=FavoriteRecipeUpdate)
async def update_favorite_recipe(*, session: AsyncSession = Depends(get_session), user_id: int, recipe_id: int, favorite_recipe_update: FavoriteRecipeUpdate):
    result = await session.execute(select(FavoriteRecipe).where(
        FavoriteRecipe.recipe_id == recipe_id, 
        FavoriteRecipe.user_id == user_id
    ))
    
    favorite_recipe_update = result.scalars().first()

    if not favorite_recipe_update:
       
        new_favorite_recipe = FavoriteRecipe(
            recipe_id=recipe_id,
            user_id=user_id,
        )
        session.add(new_favorite_recipe)
        await session.commit()
        
        return JSONResponse(
                status_code=200,
                content={"message": "Success"},
            )
    else:
        raise HTTPException(status_code=404, detail="Already exists")
    

    



@router.delete("/favorite_recipes/{user_id}/{favorite_recipe_id}", response_model=FavoriteRecipeRead,status_code=200)
async def delete_favorite_recipe(*, session: AsyncSession = Depends(get_session), user_id: int, favorite_recipe_id: int):
    
    result = await session.execute(select(FavoriteRecipe).where(
        FavoriteRecipe.favorite_recipe_id == favorite_recipe_id, 
        FavoriteRecipe.user_id == user_id
    ))
    
    favorite_recipe = result.scalars().first()
    
    if not favorite_recipe:
        raise HTTPException(status_code=404, detail="Favorite recipe not found")
    
    await session.delete(favorite_recipe)
    await session.commit()
    return JSONResponse(
        status_code=200,
        content={"message": "Success"},
    )