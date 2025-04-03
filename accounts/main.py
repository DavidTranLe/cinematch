import os
from datetime import datetime, timedelta
from fastapi import Depends, FastAPI, HTTPException, status, Response, Request
from sqlalchemy import select
from sqlmodel import Session
from db import get_session
from models import Account, AccountBase, TokenData
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.exc import IntegrityError
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware


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

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = os.environ.get("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@app.get("/accounts/current", response_model=Account)
async def get_current_account(
    token: str = Depends(oauth2_scheme),
    session: Session = Depends(get_session),
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    account = await get_account(email=token_data.email, session=session)
    if account is None:
        raise credentials_exception
    return account


@app.get("/accounts", response_model=list[Account])
async def get_accounts(session: Session = Depends(get_session)):
    result = await session.execute(select(Account))
    accounts = result.scalars().all()
    return [account for account in accounts]


@app.get("/accounts/{email}", response_model=Account)
async def get_account(email: str, session: Session = Depends(get_session)):
    result = await session.execute(
        select(Account).where(Account.email == email)
    )
    account = result.scalars().first()
    return account


async def authenticate_user(
    email: str, password: str, session: Session = Depends(get_session)
):
    account = await get_account(email, session)
    if not account:
        return False
    if not verify_password(password, account.password):
        return False
    return account


@app.post("/accounts", response_model=Account)
async def add_account(
    account: AccountBase, session: Session = Depends(get_session)
):
    hashed_password = get_password_hash(account.password)
    account = Account(
        name=account.name,
        email=account.email,
        password=hashed_password,
    )
    session.add(account)
    try:
        await session.commit()
        await session.refresh(account)
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered",
        )
    return account


@app.post("/token")
async def login(
    response: Response,
    request: Request,
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session),
):
    account = await authenticate_user(
        email=form_data.username, password=form_data.password, session=session
    )
    if not account:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": account.email}, expires_delta=access_token_expires
    )

    headers = request.headers
    samesite = "none"
    secure = True
    if "origin" in headers and "localhost" in headers["origin"]:
        samesite = "lax"
        secure = False

    response.set_cookie(
        key="auth_token",
        value=access_token,
        httponly=True,
        samesite=samesite,
        secure=secure,
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/token")
async def get_token(request: Request):
    token = request.cookies.get("auth_token")
    return token


@app.delete("/token")
async def logout(response: Response, request: Request):
    headers = request.headers
    samesite = "none"
    secure = True
    if "origin" in headers and "localhost" in headers["origin"]:
        samesite = "lax"
        secure = False

    response.delete_cookie(
        key="auth_token",
        httponly=True,
        samesite=samesite,
        secure=secure,
    )
