from sqlmodel import SQLModel, Field


class MovieBase(SQLModel):
    title: str = Field(index=True)
    poster: str
    year: int | None = None
    description: str | None = None
    director: str | None = None


class Movie(MovieBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
