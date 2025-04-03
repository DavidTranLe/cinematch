import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MainPage from "./MainPage";
import Nav from "./Nav";
import "./App.css";
import Watchlist from "./Watchlist";
import Login from "./accounts/LoginSignup";
import SearchedMovies from "./SearchedMovies";
import RejectedList from "./RejectedList";
import Footer from "./Footer";
import WatchListCard from "./WatchListCard";
import AccountInfo from "./accounts/AccountInfo";

function App() {
  const [movies, setMovies] = useState([]);
  const [token, setToken] = useState(null);
  const [userMovies, setUserMovies] = useState([]);
  const [email, setEmail] = useState("");
  const [currentUserMovies, setCurrentUserMovies] = useState([]);

  const fetchMovies = async () => {
    const url = `${process.env.REACT_APP_MOVIES_HOST}/movies`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const movies = data;
      setMovies(movies);
    }
  };

  const fetchUserMovies = async () => {
    const url = `${process.env.REACT_APP_USER_MOVIES_HOST}/user_movies`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const userMovies = data;
      setUserMovies(userMovies);
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`;
      const fetchConfig = {
        method: "get",
        credentials: "include",
      };
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        const data = await response.json();
        setToken(data);
      }
    };
    fetchUserMovies();
    fetchMovies();
    fetchToken();
  }, []);

  useEffect(() => {
    const getEmail = async () => {
      if (token) {
        const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/accounts/current`;
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          const email = data.email;
          setEmail(email);
        }
      }
    };
    getEmail();
  }, [token]);

  useEffect(() => {
    if (email.length > 0) {
      setCurrentUserMovies(
        userMovies.filter((userMovie) => userMovie.user_email === email)
      );
    }
  }, [userMovies, email]);

  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  return (
    <BrowserRouter basename={basename}>
      <div className="app-container">
        <Nav token={token} setToken={setToken} />
        <main className="content">
          <Routes>
            <Route
              path="*"
              element={
                <MainPage
                  token={token}
                  setToken={setToken}
                  fetchMovies={fetchMovies}
                  movies={movies}
                  fetchUserMovies={fetchUserMovies}
                  userMovies={userMovies}
                  email={email}
                  currentUserMovies={currentUserMovies}
                />
              }
            />
            <Route
              path="/watchlist/*"
              element={
                <Watchlist
                  token={token}
                  userMovies={userMovies}
                  fetchUserMovies={fetchUserMovies}
                  email={email}
                  currentUserMovies={currentUserMovies}
                />
              }
            />
            <Route
              path="/watchlistcard"
              element={
                <WatchListCard
                  token={token}
                  userMovies={userMovies}
                  fetchUserMovies={fetchUserMovies}
                  email={email}
                  currentUserMovies={currentUserMovies}
                />
              }
            />
            <Route
              path="/rejectedlist/*"
              element={
                <RejectedList
                  token={token}
                  userMovies={userMovies}
                  fetchUserMovies={fetchUserMovies}
                  email={email}
                  currentUserMovies={currentUserMovies}
                />
              }
            />
            <Route path="/profile/*" element={<AccountInfo token={token} />} />
            <Route path="/profile/*" element={<AccountInfo token={token} />} />
            <Route
              path="login/"
              element={<Login token={token} setToken={setToken} />}
            />
            <Route
              path="search/"
              element={
                <SearchedMovies
                  token={token}
                  setToken={setToken}
                  movies={movies}
                  fetchMovies={fetchMovies}
                  userMovies={userMovies}
                  fetchUserMovies={fetchUserMovies}
                  email={email}
                  currentUserMovies={currentUserMovies}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
