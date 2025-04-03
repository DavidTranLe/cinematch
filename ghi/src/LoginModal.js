import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";
import "./CSS/LogInPage.css";

function LoginModal({ setToken, closeModal }) {
  // State variables
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create a ref for the login-box instead of using getElementById
  const loginBoxRef = useRef(null);

  const navigate = useNavigate();

  // Setup effect to ensure any CSS animations reset when modal opens
  useEffect(() => {
    if (loginBoxRef.current) {
      loginBoxRef.current.classList.remove("right-panel-active");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const form = new FormData();
      form.append("username", email);
      form.append("password", password);

      const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`;
      const response = await fetch(url, {
        method: "post",
        body: form,
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        const tokenData = data.access_token;

        // Set the token first
        setToken(tokenData);

        // Reset form
        setEmail("");
        setPassword("");
        setPasswordConfirm("");

        try {
          closeModal();
          navigate("/");
        } catch (navigationError) {
          console.error("Navigation error:", navigationError);
        }
      } else {
        setErrorMessage(
          response.status === 401
            ? "Invalid email or password."
            : "An error occurred. Please try again."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validatePasswordMatch = () => {
    if (password !== passwordConfirm) {
      setErrorMessage2("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    if (!validatePasswordMatch()) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage2("");

    try {
      const data = {
        email,
        password,
        name,
      };

      const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/accounts`;
      const response = await fetch(url, {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        handleLogin(e);
      } else if (response.status === 409) {
        setErrorMessage2("An account with this email already exists.");
      } else {
        setErrorMessage2("Registration failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage2("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Use the ref instead of getElementById
  const handleClickSignUp = () => {
    if (loginBoxRef.current) {
      loginBoxRef.current.classList.add("right-panel-active");
    }
  };

  // Use the ref instead of getElementById
  const handleClickSignIn = () => {
    if (loginBoxRef.current) {
      loginBoxRef.current.classList.remove("right-panel-active");
    }
  };

  const handleInputFocus = (e) => {
    e.target.className = "focus";
  };

  const handleInputBlur = (e) => {
    if (e.target.value === "") {
      e.target.className = "";
    }
  };

  // Function to focus the input when the surrounding div is clicked
  const handleTextboxClick = (inputId) => {
    document.getElementById(inputId)?.focus();
  };

  return (
    <div className="loginPage modal-login-page">
      <div className="container1" ref={loginBoxRef}>
        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmitSignUp}>
            <h1 className="loginpageH1">Sign Up</h1>

            <div
              className="txtb"
              onClick={() => handleTextboxClick("signupname")}
            >
              <input
                onChange={(e) => setName(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                type="text"
                required
                name="name"
                id="signupname"
                value={name}
              />
              <span data-placeholder="Name"></span>
            </div>

            <div
              className="txtb"
              onClick={() => handleTextboxClick("signupemail")}
            >
              <input
                onChange={(e) => setEmail(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
                type="email"
                name="email"
                id="signupemail"
                value={email}
              />
              <span data-placeholder="Email"></span>
            </div>

            <div
              className="txtb"
              onClick={() => handleTextboxClick("signuppassword")}
            >
              <input
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                type="password"
                required
                name="password"
                id="signuppassword"
                value={password}
              />
              <span data-placeholder="Password"></span>
            </div>

            <div
              className="txtb"
              onClick={() => handleTextboxClick("confirmPassword")}
            >
              <input
                onChange={(e) => setPasswordConfirm(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                type="password"
                required
                id="confirmPassword"
                value={passwordConfirm}
              />
              <span data-placeholder="Confirm Password"></span>
            </div>

            <button
              className="loginpageButton"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <MDBIcon fas icon="spinner" spin className="me-2" />
                  Creating Account...
                </>
              ) : (
                "Register"
              )}
            </button>

            {errorMessage2 && (
              <div className="signupError">{errorMessage2}</div>
            )}
          </form>
        </div>

        {/* Login Form */}
        <div className="form-container log-in-container">
          <form onSubmit={handleLogin}>
            <h1 className="loginpageH1">Login</h1>

            <div className="txtb" onClick={() => handleTextboxClick("email")}>
              <input
                onChange={(e) => setEmail(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
                type="email"
                name="email"
                id="email"
                value={email}
              />
              <span data-placeholder="Email"></span>
            </div>

            <div
              className="txtb"
              onClick={() => handleTextboxClick("password")}
            >
              <input
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
                type="password"
                name="password"
                id="password"
                value={password}
              />
              <span data-placeholder="Password"></span>
            </div>

            <a href="#!" onClick={(e) => e.preventDefault()}>
              Forgot your password?
            </a>

            <button
              type="submit"
              className="loginpageButton"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <MDBIcon fas icon="spinner" spin className="me-2" />
                  Signing In...
                </>
              ) : (
                "Login"
              )}
            </button>

            {errorMessage && <div className="signinError">{errorMessage}</div>}
          </form>
        </div>

        {/* Overlay Container */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="loginpageH1">Welcome Back!</h1>
              <p className="loginpageP">
                Already have an account? Login to access your movie
                recommendations!
              </p>
              <button
                onClick={handleClickSignIn}
                className="ghost loginpageButton"
                id="logIn"
                type="button"
              >
                <MDBIcon fas icon="sign-in-alt" className="me-2" />
                Login
              </button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1 className="loginpageH1">Hello, Movie Fan!</h1>
              <p className="loginpageP">
                Join Cinematch to discover your next favorite movies
              </p>
              <button
                onClick={handleClickSignUp}
                className="ghost loginpageButton"
                id="signUp"
                type="button"
              >
                <MDBIcon fas icon="user-plus" className="me-2" />
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
