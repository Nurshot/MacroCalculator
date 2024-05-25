# routers/users.py
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List

from db import get_session
from models.models import User, UserCreate, UserRead, UserUpdate

router = APIRouter()

@router.post("/users", response_model=UserRead)
async def create_user(*, session: AsyncSession = Depends(get_session), user: UserCreate):
    new_user = User.from_orm(user)
    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)
    return new_user

@router.get("/users", response_model=List[UserRead])
async def read_users(*, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(User))
    users = result.scalars().all()
    return users

@router.get("/users/{user_id}", response_model=UserRead)
async def read_user(*, session: AsyncSession = Depends(get_session), user_id: int):
    user = await session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/users/{user_id}", response_model=UserRead)
async def update_user(*, session: AsyncSession = Depends(get_session), user_id: int, user_update: UserUpdate):
    user = await session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user_data = user_update.dict(exclude_unset=True)
    for key, value in user_data.items():
        setattr(user, key, value)
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user

@router.delete("/users/{user_id}", response_model=UserRead)
async def delete_user(*, session: AsyncSession = Depends(get_session), user_id: int):
    user = await session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    await session.delete(user)
    await session.commit()
    return user
