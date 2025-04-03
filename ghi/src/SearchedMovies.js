import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SplashPage from "./SplashPage";
import "./search.css";
import { MDBBtn } from "mdb-react-ui-kit";

function SearchedMovies({
  token,
  email,
  movies,
  currentUserMovies,
  fetchUserMovies,
  fetchMovies,
}) {
  const [search, setSearch] = useState("");

  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  let searchResults = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );
  const acceptMovie = async (movie) => {
    const userMovieUrl = `${process.env.REACT_APP_USER_MOVIES_HOST}/user_movies`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify({
        list_type: "watchlist",
        title: movie.title,
        poster: movie.poster,
        year: movie.year,
        description: movie.description,
        movie_id: movie.id,
        director: movie.director,
        user_email: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(userMovieUrl, fetchConfig);
    if (response.ok) {
      fetchUserMovies();
      fetchMovies();
    }
  };

  const rejectMovie = async (movie) => {
    const userMovieUrl = `${process.env.REACT_APP_USER_MOVIES_HOST}/user_movies`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify({
        list_type: "rejected",
        title: movie.title,
        poster: movie.poster,
        year: movie.year,
        description: movie.description,
        movie_id: movie.id,
        director: movie.director,
        user_email: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(userMovieUrl, fetchConfig);
    if (response.ok) {
      fetchUserMovies();
      fetchMovies();
    }
  };

  async function deleteMovieFromWatchlist(id) {
    const url = `${process.env.REACT_APP_USER_MOVIES_HOST}/user_movies/${id}`;
    let data = {};
    data.list_type = "rejected";
    const fetchConfig = {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      fetchUserMovies();
      fetchMovies();
    }
  }

  async function addMovieToWatchlist(id) {
    const url = `${process.env.REACT_APP_USER_MOVIES_HOST}/user_movies/${id}`;
    let data = {};
    data.list_type = "watchlist";
    const fetchConfig = {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      fetchUserMovies();
      fetchMovies();
    }
  }

  function createUserMovieStatuses(movies, currentUserMovies) {
    let userMovieStatuses = {};
    for (let movie of movies) {
      userMovieStatuses[movie.id] = false;
      for (let currentUserMovie of currentUserMovies) {
        if (currentUserMovie.movie_id === movie.id) {
          userMovieStatuses[movie.id] = [
            currentUserMovie.list_type,
            currentUserMovie.id,
          ];
          break;
        }
      }
    }
    return userMovieStatuses;
  }

  let userMovieStatuses = createUserMovieStatuses(movies, currentUserMovies);

  function createButton(movie, userMovieStatuses) {
    let movie_id = movie.id;
    let result = "";
    if (userMovieStatuses[movie_id]) {
      if (userMovieStatuses[movie_id][0] === "watchlist") {
        result = (
          <MDBBtn
            onClick={() =>
              deleteMovieFromWatchlist(userMovieStatuses[movie_id][1])
            }
            type="button"
            className="btn btn-danger"
          >
            Delete
          </MDBBtn>
        );
      } else {
        result = (
          <MDBBtn
            onClick={() => addMovieToWatchlist(userMovieStatuses[movie_id][1])}
            color="light"
          >
            Add
          </MDBBtn>
        );
      }
    } else {
      result = (
        <article className="action">
          <MDBBtn color="light" onClick={() => acceptMovie(movie)}>
            <i className="accept">Accept</i>
          </MDBBtn>
          <MDBBtn color="dark" onClick={() => rejectMovie(movie)}>
            <i className="reject">Reject</i>
          </MDBBtn>
        </article>
      );
    }
    return result;
  }

  if (token === null) {
    return (
      <Routes>
        <Route path="*" element={<SplashPage />} />
      </Routes>
    );
  } else {
    return (
      <div
        className="input-group"
        style={{
          background:
            "linear-gradient(to right bottom, #000000, #040102, #070203, #0b0405, #0e0506, #170708, #1e090a, #240b0a, #300c0b, #3c090c, #49050b, #55000a)",
          color: "white",
        }}
      >
        <br></br>
        <br></br>
        <br></br>
        <>
          <center>
            <h1>Search For a Movie Title</h1>
          </center>
          <div className="input-group">
            <input
              onChange={handleSearch}
              value={search}
              type="search"
              id="form1"
              className="form-control"
              style={{
                backgroundColor: "transparent",
                border: "0.7px solid #fff",
                outline: "none",
                boxShadow: "none",
                color: "#fff",
              }}
            />
            <MDBBtn type="button" onClick={fetchMovies} className="button">
              Search
            </MDBBtn>
          </div>
          <table
            className="table table-hover align-middle mt-5"
            style={{
              color: "white",
            }}
          >
            <thead>
              <tr>
                <th>Title</th>
                <th>Poster</th>
                <th>Year</th>
                <th>Description</th>
                <th>Director</th>
                <th>User Status</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((movie) => {
                return (
                  <tr key={movie.id}>
                    <td>{movie.title}</td>
                    <td>
                      <img
                        src={movie.poster}
                        width="200px"
                        id="movie-poster"
                        alt=""
                      />
                    </td>
                    <td>{movie.year}</td>
                    <td>{movie.description}</td>
                    <td> {movie.director}</td>
                    <td>{createButton(movie, userMovieStatuses)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      </div>
    );
  }
}

export default SearchedMovies;
