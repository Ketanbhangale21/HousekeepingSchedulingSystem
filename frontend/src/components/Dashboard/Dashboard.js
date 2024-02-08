/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const [prop1, setProp1] = useState(Boolean);
  useEffect(() => {
    try {
      setProp1(sessionStorage.getItem("UserType"));
    } catch (error) {
      console.log("Error:", error);
    }
  }, []);
  function login() {
    sessionStorage.removeItem("user-token");
    sessionStorage.removeItem("UserType");
    navigate("/");
  }
  return (
    <div>
      <div className="header">
        <h6 className="logo">HomeCare Pro</h6>
        <h1 className="textheader">Welcome Admin</h1>
      </div>
      <div className="sidebar ">
        <div className="sidebar-item ">
          <i className="bi bi-tv"></i>
          Dashboard
        </div>
        {prop1 === "Student" && (
          <div>
            <div className="sidebar-item ">
              <i className="bi bi-telegram"></i>My Requests
            </div>
            <div className="sidebar-item ">
              <i className="bi bi-joystick"></i>Status
            </div>
            <div className="sidebar-item ">
              <i className="bi bi-person-circle"></i>Profile
            </div>
            <div className="sidebar-item ">
              <i className="bi bi-card-checklist"></i>Feedback
            </div>
          </div>
        )}
        {prop1 === "Admin" && (
          <div>
            <div className="sidebar-item ">
              <i className="bi bi-telegram"></i>Requests
            </div>
            <div className="sidebar-item ">
              <i className="bi bi-person-circle"></i>Housekeepers
            </div>
            <div className="sidebar-item ">
              <i className="bi bi-person-bounding-box"></i>Students
            </div>
            <div className="sidebar-item ">
              <i className="bi bi-card-checklist"></i>Feedbacks
            </div>
          </div>
        )}
        <div className="sidebar-item " onClick={login}>
          <i className="bi bi-box-arrow-left"></i>Logout
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
