import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Layout from "../Layout/Layout";

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("Logged out");
  };

  return (
    <div className="home-container">
      <Layout />
     <div className="dash"><h1>DashBoard</h1></div>
      
      <div className="main-content">
        
        <h1>Welcome to Admin Panel</h1>
        <p>Manage employees efficiently with our intuitive platform.</p>
      </div>
    </div>
  );
};

export default Home;
