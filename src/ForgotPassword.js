import React, { useEffect, useState } from "react";
import "./login.css";
import axios from "axios";
//import { useNavigate } from "react-router-dom";

function ForgotPasswordComponent() {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3005/api/users");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secquestion, setSecQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [userData, setUserData] = useState([]);
  const [fieldsEmpty, setFieldsEmpty] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //let navigate = useNavigate();
  const securityQuestions = [
    "What is your mother's maiden name?",
    "What is the name of your first pet?",
    "What is your favorite movie?",
    "What city were you born in?",
    "What is the name of your elementary school?",
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    if (!username || secquestion === "" || answer === "") {
      setFieldsEmpty("Please fill out all fields.");
      return;
    }
    idCheck(username, secquestion, answer);
  };
  const isPasswordValid = (password) => {
    if (password.length < 8) {
      return {
        valid: false,
        error: "Password should contain at least 8 characters",
      };
    }
    if (!/[A-Z]/.test(password)) {
      return {
        valid: false,
        error: "Password should contain at least 1 uppercase letter",
      };
    }
    if (!/[a-z]/.test(password)) {
      return {
        valid: false,
        error: "Password should contain at least 1 lowercase letter",
      };
    }
    if (!/\d/.test(password)) {
      return {
        valid: false,
        error: "Password should contain at least 1 digit",
      };
    }
    if (!/[\W_]/.test(password)) {
      return {
        valid: false,
        error: "Password should contain at least 1 special character",
      };
    }
    return { valid: true };
  };

  const idCheck = (username) => {
    // setFieldsEmpty("");
    const user = userData.find(
      (user) => user.emailid === username.toLowerCase()
    );
    if (!user) {
      setFieldsEmpty("Unregistered Email Id");
      return;
    }
    if (secquestion !== "") {
      if (user.question === secquestion) {
        if (user.answer === answer) {
          const isValidPassword = isPasswordValid(password);
          if (!isValidPassword.valid) {
            setFieldsEmpty(isValidPassword.error);
            return false;
          } else {
            setFieldsEmpty("");
            alert("updated");
            const dataObj = {
              emailid: username,
              password: password,
            };
            let url = "http://localhost:3005/api/modify/user";
            axios.put(url, dataObj).then((resData) => {
              alert("Password Updated successful");
            //  navigate("/login");
            });
          }
        } else {
          setFieldsEmpty("Incorrect Answer");
        }
      } else {
        setFieldsEmpty("Please Select Correct Question !!");
      }
    } else {
      fieldsEmpty("Please Select a Question ");
    }
  };

  return (
    <div className="login-container">
      <div
        className={`inner-container ${fieldsEmpty !== "" ? "error-class" : ""}`}
      >
        <h2>Forgot Password</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Email-Id</label>
            <input
              type="email"
              id="username"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setFieldsEmpty("");
              }}
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Security-question">
              Choose a Security Question
            </label>
            <select
              className="secQuestion"
              id="Security-question"
              name="Security-question"
              value={secquestion}
              onChange={(e) => {
                setSecQuestion(e.target.value);
                setFieldsEmpty("");
              }}
            >
              <option value="">Select a security question</option>
              {securityQuestions.map((question, index) => (
                <option
                  style={{ maxWidth: "200px" }}
                  key={index}
                  value={question}
                >
                  {question}
                </option>
              ))}{" "}
            </select>
          </div>
          {secquestion && (
            <div className="form-group">
              <label htmlFor="Answer">Answer</label>
              <input
                type="text"
                id="Answer"
                name="Answer"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  setFieldsEmpty("");
                }}
                autoComplete="off"
              />
            </div>
          )}
          {answer && (
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFieldsEmpty("");
                }}
                autoComplete="off"
              />
              <a
                className="showPassword"
                href="javascript:void(0);"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide Password" : "Show Password"}
              </a>
            </div>
          )}
          <button type="submit">Submit</button>
          {/* Add link to navigate back to login page */}
          <p className="mt-1" style={{ textAlign: "center" }}>
            Remembered your password?{" "}
            <a className="mt-1" href="/login">
              Login Here
            </a>
          </p>
          {fieldsEmpty && (
            <div className="error-message text-center text-danger">
              {fieldsEmpty}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordComponent;