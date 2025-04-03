from sqlmodel import SQLModel, Field
from sqlalchemy.sql.schema import Column
from sqlalchemy import String


class AccountBase(SQLModel):
    name: str
    email: str
    password: str


class Account(AccountBase, table=True):
    id: int = Field(default=None, primary_key=True)
    email: str = Field(sa_column=Column("email", String, unique=True))


class Token(SQLModel):
    access_token: str
    token_type: str


class TokenData(SQLModel):
    email: str | None = None
