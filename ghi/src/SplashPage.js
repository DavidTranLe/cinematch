import React, { useState } from "react";
import {
  MDBContainer,
  MDBTypography,
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";
import "./splash.css";
import jumbotron from "./images/jumbotron.jpeg";
import LoginModal from "./LoginModal";

function SplashPage({ setToken }) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Add this safety check
  const safeSetToken =
    typeof setToken === "function"
      ? setToken
      : (token) => {
          console.error(
            "setToken is not properly passed to SplashPage:",
            setToken
          );
        };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  return (
    <header className="main-page" style={{ paddingLeft: 0 }}>
      {/* Hero Section */}
      <div
        className="p-5 text-center bg-image"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)),url(${jumbotron})`,
          height: 750,
          backgroundPosition: "70% 30%",
          backgroundSize: "cover",
        }}
      >
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="text-white">
            <h1 className="mb-3 display-4 fw-bold">
              Find your perfect movie match
            </h1>
            <h4 className="mb-4 lead">Swipe. Match. Watch. Repeat.</h4>
            <MDBBtn
              color="light"
              outline
              size="lg"
              className="px-5"
              onClick={toggleLoginModal}
            >
              Sign Up <MDBIcon fas icon="arrow-right" className="ms-2" />
            </MDBBtn>
          </div>
        </div>
      </div>

      {/* Movie Showcase Section */}
      <div
        style={{
          background:
            "linear-gradient(to right bottom, #000000, #040102, #070203, #0b0405, #0e0506, #170708, #1e090a, #240b0a, #300c0b, #3c090c, #49050b, #55000a)",
        }}
      >
        <br></br>
        <MDBContainer className="text-center">
          <MDBTypography tag="div" className="mb-5">
            <p className="fs-2 fw-bold text-white mb-3">Welcome to Cinematch</p>
            <p className="text-white">
              Your personal movie matchmaker. Swipe right on films you love,
              left on those you don't. We'll learn your taste and recommend your
              next favorite film.
            </p>
          </MDBTypography>
        </MDBContainer>

        <section>
          <div className="scroll-holder">
            <div className="scroll-tray">
              <div>
                <img
                  src="https://wehco.media.clients.ellingtoncms.com/img/photos/2022/11/24/glass_1125_t800.jpg?90232451fbcadccc64a17de7521d859a8f88077d"
                  alt="Glass Onion"
                />
              </div>
              <div>
                <img
                  src="https://www.indiewire.com/wp-content/uploads/2022/11/Decision-to-Leave.jpg?w=1280"
                  alt="Decision to Leave"
                />
              </div>
              <div>
                <img
                  src="https://www.indiewire.com/wp-content/uploads/2022/11/Blonde.jpg?w=1280"
                  alt="Blonde"
                />
              </div>
              <div>
                <img
                  src="https://www.indiewire.com/wp-content/uploads/2022/11/Everything-Everywhere-All-at-Once.jpg?w=1280"
                  alt="Everything Everywhere All at Once"
                />
              </div>
              <div>
                <img
                  src="https://www.indiewire.com/wp-content/uploads/2022/11/All-the-Beauty-and-the-Bloodshed.jpg?w=1280"
                  alt="All the Beauty and the Bloodshed"
                />
              </div>
              <div>
                <img
                  src="https://www.indiewire.com/wp-content/uploads/2022/11/Vengeance.jpg?w=1280"
                  alt="Vengeance"
                />
              </div>
              <div>
                <img
                  src="https://www.indiewire.com/wp-content/uploads/2022/11/Tar.jpg?w=1280"
                  alt="Tar"
                />
              </div>
              <div>
                <img
                  src="https://www.indiewire.com/wp-content/uploads/2022/11/Dont-Worry-Darling.jpg?w=1280"
                  alt="Don't Worry Darling"
                />
              </div>
              <div>
                <img
                  src="https://www.indiewire.com/wp-content/uploads/2022/11/Babylon.jpg?w=1280"
                  alt="Babylon"
                />
              </div>
              <div>
                <img
                  src="https://www.indiewire.com/wp-content/uploads/2022/11/She-Said.jpg?w=1213"
                  alt="She Said"
                />
              </div>
              <div>
                <img
                  src="https://www.indiewire.com/wp-content/uploads/2022/11/White-Noise.jpg?w=1280"
                  alt="White Noise"
                />
              </div>
              <div>
                <img
                  src="https://www.indiewire.com/wp-content/uploads/2022/11/Pearl.jpg?w=1280"
                  alt="Pearl"
                />
              </div>
              <div>
                <img
                  src="https://www.indiewire.com/wp-content/uploads/2022/11/Top-Gun-Maverick-2.jpg?w=1280"
                  alt="Top Gun: Maverick"
                />
              </div>
              <div>
                <img
                  src="https://www.indiewire.com/wp-content/uploads/2022/11/Obi_Wan_Kenobi_Digital_KeyArt_Obiwan_v3_Lg.jpg?w=1280"
                  alt="Obi-Wan Kenobi"
                />
              </div>
            </div>
          </div>
        </section>
        <br></br>
      </div>

      {/* FAQ Section */}
      <div
        className="faq"
        style={{
          background:
            "linear-gradient(to right bottom, #000000, #040102, #070203, #0b0405, #0e0506, #170708, #1e090a, #240b0a, #300c0b, #3c090c, #49050b, #55000a)",
        }}
      >
        <h1 style={{ color: "white" }}>Frequently Asked Questions</h1>
        <div className="questions">
          <div className="question">
            <input type="checkbox" id="q1" />
            <label className="header" htmlFor="q1">
              What is Cinematch?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </label>
            <div className="answer">
              Cinematch is your personal movie matchmaker. Think of it as
              "Tinder for movies" – a fun, interactive platform where you swipe
              right on films you're interested in and left on those you'd rather
              skip. Our intelligent algorithm learns your taste and recommends
              movies you're likely to love, making movie nights a hit every
              time.
            </div>
          </div>
          <div className="question">
            <input type="checkbox" id="q2" />
            <label className="header" htmlFor="q2">
              How does Cinematch work?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </label>
            <div className="answer">
              Our recommendation engine analyzes your viewing history,
              preferences, and swipe patterns to curate a personalized selection
              of films just for you. The more you interact with Cinematch, the
              smarter it gets at predicting what you'll enjoy. Simply swipe
              right on movies that catch your interest, or left to pass. It's
              that simple!
            </div>
          </div>
          <div className="question">
            <input type="checkbox" id="q3" />
            <label className="header" htmlFor="q3">
              What makes Cinematch different from other movie apps?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </label>
            <div className="answer">
              Unlike traditional streaming services that overwhelm you with
              endless options, Cinematch presents one tailored recommendation at
              a time, eliminating decision fatigue. We focus on quality matches
              rather than quantity, helping you discover hidden gems and new
              favorites that align with your unique taste profile.
            </div>
          </div>
          <div className="question">
            <input type="checkbox" id="q4" />
            <label className="header" htmlFor="q4">
              Does Cinematch remember what I've watched?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </label>
            <div className="answer">
              Absolutely! Cinematch maintains your personal Watchlist of films
              you've enjoyed and keeps track of those you've rejected. This
              viewing history powers our recommendation algorithm and helps us
              avoid suggesting movies you've already seen or explicitly passed
              on.
            </div>
          </div>
          <div className="question">
            <input type="checkbox" id="q5" />
            <label className="header" htmlFor="q5">
              How do I find movies I've liked in the past?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </label>
            <div className="answer">
              All your right-swiped movies are saved in your Watchlist,
              accessible from the navigation menu. Your Watchlist serves as both
              a curated collection of films you've enjoyed and a reminder of
              great movies you might want to revisit.
            </div>
          </div>
          <div className="question">
            <input type="checkbox" id="q6" />
            <label className="header" htmlFor="q6">
              Can I see the movies I've rejected?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </label>
            <div className="answer">
              Yes! We maintain a Rejected List of all movies you've swiped left
              on. You can access this list from your profile dropdown menu. This
              ensures we won't recommend these films again but also gives you
              the option to reconsider if you change your mind.
            </div>
          </div>
          <div className="question">
            <input type="checkbox" id="q7" />
            <label className="header" htmlFor="q7">
              Is Cinematch a streaming service?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </label>
            <div className="answer">
              No, Cinematch is a recommendation engine that helps you discover
              movies tailored to your taste. We don't host content ourselves,
              but we provide information on where each recommended film is
              available to stream or rent across major platforms.
            </div>
          </div>
        </div>

        {/* Signup button at bottom of FAQ */}
        <div className="text-center mt-5 pb-5">
          <MDBBtn
            color="danger"
            size="lg"
            className="px-5 py-3"
            onClick={toggleLoginModal}
          >
            Join Cinematch Today <MDBIcon fas icon="film" className="ms-2" />
          </MDBBtn>
        </div>
      </div>

      {/* Login Modal */}
      <MDBModal
        show={showLoginModal}
        tabIndex="-1"
        staticBackdrop
        className="login-modal"
      >
        <MDBModalDialog size="lg" centered>
          <MDBModalContent className="login-modal-content">
            <MDBModalHeader className="border-0 bg-transparent">
              <MDBModalTitle></MDBModalTitle>
              <MDBBtn
                className="btn-close btn-close-white"
                color="none"
                onClick={toggleLoginModal}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className="p-0">
              <LoginModal
                setToken={safeSetToken}
                closeModal={toggleLoginModal}
              />
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </header>
  );
}

export default SplashPage;
