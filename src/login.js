import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const [uid, setUserId] = useState("admin");
  const [pwd, setPassword] = useState("1234567");
  const [result, setResult] = useState("");
  const [userExist, setUserExist] = useState("");

  let navigate = useNavigate(); // for navigation using code
  let location = useLocation(); // for reading query string params

  function loginButton_click() {
    const queryString = location.search;
    let strReturnUrl = new URLSearchParams(queryString).get("returnUrl");

    if (strReturnUrl == null) {
      strReturnUrl = "/";
    }

    let url = "http://localhost:3005/api/login";

    let userObj = {
      username: uid,
      password: pwd,
    };

    axios
      .post(url, userObj)
      .then((resData) => {
        console.log(resData);
        if (resData.data.message === "User already exists") {
          let token = "ASJDFJF87ADF8745LK4598SAD7FAJSDF45JSDLFKAS";
          sessionStorage.setItem("user-token", token);

          navigate(strReturnUrl);
        } else {
          setResult("Invalid User Id or Password");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);

        setResult("An error occurred during login : ", error);
      });
  }

  return (
    <>
      <fieldset>
        <legend>User Login</legend>

        <label>User Id : </label>
        <input
          type="text"
          value={uid}
          onChange={(event) => setUserId(event.target.value)}
        />
        <br />
        <br />

        <label>Password : </label>
        <input
          type="password"
          value={pwd}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <br />

        <input type="button" onClick={loginButton_click} value="Login" />
        <p style={{ color: "red" }}>{result}</p>
      </fieldset>
    </>
  );
}

export default Login;