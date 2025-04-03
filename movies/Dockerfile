FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

# Top level files
COPY requirements.txt requirements.txt
COPY main.py main.py
COPY db.py db.py
COPY models.py models.py
COPY alembic.ini alembic.ini
COPY hardmoviedb.json hardmoviedb.json

# Folders
COPY migrations migrations

# Python dependencies
RUN python -m pip install -r requirements.txt

CMD alembic upgrade head && uvicorn main:app --reload --host 0.0.0.0
# CMD uvicorn main:app --reload --host 0.0.0.0
