# routers/songs.py
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List

from db import get_session
from models.models import Song, SongCreate

router = APIRouter()

@router.post("/songs", response_model=Song)
async def create_song(*, session: AsyncSession = Depends(get_session), song: SongCreate):
    new_song = Song.from_orm(song)
    session.add(new_song)
    await session.commit()
    await session.refresh(new_song)
    return new_song

@router.get("/songs", response_model=List[Song])
async def read_songs(*, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Song))
    songs = result.scalars().all()
    return songs

@router.get("/songs/{song_id}", response_model=Song)
async def read_song(*, session: AsyncSession = Depends(get_session), song_id: int):
    song = await session.get(Song, song_id)
    if not song:
        raise HTTPException(status_code=404, detail="Song not found")
    return song