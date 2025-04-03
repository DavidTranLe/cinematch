from sqlmodel import SQLModel
from main import app
from db import get_session
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel.pool import StaticPool
import pytest_asyncio
import pytest
import os


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
        engine,
        class_=AsyncSession,
        expire_on_commit=False,
    )
    async with async_session() as session:
        yield session


@pytest_asyncio.fixture(name="client")
async def client_fixture(session: AsyncSession):
    def get_session_override():
        return session

    app.dependency_overrides[get_session] = get_session_override
    async with AsyncClient(
        app=app,
        base_url=os.environ.get("SELF_HOST"),
    ) as async_client:
        yield async_client
        app.dependency_overrides.clear()


@pytest.mark.asyncio
async def test_create_user_movie(client: AsyncClient):
    response = await client.post(
        "/user_movies",
        json={
            "title": "test",
            "poster": "test",
            "year": 2023,
            "description": "test",
            "list_type": "rejected",
            "user_email": "test@test.com",
            "movie_id": 1,
        },
    )
    data = response.json()
    assert response.status_code == 200
    assert data["title"] == "test"
    assert data["poster"] == "test"
    assert data["year"] == 2023
    assert data["description"] == "test"
    assert data["list_type"] == "rejected"
    assert data["user_email"] == "test@test.com"
    assert data["movie_id"] == 1
    assert data["id"] is not None
