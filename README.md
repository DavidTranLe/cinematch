# Cinematch!
#### Video Demo:  <URL HERE>
#### Description:

##  Intended Market
We are targeting anyone adventurous that loves watching movies, looking for movies recommendations based on their preferences or that they simply love a fun movie app they can use!

## Features
- Users on our website will be able to sign up for an account.
- Once a user signs up for an account, they will be able to log in once they log out of their account the first time.
- Once a user either sign ups or login they will be able to log out of their account.
- A signed up user will be able to view the main function of the main page and interact with it, unlike a signed out user.
- Users will be able to press a green right button to add into their personalized watchlist.
- User will be able to press a red left button to reject the movies they are not interested in.
- A signed in user will be able to see and access their personalized watchlist page.
- A signed in user will be able to delete items out of their watchlist if they have seen the movie, realized they they do not like it once watched, or any other reason.

## Running the app
- These are the step to enjoy Cinematch on your local machine:
1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run docker volume create pg-admin
4. Run docker volume create postgres-data
5. Run docker compose build
6. Run docker compose up


## Design
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

# Data Models

## Accounts Microservice

| Name     | Type    | unique|  optional  |
| ---------|:--------| ----- | ---------:   |
| name     | string  |  no   |    no      |
| email    | string  |  no   |    no      |
| password | string  |  no   |    no      |
| active   | boolean |   no  |    yes     |



## Movies Microservice

| Name        | Type   | unique|  optional    |
| ------------- |:----:| ----- | ---------:   |
| title     | string    |  no   |    no      |
| poster    | string    |  no   |    no      |
| year |      integer   |  no   |    yes      |
| description  | string |  no |   yes         |


## User_Movies Microservice

| Name        | Type   | unique|  optional  |
| ------------- |:----:| ----- | ---------: |
| title     | string    |  no   |    no     |
| poster    | string    |  no   |    no     |
| year |      integer   |  no   |    yes    |
| description  | string |  no |   yes       |
| list_type |  integer   |  no   |    no    |
| user_email  | string |  no |   no         |

# Customer Graphical Human Interface

## Display Page
When visitors visit this page they will either sign up if it is their first time or login if they are a returning visitor that already created an account.

<img src="./docs/Display Page.png" />

## Sign Up Form
The sign up form requires the user to input their name, email, password, and to confirm that their password in input correctly.

<img src="./docs/Sign Up Form.png" />

## Login Form
When a returning user successfully creates an account previously then they will need to input the email and password that they have created before to access their personalized watchlist.

<img src="./docs/Login Form.png" />

## Main Page
The main page allows our visitors to either swipe left if they do not like the movie or swipe right if they want to view that movie at a later time. Each time they swipe either left or right a new movie will be generated for them to continue adding to their list or not be recommended the movie they rejected!

<img src="./docs/Main Page.png" />

## Detail Watchlist Page
This page displays the users watchlist picks! They will be able to delete the movie off the list for any reason such as if they realized that they do not actually like the movie or if they have already watched it.

<img src="./docs/Detail Watchlist Page.png" />
