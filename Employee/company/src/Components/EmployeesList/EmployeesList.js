import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeesList.css";
import Layout from "../Layout/Layout";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employees");
        setEmployees(response.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError("Failed to load employees. Please try again later.");
      }
    };

    fetchEmployees();
  }, []);

  const handleEdit = (id) => {
    const employeeToEdit = employees.find((emp) => emp._id === id);
    setEditingEmployee(employeeToEdit);
    setEditFormData(employeeToEdit);
    setMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/employees/${editingEmployee._id}`,
        editFormData
      );

      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp._id === editingEmployee._id ? response.data : emp
        )
      );

      setMessage("Employee updated successfully!");
      setEditingEmployee(null);
    } catch (err) {
      console.error("Error updating employee:", err);
      setMessage("Failed to update employee. Please try again later.");
    }
  };

  const handleCancel = () => {
    setEditingEmployee(null);
    setMessage("");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp._id !== id)
      );
      setMessage("Employee deleted successfully!");
    } catch (err) {
      console.error("Error deleting employee:", err);
      setMessage("Failed to delete employee. Please try again later.");
    }
  };

  return (
    <div>
      <Layout />
      <div className="employees-container">
        <h1 className="title">Employees List</h1>
        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}{" "}
        {/* Display success/error message */}
        <table className="employees-table">
          <thead>
            <tr>
              <th>Unique ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Create Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee._id}</td>
                <td>
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className="employee-image"
                  />
                </td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile_no}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.course}</td>
                <td>{new Date(employee.created_at).toLocaleDateString()}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(employee._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editingEmployee && (
          <div className="modal">
            <div className="modal-content">
              <h2>Edit Employee</h2>
              <form>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                />
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
                <input
                  type="tel"
                  name="mobile_no"
                  value={editFormData.mobile_no}
                  onChange={handleInputChange}
                  placeholder="Mobile No"
                />
                <select
                  name="designation"
                  value={editFormData.designation}
                  onChange={handleInputChange}
                >
                  <option value="">Select Designation</option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                </select>
                <input
                  type="text"
                  name="gender"
                  value={editFormData.gender}
                  onChange={handleInputChange}
                  placeholder="Gender"
                />
                <input
                  type="text"
                  name="course"
                  value={editFormData.course}
                  onChange={handleInputChange}
                  placeholder="Course"
                />
                <input
                  type="date"
                  name="created_at"
                  value={
                    new Date(editFormData.created_at)
                      .toISOString()
                      .split("T")[0]
                  }
                  onChange={handleInputChange}
                />
              </form>
              <div className="modal-buttons">
                <button className="save-button" onClick={handleSave}>
                  Save
                </button>
                <button className="cancel-button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeesList;
