# API Designs

### Log in
- Endpoint path: /token
- Endpoint method: POST

- Request shape (form):

  - username: string
  - password: string
  - password confirmation: string

- Response: Account information and a token
- Response shape (JSON):
  ```json
  {
    "account": {
      «key»: type»,
    },
    "token": string
  }
  ```



### Sign Up
- Endpoint path: /token
- Endpoint method: POST

- Request shape (form):

  - name: string
  - email: string
  - password: string
  - password confirmation: string

- Response: Account information and a token
- Response shape (JSON):
  ```json
  {
    "account": {
      «key»: type»,
    },
    "token": string
  }
  ```



### Log Out
- Endpoint path: /token
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: Always true
- Response shape (JSON):
  ```json
  true
  ```



### Create Account
- Endpoint path: /accounts
- Endpoint method: POST

- Request shape (form):

  - name: string
  - email: string
  - password: string 

- Response: To create an account 
- Response shape (JSON):
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```



### Get Account
- Endpoint path: /accounts
- Endpoint method: GET

- Request shape (form):

  - name: string
  - email: string
  - password: string 

- Response: A list of accounts 
- Response shape (JSON):
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```



### Create a New Movie
- Endpoint path: /movies
- Endpoint method: POST

- Request shape (form):

    - title: string
    - poster: string
    - year: integer
    - description: string 

- Response: To create a movie
- Response shape (JSON):
```json
{
  "title": "string",
  "poster": "string",
  "year": 0,
  "description": "string"
}
```



### Get Movies
- Endpoint path: /movies
- Endpoint method: GET

- Request shape (form):

    - title: string
    - poster: string
    - year: integer
    - description: string 

- Response: To get a movie
- Response shape (JSON):
```json
{
  "title": "string",
  "poster": "string",
  "year": 0,
  "description": "string"
}
```

### Hardcoded Movies 
- Endpoint path: /movies/startup
- Endpoint method: POST

- Request shape (form):

    - title: string
    - poster: string
    - year: integer
    - description: string 

- Response: To Create a Movie Database
- Response shape (JSON):
```json
{
  "title": "string",
  "poster": "string",
  "year": 0,
  "description": "string",
}
```



### Create a User Movie
- Endpoint path: /user_movies
- Endpoint method: POST

- Request shape (form):

    - title: string
    - poster: string
    - year: integer
    - description: string 
    - list_type: string
    - user_email: string

- Response: To create a user movie
- Response shape (JSON):
```json
{
  "title": "string",
  "poster": "string",
  "year": 0,
  "description": "string",
  "list_type": "string",
  "user_email": "string"
}
```



### Get a User Movie
- Endpoint path: /user_movies
- Endpoint method: GET

- Request shape (form):

    - title: string
    - poster: string
    - year: integer
    - description: string 
    - list_type: string
    - user_email: string

- Response: To get a user movie
- Response shape (JSON):
```json
{
  "title": "string",
  "poster": "string",
  "year": 0,
  "description": "string",
  "list_type": "string",
  "user_email": "string"
}
```



### Patch a User Movie
- Endpoint path: /user_movies/{user_movie_id}
- Endpoint method: PATCH

- Request shape (form):

    - list_type: string


- Response: To update a user movie list type 
- Response shape (JSON):
```json
{
  "list_type": "string"
}
```

