import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import SplashPage from "./SplashPage";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardFooter,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";

function WatchListCard({ fetchUserMovies, userMovies, email, token }) {
  async function deleteMovieFromWatchlist(id) {
    const url = `${process.env.REACT_APP_USER_MOVIES_HOST}/user_movies/${id}`;
    let data = {
      list_type: "rejected",
    };
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
    }
  }

  if (token === null) {
    return (
      <Routes>
        <Route path="*" element={<SplashPage />} />
      </Routes>
    );
  } else {
    return (
      <MDBContainer
        fluid
        className="py-4"
        style={{
          background:
            "linear-gradient(to right bottom, #000000, #040102, #070203, #0b0405, #0e0506, #170708, #1e090a, #240b0a, #300c0b, #3c090c, #49050b, #55000a)",
          minHeight: "100vh",
        }}
      >
        <MDBRow className="mb-4">
          <MDBCol className="d-flex justify-content-center">
            <Link to="/watchlist">
              <MDBBtn outline color="light" className="mb-4">
                Table View
              </MDBBtn>
            </Link>
          </MDBCol>
        </MDBRow>

        <MDBRow className="row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 justify-content-center">
          {userMovies
            .filter(
              (movie) =>
                movie.list_type === "watchlist" && movie.user_email === email
            )
            .map((user_movie) => (
              <MDBCol key={user_movie.id} style={{ maxWidth: "18rem" }}>
                <MDBCard className="h-100 shadow-5">
                  <MDBRipple
                    rippleColor="light"
                    rippleTag="div"
                    className="bg-image hover-overlay"
                  >
                    <MDBCardImage
                      src={user_movie.poster}
                      alt={`${user_movie.title} poster`}
                      position="top"
                      className="img-fluid"
                    />
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                    ></div>
                  </MDBRipple>

                  <MDBCardBody>
                    <MDBCardTitle>{user_movie.title}</MDBCardTitle>
                    <h6 className="text-muted mb-3">{user_movie.year}</h6>
                    <MDBCardText>{user_movie.description}</MDBCardText>
                  </MDBCardBody>

                  <MDBCardFooter className="text-center">
                    <MDBBtn
                      color="dark"
                      onClick={() => deleteMovieFromWatchlist(user_movie.id)}
                    >
                      Delete
                    </MDBBtn>
                  </MDBCardFooter>
                </MDBCard>
              </MDBCol>
            ))}
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default WatchListCard;
