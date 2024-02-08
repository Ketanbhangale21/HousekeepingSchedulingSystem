import React from "react";
import "./dashboard.css";
import { useLocation, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { prop1 } = location.state;
  function login() {
    navigate("/");
    // alert(prop1);
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
        {!prop1 && (
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
        {prop1 && (
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
