from sqlmodel import SQLModel
from sqlmodel.pool import StaticPool
from main import app, verify_password
from db import get_session
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
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
async def test_add_account(client: AsyncClient):
    response = await client.post(
        "/accounts",
        json={
            "name": "David",
            "email": "david@gmail.com",
            "password": "somepassword",
        },
    )

    new_account = response.json()
    assert response.status_code == 200
    assert new_account["name"] == "David"
    assert new_account["email"] == "david@gmail.com"
    assert verify_password("somepassword", new_account["password"])
    assert new_account["id"] is not None

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
async def test_get_account(session: AsyncSession, client: AsyncClient):
    account_1 = Account(
        name="vivi",
        email="vivi@gmail.com",
        password="password",
    )
    session.add(account_1)
    await session.commit()
    response = await client.get("/accounts")
    data = response.json()
    assert response.status_code == 200

    assert len(data) == 1
    assert data[0]["name"] == account_1.name
    assert data[0]["email"] == account_1.email
    assert data[0]["password"] == account_1.password
