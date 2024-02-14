import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import axios from "axios";

// LoginComponent is a functional component that handles the login functionality
const LoginComponent = () => {
  // Initialize state variables for email, password, error message, and password visibility
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorField, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // TogglePasswordVisibility toggles the password visibility between text and password types
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // navigate and location are hooks from react-router-dom for navigation and location handling
  const navigate = useNavigate();
  const location = useLocation();

  // validateEmail checks if the given email is valid or not
  const validateEmail = (email) => {
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailPattern.test(email);
  };

  // handleEmailChange and handlePasswordChange update the email and password state variables
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setError("");
  };

  // handleLogin handles the form submission and validates the email and password
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email or password cannot be empty");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email-id");
      return;
    } else {
      Login(email, password);
    }
  };

  // Login is an async function that sends a POST request to the API for login
  const Login = (email, password) => {
    setError("");
    const loginData = { email, password };
    axios
      .post("http://localhost:3005/api/login", loginData)
      .then((response) => {
        if (response && response.data.message === "Login successful") {
          console.log("Login successful");
          setError(response.data.message);
          // Perform any necessary actions upon successful login
        } else {
          setError(response.data.error);
          console.error("Login failed:", response.data.error);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });

    // Set the user type and email in the session storage
    if (email === "admin@example.com") {
      sessionStorage.setItem("UserType", "Admin");
    } else {
      sessionStorage.setItem("UserEmail", email);
      sessionStorage.setItem("UserType", "Student");
    }

    // Get the return URL from the location query string
    const queryString = location.search;
    let strReturnUrl = new URLSearchParams(queryString).get("returnUrl");
    if (strReturnUrl === null) {
      strReturnUrl = "/dashboard";
    }

    // Set a dummy token in the session storage
    let token = "ASJDFJF87ADF8745LK4598SAD7FAJSDF45JSDLFKAS";
    sessionStorage.setItem("user-token", token);

    // Navigate to the return URL
    navigate(strReturnUrl);
  };

  // Return the JSX for the login form
  return (
    <div className="outer-container background">
      <div className="container">
        <div className="form-container log-in-container">
          <form className="input-form">
            <h1 className="heading">Login</h1>
            <div className="formgroup">
              <input
                className="input"
                type="email"
                placeholder="Enter your email-id"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="formgroup">
              <input
                className="input"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
              <p className="showPassword1" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <i class="bi bi-eye-slash"></i>
                ) : (
                  <i class="bi bi-eye"></i>
                )}
              </p>
            </div>
            <button type="button" className="submit" onClick={handleLogin}>
              Login
            </button>
            <Link
              to="/forgotpassword"
              className="mb-3 mt-3 link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            >
              Forgot Password
            </Link>
            <p className="d-inline">
              Not a Member?
              <Link
                to="/registration"
                className="mb-3 mt-3 link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              >
                SignUp
              </Link>
            </p>
            {errorField && (
              <div className="error-message text-danger">{errorField}</div>
            )}
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1 className="heading2">HomeCare Pro</h1>
              <p className="section">
                This is the place where you can schedule your comfortable time
                for cleaning purpose for HouseKeeper.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the LoginComponent for use in other modules
export default LoginComponent;
