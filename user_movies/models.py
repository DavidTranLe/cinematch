from sqlmodel import SQLModel, Field


class UserMovieBase(SQLModel):
    title: str
    poster: str
    year: int | None = None
    description: str | None = None
    list_type: str
    user_email: str
    movie_id: int | None = None
    director: str | None = None


class UserMovie(UserMovieBase, table=True):
    id: int | None = Field(default=None, primary_key=True)


class UserMovieUpdate(SQLModel):
    list_type: str
