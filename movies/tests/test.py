from sqlmodel import SQLModel
from sqlmodel.pool import StaticPool
from main import app
from db import get_session
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from models import Movie
import pytest
import os
import pytest_asyncio


@pytest_asyncio.fixture(name="session")
async def session_fixture():
    engine = create_async_engine(
        "sqlite+aiosqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )
    async with async_session() as session:
        yield session


@pytest_asyncio.fixture(name="client")
async def client_fixture(session: AsyncSession):
    def get_session_override():
        return session

    app.dependency_overrides[get_session] = get_session_override
    async with AsyncClient(
        app=app, base_url=os.environ.get("SELF_HOST")
    ) as async_client:
        yield async_client
    app.dependency_overrides.clear()


@pytest.mark.asyncio
async def test_get_movie(session: AsyncSession, client: AsyncClient):
    movie_1 = Movie(
        title="Goodfellas",
        poster="https://m.media-amazon.com/images/I/41YHNBJW24L.jpg",
        year=1990,
        description="The lowly, blue-collar side of New York.",
    )
    session.add(movie_1)
    await session.commit()
    response = await client.get("/movies")
    data = response.json()
    assert response.status_code == 200

    assert len(data) == 1
    assert data[0]["title"] == movie_1.title
    assert data[0]["poster"] == movie_1.poster
    assert data[0]["year"] == movie_1.year
    assert data[0]["description"] == movie_1.description

@pytest_asyncio.fixture(name="client")
async def client_fixture(session: AsyncSession):
    def get_session_override():
        return session

    app.dependency_overrides[get_session] = get_session_override
    async with AsyncClient(
        app=app, base_url=os.environ.get("SELF_HOST")
    ) as async_client:
        yield async_client
    app.dependency_overrides.clear()


@pytest.mark.asyncio
async def test_add_movie(client: AsyncClient):
    response = await client.post(
        "/movies",
        json={
            "title": "The Godfather",
            "poster": "https://exa.com/the-godfather-poster.jpg",
            "year": 1972,
            "description": "Crime, Adventure, and a great story.",
        },
    )

    new_movie = response.json()

    assert response.status_code == 200
    assert new_movie["title"] == "The Godfather"
    assert new_movie["poster"] == "https://exa.com/the-godfather-poster.jpg"
    assert new_movie["year"] == 1972
    assert new_movie["description"] == "Crime, Adventure, and a great story."
    assert new_movie["id"] is not None
