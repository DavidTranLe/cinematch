import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import SplashPage from './SplashPage';
import { MDBBtn } from 'mdb-react-ui-kit';

function Watchlist({fetchUserMovies, userMovies, email, token}) {

  async function deleteMovieFromWatchlist(id) {
    const url = `${process.env.REACT_APP_USER_MOVIES_HOST}/user_movies/${id}`;
    let data = {}
    data.list_type = "rejected"
    const fetchConfig = {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      fetchUserMovies()
    }
  }

  if (token===null) {
      return (
        <Routes>
          <Route
              path="*"
              element={
              <SplashPage
              />
              }
          />
        </Routes>
          )
  } else {
    return (
      <div
        style={{
          background:
            "linear-gradient(to right bottom, #000000, #040102, #070203, #0b0405, #0e0506, #170708, #1e090a, #240b0a, #300c0b, #3c090c, #49050b, #55000a)",
          color: "white",
          paddingBottom: "1px",
        }}
      >
        <div className="text-white">
          <Link className="card-view btn btn-outline-light" to="/watchlistcard">
            Card View
          </Link>
        </div>

        <table
          className="table"
          style={{
            color: "white",
          }}
        >
          <thead>
            <tr>
              <th>Title</th>
              <th>Director</th>
              <th>Poster</th>
              <th>Year</th>
              <th>Description</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {userMovies
              .filter(
                (movie) =>
                  movie.list_type === "watchlist" && movie.user_email === email
              )
              .map((user_movie) => {
                return (
                  <tr key={user_movie.id}>
                    <td>{user_movie.title}</td>
                    <td>{user_movie.director}</td>
                    <td>
                      <img
                        src={user_movie.poster}
                        alt=""
                        width="80"
                        height="80"
                      />
                    </td>
                    <td>{user_movie.year}</td>
                    <td>{user_movie.description}</td>
                    <td>
                      <MDBBtn
                        onClick={() => deleteMovieFromWatchlist(user_movie.id)}
                        color="dark"
                      >
                        Delete
                      </MDBBtn>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
    }
  }

export default Watchlist
