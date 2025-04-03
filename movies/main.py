from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import select
from sqlmodel import Session
from models import Movie, MovieBase
from db import get_session
from fastapi.middleware.cors import CORSMiddleware
import json
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


@app.post("/movies/startup", response_model=list[Movie])
async def load_hardmoviedb(session: Session = Depends(get_session)):
    with open("hardmoviedb.json") as file:
        movies = json.load(file)
        for movie in movies:
            new_movie = Movie(
                title=movie["title"],
                poster=movie["poster"],
                year=movie["year"],
                description=movie["description"],
                director=movie["director"],
            )
            session.add(new_movie)
            await session.commit()
            await session.refresh(new_movie)
    return await get_movies(session=session)


@app.get("/movies", response_model=list[Movie])
async def get_movies(session: Session = Depends(get_session)):
    result = await session.execute(select(Movie))
    movies = result.scalars().all()
    return [
        Movie(
            title=movie.title,
            poster=movie.poster,
            year=movie.year,
            description=movie.description,
            id=movie.id,
            director=movie.director,
        )
        for movie in movies
    ]


@app.post("/movies", response_model=Movie)
async def add_movie(movie: MovieBase, session: Session = Depends(get_session)):
    result = await session.execute(
        select(Movie).where(
            Movie.title == movie.title, Movie.year == movie.year
        )
    )
    existing_movie = result.scalars().first()
    if existing_movie:
        raise HTTPException(status_code=400, detail="Movie already exists")
    movie = Movie(
        title=movie.title,
        poster=movie.poster,
        year=movie.year,
        description=movie.description,
        director=movie.director,
    )
    session.add(movie)
    await session.commit()
    await session.refresh(movie)
    return movie
