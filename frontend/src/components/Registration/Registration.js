import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./registration.css";
import axios from "axios";

const RegistrationComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [errorField, setError] = useState("");

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setError("");
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setError("");
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
    setError("");
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setError("");
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError("");
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setError("");
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !country ||
      !state ||
      !city ||
      !phone ||
      !password ||
      !confirmPassword ||
      !gender
    ) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3005/api/register", {
        firstName,
        lastName,
        email,
        country,
        state,
        city,
        phone,
        password,
        gender,
      });
      // Handle successful registration (redirect, show message, etc.)
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Error registering user:", error);
      setError("Error registering user");
    }
  };

  return (
    <div className="outer-container">
      <div className="container">
        <div className="form-container register-container">
          <form className="form">
            <h1 style={{ color: "#00796b" }}>Register</h1>
            <div className="formgroup">
              <input
                className="input"
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </div>
            <div className="formgroup">
              <input
                className="input"
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </div>
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
                type="text"
                placeholder="Enter your country"
                value={country}
                onChange={handleCountryChange}
              />
            </div>
            <div className="formgroup">
              <input
                className="input"
                type="text"
                placeholder="Enter your state"
                value={state}
                onChange={handleStateChange}
              />
            </div>
            <div className="formgroup">
              <input
                className="input"
                type="text"
                placeholder="Enter your city"
                value={city}
                onChange={handleCityChange}
              />
            </div>
            <div className="formgroup">
              <input
                className="input"
                type="text"
                placeholder="Enter your phone"
                value={phone}
                onChange={handlePhoneChange}
              />
            </div>
            <div className="formgroup">
              <input
                className="input"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="formgroup">
              <input
                className="input"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
            <div className="formgroup">
              <label>
                Gender:
                <select value={gender} onChange={handleGenderChange}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </div>
            <button type="button" onClick={handleRegistration}>
              Register
            </button>
            <Link to="/login" className="mt-3">
              Already have an account? Login
            </Link>
            {errorField && <div className="error-message">{errorField}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationComponent;
