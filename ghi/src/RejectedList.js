import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SplashPage from './SplashPage';
import { MDBBtn } from 'mdb-react-ui-kit';

function RejectedList({fetchUserMovies, userMovies, email, token}) {

  async function addMovieFromRejectedList(id) {
    const url = `${process.env.REACT_APP_USER_MOVIES_HOST}/user_movies/${id}`;
    let data = {}
    data.list_type = "watchlist"
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
    <table
      className="table"
      style={{
        background:
          "linear-gradient(to right bottom, #000000, #040102, #070203, #0b0405, #0e0506, #170708, #1e090a, #240b0a, #300c0b, #3c090c, #49050b, #55000a)",
        color: "white",
        marginBottom: "0",
      }}
    >
      <thead>
        <tr>
          <th>Title</th>
          <th>Poster</th>
          <th>Director</th>
          <th>Year</th>
          <th>Description</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {userMovies
          .filter(
            (movie) =>
              movie.list_type === "rejected" && movie.user_email === email
          )
          .map((user_movie) => {
            return (
              <tr key={user_movie.id}>
                <td>{user_movie.title}</td>
                <td>
                  <img src={user_movie.poster} alt="" width="80" height="80" />
                </td>
                <td>{user_movie.director}</td>
                <td>{user_movie.year}</td>
                <td>{user_movie.description}</td>
                <td>
                  <MDBBtn
                    onClick={() => addMovieFromRejectedList(user_movie.id)}
                    type="button"
                    color="dark"
                  >
                    Undo
                  </MDBBtn>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
  }
}

export default RejectedList
