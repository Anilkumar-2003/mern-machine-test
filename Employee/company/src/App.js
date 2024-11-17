import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import EmployeesList from "./Components/EmployeesList/EmployeesList";
import "./App.css";
import AddEmployee from "./Components/AddEmployee/AddEmployee";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Home />} />
        <Route path="/employees/list" element={<EmployeesList />} />
        <Route path="/add/employee" element={<AddEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
