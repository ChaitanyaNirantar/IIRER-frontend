import React, { useState } from "react";
//import axios from "axios";
import "./Employee.css";
import api from "./api";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    salary: "",
    email: "",
    DOB: "",
    dateFormSigned: "",
    drsApplicationDate: "",
    workedSubminimumWage: false,
    currentlyEmployedCompetitiveEmployment: false,
    previousSubminimum: false,
    receiveSsiSsdi: false
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/api/users", {
        ...formData,
        salary: parseFloat(formData.salary)
      });

      console.log("Response:", response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="header-card">
        <div className="brand-bar"></div>
        <p className="header-tag">College of Applied Health Sciences</p>
        <h1>SWITCIE Application Form</h1>
        <p className="header-subtitle">
          Illinois Institute for Rehabilitation and Employment Research
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
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

        <label>DOB:</label>
        <input
          type="date"
          name="DOB"
          value={formData.DOB}
          onChange={handleChange}
          required
        />

        <label>Date Form Signed:</label>
        <input
          type="date"
          name="dateFormSigned"
          value={formData.dateFormSigned}
          onChange={handleChange}
          required
        />

        <label>DRS Application Date:</label>
        <input
          type="date"
          name="drsApplicationDate"
          value={formData.drsApplicationDate}
          onChange={handleChange}
          required
        />

        <label>
          <input
            type="checkbox"
            name="workedSubminimumWage"
            checked={formData.workedSubminimumWage}
            onChange={handleChange}
          />
          Worked Subminimum Wage / With a 14(c) certificate holder
        </label>

        <label>
          <input
            type="checkbox"
            name="currentlyEmployedCompetitiveEmployment"
            checked={formData.currentlyEmployedCompetitiveEmployment}
            onChange={handleChange}
          />
          Currently Employed in Competitive employment / Subminimum wage employment
        </label>

        <label>
          <input
            type="checkbox"
            name="previousSubminimum"
            checked={formData.previousSubminimum}
            onChange={handleChange}
          />
          Previously worked in Subminimum wage job
        </label>

        <label>
          <input
            type="checkbox"
            name="receiveSsiSsdi"
            checked={formData.receiveSsiSsdi}
            onChange={handleChange}
          />
          Received SSI/SSDI funding
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;