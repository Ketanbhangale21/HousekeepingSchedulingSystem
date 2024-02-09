/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { useLocation, useNavigate } from "react-router-dom";
import Staff from "../AdminDashboard/Housekeepers/Staff";

const Dashboard = () => {
  const navigate = useNavigate();
  const [prop1, setProp1] = useState(Boolean);
  const [displayStatus, setDisplayStatus] = useState(true);
  const [displayStaff, setDisplayStaff] = useState(false);
  const handleHousekeeperClick = () => {
    setDisplayStatus(false);
    setDisplayStaff(false);
    setTimeout(() => setDisplayStaff(true), 0);
    // console.log(displayStaff);
  };
  const handleDashboardClick = () => {
    setDisplayStaff(false);
    setDisplayStatus(false);
    setTimeout(() => setDisplayStatus(true), 0);
  };
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
      <div className="mainContainer">
        <div className="sidebar ">
          <div className="sidebar-item " onClick={handleDashboardClick}>
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
              <div className="sidebar-item" onClick={handleHousekeeperClick}>
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

        {/* MAIN CONTENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

        <div className="mainContent">
          {displayStatus && (
            <div className="maindashboard">
              <div><div className="container1">
        <h3 style={{textAlign:"center"}}>DASHBOARD</h3>
        <div className="main__cards">
          <div className="card c1">
            <div className="circle">
           <p className="text">Student Requests</p>
              <span className="sub-text">500+</span>
            </div>
          </div>

          <div className="card c2">
            <div className="circle">
              <p className="text">Completed Requests</p>
              <span className="sub-text">500+</span>
            </div>
          </div>

          <div className="card c3">  
            <div className="circle">
              <p className="text">Pending Requests</p>
              <span className="sub-text1">20</span>
            </div>
          </div>
          <div className="card c4">
            <div className="circle">
              <p className="text">Student Ratings</p>
              <span className="sub-test">4.5/5</span>
            </div>
          </div>
          </div>

        <h3 style={{textAlign:"center"}}>SERVICES</h3>
        <div id="myCarousel" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
      <li data-target="#myCarousel" data-slide-to="2"></li>
    </ol>

    <div class="carousel-inner">
      <div class="item active">
      <img src="images/clean.jpg" width="60%"  />
      </div>

      <div class="item">
      <img src="images/dust.jpg" width="60%"  />
      </div>
    
      <div class="item">
      <img src="images/mopp.jpg" width="60%" />
      </div>
    </div>

    <a class="left carousel-control" href="#myCarousel" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
        

        
        </div></div>
            </div>
          )}
          {/*  Display the appropriate content based on which tab is selected. */}
          {/* AdminTabs */}
          {displayStaff && <Staff />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
