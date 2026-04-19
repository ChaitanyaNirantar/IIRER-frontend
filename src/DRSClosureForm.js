import React, { useState } from "react";
//import axios from "axios";
import EmailSearchDropdown from "./EmailSearchDropdown";
import "./Employee.css";
import api from "./api";

function DRSClosureForm() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    DRS_Closure_Date: "",
    subminimum_job: false,
    competitive_job: false,
    hours_per_week: "",
    hourly_wage: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser) {
      alert("Please select a user first.");
      return;
    }

    const payload = {
      customer_id: selectedUser.id,
      DRS_Closure_Date: formData.DRS_Closure_Date,
      subminimum_job: formData.subminimum_job,
      competitive_job: formData.competitive_job,
      hours_per_week: Number(formData.hours_per_week),
      hourly_wage: Number(formData.hourly_wage),
    };

    try {
      setLoading(true);
      const response = await api.post("/api/users/drsclosure", payload);
      console.log("DRS Closure Response:", response.data);
      alert("DRS Closure submitted successfully!");

      setFormData({
        DRS_Closure_Date: "",
        subminimum_job: false,
        competitive_job: false,
        hours_per_week: "",
        hourly_wage: "",
      });
    } catch (error) {
      console.error("Error submitting DRS Closure:", error);
      alert("Error submitting DRS Closure");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="header-card">
        <div className="brand-bar"></div>
        <p className="header-tag">College of Applied Health Sciences</p>
        <h1>DRS Closure Form</h1>
        <p className="header-subtitle">
          Illinois Institute for Rehabilitation and Employment Research
        </p>
      </div>

      <div className="search-layout">
        <EmailSearchDropdown onUserSelect={setSelectedUser} />

        <form className="vr-card" onSubmit={handleSubmit}>
          <h3 className="vr-title">Add DRS Closure</h3>

          <label>Customer ID</label>
          <input
            type="text"
            value={selectedUser ? selectedUser.id : ""}
            readOnly
            placeholder="Select a user first"
          />

          <label>DRS Closure Date</label>
          <input
            type="date"
            name="DRS_Closure_Date"
            value={formData.DRS_Closure_Date}
            onChange={handleChange}
            required
          />

          <label>
            <input
              type="checkbox"
              name="subminimum_job"
              checked={formData.subminimum_job}
              onChange={handleChange}
            />
            Subminimum Job
          </label>

          <label>
            <input
              type="checkbox"
              name="competitive_job"
              checked={formData.competitive_job}
              onChange={handleChange}
            />
            Competitive Job
          </label>

          <label>Hours Per Week</label>
          <input
            type="number"
            name="hours_per_week"
            value={formData.hours_per_week}
            onChange={handleChange}
            placeholder="Enter hours per week"
            required
          />

          <label>Hourly Wage</label>
          <input
            type="number"
            name="hourly_wage"
            value={formData.hourly_wage}
            onChange={handleChange}
            placeholder="Enter hourly wage"
            required
          />

          <button type="submit" disabled={loading || !selectedUser}>
            {loading ? "Submitting..." : "Submit DRS Closure"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DRSClosureForm;