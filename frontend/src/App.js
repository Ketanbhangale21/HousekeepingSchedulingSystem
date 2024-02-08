import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import LoginComponent from "./components/Login/Login";
import Forgotpassword from "./components/Forgotpassword/Forgotpassword";
import ProtectedRoute from "./Routes/ProtectedRoutes";
import RegistrationComponent from "./components/Registration/Registration";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginComponent />}></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute returnUrl="/dashboard">
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/registration"
            element={<RegistrationComponent />}
          ></Route>
          <Route path="/forgotpassword" element={<Forgotpassword />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
