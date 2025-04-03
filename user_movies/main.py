from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import select
from sqlmodel import Session
from db import get_session
from models import UserMovie, UserMovieBase, UserMovieUpdate
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# origins = [
#     "*",
#     os.environ.get("CORS_HOST", None),
# ]

origins = [
    os.environ.get("CORS_HOST", "http://localhost:3000"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/user_movies", response_model=list[UserMovie])
async def get_user_movies(session: Session = Depends(get_session)):
    result = await session.execute(select(UserMovie))
    user_movies = result.scalars().all()
    return [
        UserMovie(
            id=user_movie.id,
            movie_id=user_movie.movie_id,
            user_email=user_movie.user_email,
            title=user_movie.title,
            poster=user_movie.poster,
            year=user_movie.year,
            description=user_movie.description,
            list_type=user_movie.list_type,
            director=user_movie.director,
        )
        for user_movie in user_movies
    ]


@app.post("/user_movies", response_model=UserMovie)
async def add_user_movie(
    user_movie: UserMovieBase, session: Session = Depends(get_session)
):
    user_movie = UserMovie(
        title=user_movie.title,
        poster=user_movie.poster,
        year=user_movie.year,
        description=user_movie.description,
        list_type=user_movie.list_type,
        user_email=user_movie.user_email,
        movie_id=user_movie.movie_id,
        director=user_movie.director,
    )
    session.add(user_movie)
    await session.commit()
    await session.refresh(user_movie)
    return user_movie


@app.patch("/user_movies/{user_movie_id}", response_model=UserMovie)
async def update_user_movie(
    user_movie_id: int,
    user_movie: UserMovieUpdate,
    session: Session = Depends(get_session),
):
    db_user_movie = await session.get(UserMovie, user_movie_id)
    if not db_user_movie:
        raise HTTPException(status_code=404, detail="User movie not found")
    user_movie_data = user_movie.dict(exclude_unset=True)
    for key, value in user_movie_data.items():
        setattr(db_user_movie, key, value)
    session.add(db_user_movie)
    await session.commit()
    await session.refresh(db_user_movie)
    return db_user_movie
