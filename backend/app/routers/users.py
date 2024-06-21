# routers/users.py
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List

from ..db import get_session
from ..models.models import User, UserCreate, UserRead, UserUpdate, UserLogin

from fastapi_jwt_auth import AuthJWT
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()

@router.post("/users", response_model=UserRead)
async def create_user(*, session: AsyncSession = Depends(get_session), user: UserCreate):
    hashed_password = pwd_context.hash(user.password)
    user.password = hashed_password
    new_user = User.from_orm(user)
    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)
    return new_user

@router.post("/login")
async def login(*, session: AsyncSession = Depends(get_session), user: UserLogin, Authorize: AuthJWT = Depends()):
    statement = select(User).where(User.email == user.email)
    result = await session.execute(statement)
    user_db = result.scalar_one_or_none()
    if not user_db or not pwd_context.verify(user.password, user_db.password):
        raise HTTPException(status_code=401, detail="Bad email or password")
    access_token = Authorize.create_access_token(subject=user_db.email)
    return {"access_token": access_token}


@router.get("/me", response_model=UserRead)
async def get_current_user(Authorize: AuthJWT = Depends(), session: AsyncSession = Depends(get_session)):
    Authorize.jwt_required()
    current_user_email = Authorize.get_jwt_subject()
    statement = select(User).where(User.email == current_user_email)
    result = await session.execute(statement)
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

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
