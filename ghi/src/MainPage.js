import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SplashPage from "./SplashPage";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBRipple,
  MDBInputGroup,
  MDBBadge,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./main.css";

function MainPage({
  token,
  setToken, // Added setToken to the component props
  email,
  movies,
  fetchMovies,
  userMovies,
  currentUserMovies,
  fetchUserMovies,
}) {
  const [movieSuggestions, setMovieSuggestions] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [filterTags, setFilterTags] = useState([]);
  const [tag, setTag] = useState("Director");
  const [hoverLeft, setHoverLeft] = useState(false);
  const [hoverRight, setHoverRight] = useState(false);

  const handleTagInput = async (event) => {
    const value = event.target.value;
    setTagInput(value);
  };

  const handleAddFilterTag = async (event) => {
    if (tagInput.trim() !== "") {
      let newFilterTags = [...filterTags];
      newFilterTags.push(tagInput);
      setTagInput("");
      setFilterTags(newFilterTags);
    }
  };

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
        user_email: email,
        director: movie.director,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(userMovieUrl, fetchConfig);
    if (response.ok) {
      fetchUserMovies();
      fetchMovies();
      getNextMovie();
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
        user_email: email,
        director: movie.director,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(userMovieUrl, fetchConfig);
    if (response.ok) {
      fetchUserMovies();
      fetchMovies();
      getNextMovie();
    }
  };

  const handleRightButton = async (movie) => {
    acceptMovie(movie);
  };

  const handleLeftButton = async (movie) => {
    rejectMovie(movie);
  };

  // Function to get a new random movie from suggestions
  const getNextMovie = () => {
    if (movieSuggestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * movieSuggestions.length);
      setCurrentMovie(movieSuggestions[randomIndex]);
    } else {
      setCurrentMovie(null);
    }
  };

  useEffect(() => {
    function createMovieSuggestions() {
      const currentUserMovieIds = currentUserMovies.map(
        (userMovie) => userMovie.movie_id
      );
      let suggestions = movies.filter(
        (movie) => !currentUserMovieIds.includes(movie.id)
      );
      if (filterTags.length > 0) {
        return suggestions.filter((movie) =>
          movie.director.includes(filterTags)
        );
      } else {
        return suggestions;
      }
    }

    setMovieSuggestions(createMovieSuggestions());
  }, [movies, currentUserMovies, email, filterTags]);

  // Set a new current movie whenever movieSuggestions changes
  useEffect(() => {
    getNextMovie();
  }, [movieSuggestions]);

  if (token === null) {
    return (
      <Routes>
        <Route path="*" element={<SplashPage setToken={setToken} />} />
      </Routes>
    );
  } else {
    return (
      <MDBContainer
        fluid
        className="px-0 py-4"
        style={{
          background:
            "linear-gradient(to right bottom, #000000, #040102, #070203, #0b0405, #0e0506, #170708, #1e090a, #240b0a, #300c0b, #3c090c, #49050b, #55000a)",
          minHeight: "100vh",
        }}
      >
        <MDBRow className="mx-2 mb-4">
          <MDBCol>
            <MDBInputGroup>
              <MDBDropdown>
                <MDBDropdownToggle className="dropdown-toggle2">
                  {tag}
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem
                    link
                    childTag="button"
                    onClick={() => setTag("Director")}
                  >
                    Director
                  </MDBDropdownItem>
                  <MDBDropdownItem
                    link
                    childTag="button"
                    onClick={() => setTag("Genre")}
                  >
                    Genre
                  </MDBDropdownItem>
                  <MDBDropdownItem
                    link
                    childTag="button"
                    onClick={() => setTag("Actor")}
                  >
                    Actor
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>

              <div className="form-outline form-white flex-grow-1">
                <input
                  type="text"
                  onChange={handleTagInput}
                  value={tagInput}
                  className="form-control"
                  placeholder="Add filter"
                  aria-label="Add filter"
                  aria-describedby="btnGroupAddon"
                  style={{
                    backgroundColor: "transparent",
                    border: "0.7px solid #fff",
                    outline: "none",
                    boxShadow: "none",
                    color: "#fff",
                    width: "100%",
                    height: "38px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    borderRadius: "0.25rem",
                    cursor: "text",
                  }}
                />
              </div>

              <MDBBtn
                className="director-filter"
                onClick={() => handleAddFilterTag()}
              >
                +
              </MDBBtn>
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>

        <MDBRow className="mb-4">
          <MDBCol className="text-center">
            {filterTags.map((filterTag) => (
              <MDBBadge key={filterTag} pill color="primary" className="mx-1">
                Director: {filterTag}
              </MDBBadge>
            ))}
          </MDBCol>
        </MDBRow>

        {currentMovie && (
          <MDBContainer className="text-center mb-5">
            <MDBRow className="mb-4">
              <MDBCol>
                <img
                  src="https://i.ibb.co/Wg4DBVw/youmightlike.png"
                  alt="you might like"
                  className="img-fluid"
                  style={{ maxWidth: "300px" }}
                />
                <div className="underline"></div>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md="12" className="mb-4">
                <div
                  className="position-relative d-flex"
                  style={{ height: "400px" }}
                >
                  {/* Left Panel - Reject */}
                  <div
                    className="position-relative"
                    style={{
                      flex: hoverLeft ? "1 0 30%" : "1 0 15%",
                      backgroundColor: hoverLeft
                        ? "rgba(220, 53, 69, 0.3)"
                        : "rgba(33, 37, 41, 0.1)",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      overflow: "hidden",
                      borderRadius: "10px 0 0 10px",
                    }}
                    onMouseEnter={() => setHoverLeft(true)}
                    onMouseLeave={() => setHoverLeft(false)}
                    onClick={() => handleLeftButton(currentMovie)}
                  >
                    <div
                      className="position-absolute"
                      style={{
                        transform: `translateY(${hoverLeft ? "0" : "100px"})`,
                        opacity: hoverLeft ? 1 : 0,
                        transition: "all 0.3s ease",
                        fontSize: "2rem",
                        fontWeight: "bold",
                        color: "white",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                      }}
                    >
                      REJECT
                    </div>
                  </div>

                  {/* Center - Movie */}
                  <div
                    className="position-relative"
                    style={{
                      flex: "0 0 auto",
                      zIndex: 10,
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: `scale(${hoverLeft || hoverRight ? 0.95 : 1})`,
                    }}
                  >
                    <MDBRipple
                      rippleColor="light"
                      rippleTag="div"
                      className="bg-image hover-overlay"
                    >
                      <img
                        src={currentMovie.poster}
                        className="img-fluid shadow-4"
                        style={{
                          height: "380px",
                          objectFit: "cover",
                          borderRadius: "5px",
                          border: "3px solid white",
                        }}
                        alt={currentMovie.title}
                      />
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                      ></div>
                    </MDBRipple>
                  </div>

                  {/* Right Panel - Accept */}
                  <div
                    className="position-relative"
                    style={{
                      flex: hoverRight ? "1 0 30%" : "1 0 15%",
                      backgroundColor: hoverRight
                        ? "rgba(32, 201, 151, 0.3)"
                        : "rgba(248, 249, 250, 0.1)",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      overflow: "hidden",
                      borderRadius: "0 10px 10px 0",
                    }}
                    onMouseEnter={() => setHoverRight(true)}
                    onMouseLeave={() => setHoverRight(false)}
                    onClick={() => handleRightButton(currentMovie)}
                  >
                    <div
                      className="position-absolute"
                      style={{
                        transform: `translateY(${hoverRight ? "0" : "100px"})`,
                        opacity: hoverRight ? 1 : 0,
                        transition: "all 0.3s ease",
                        fontSize: "2rem",
                        fontWeight: "bold",
                        color: "white",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                      }}
                    >
                      ACCEPT
                    </div>
                  </div>
                </div>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol>
                <h4
                  style={{ color: "white", fontFamily: "optima, sans-serif" }}
                >
                  {currentMovie.title}
                </h4>
                <p style={{ color: "white", fontFamily: "optima, sans-serif" }}>
                  {currentMovie.year}
                </p>
                <p style={{ color: "white", fontFamily: "optima, sans-serif" }}>
                  {currentMovie.description}
                </p>
                <p style={{ color: "white", fontFamily: "optima, sans-serif" }}>
                  {currentMovie.director}
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        )}
      </MDBContainer>
    );
  }
}

export default MainPage;
