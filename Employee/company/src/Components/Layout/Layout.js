import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logged out");
    navigate("/login");
  };

  return (
    <div className="layout-container">
      <nav className="navbar">
        <div className="navbar-brand">Admin Panel</div>
        <ul className="navbar-links">
          <li>
            <a onClick={() => navigate("/home")}>Home</a>
          </li>
          <li onClick={() => navigate("/employees/list")}>
            <a>Employee List</a>
          </li>
          <li onClick={() => navigate("/add/employee")}>
            <a href="#create-employee">Create Employee</a>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </li>
        </ul>
      </nav>
      {/* <main className="main-content"> */}
        <Outlet />
      {/* </main> */}
    </div>
  );
};

export default Layout;
