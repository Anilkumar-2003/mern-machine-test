import React, { useState } from "react";
import axios from "axios";
import "./AddEmployee.css";
import Layout from "../Layout/Layout";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    email: "",
    mobile_no: "",
    designation: "",
    gender: "",
    course: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.mobile_no) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/add-employee",
        formData
      );
      setMessage(response.data.message);
      setFormData({
        image: "",
        name: "",
        email: "",
        mobile_no: "",
        designation: "",
        gender: "",
        course: "",
      });
    } catch (error) {
      console.error("Error adding employee:", error);
      setMessage(
        error.response?.data?.message ||
          "An error occurred while adding the employee."
      );
    }
  };

  return (
    <div>
      <Layout />

      <div className="add-employee-container">
        <h2 className="form-title">Add Employee</h2>
        {message && <p className="message">{message}</p>}
        <form className="add-employee-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="mobile_no"
              placeholder="Mobile No"
              value={formData.mobile_no}
              onChange={handleChange}
              required
            />
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          <div className="form-group">
            <label>Gender</label>
            <div className="gender-options">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formData.gender === "Other"}
                  onChange={handleChange}
                />
                Other
              </label>
            </div>
          </div>
          <div className="form-group">
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
            >
              <option value="">Select Course</option>
              <option value="B.Sc">B.Sc</option>
              <option value="MCA">MCA</option>
              <option value="M.Sc">M.Sc</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
