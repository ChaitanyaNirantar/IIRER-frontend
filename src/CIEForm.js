import React, { useState } from "react";
import EmailSearchDropdown from "./EmailSearchDropdown";
import "./Employee.css";
import api from "./api";

function CIEForm() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    VR_Service: "",
    CIEEmployment: false,
    Employment_Start_Date: "",
    Job_Description: "",
    hours_per_week: "",
    pay_per_hour: "",
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
      VR_Service: formData.VR_Service,
      CIEEmployment: formData.CIEEmployment,
      Employment_Start_Date: formData.Employment_Start_Date,
      Job_Description: formData.Job_Description,
      hours_per_week: Number(formData.hours_per_week),
      pay_per_hour: Number(formData.pay_per_hour),
    };

    try {
      setLoading(true);
      const response = await api.post("/api/users/ciemployment", payload);
      console.log("CIE Employment Response:", response.data);
      alert("CIE Employment submitted successfully!");

      setFormData({
        VR_Service: "",
        CIEEmployment: false,
        Employment_Start_Date: "",
        Job_Description: "",
        hours_per_week: "",
        pay_per_hour: "",
      });
    } catch (error) {
      console.error("Error submitting CIE employment:", error);
      alert("Error submitting CIE employment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="header-card">
        <div className="brand-bar"></div>
        <p className="header-tag">College of Applied Health Sciences</p>
        <h1>CIE Form</h1>
        <p className="header-subtitle">
          Illinois Institute for Rehabilitation and Employment Research
        </p>
      </div>

      <div className="search-layout">
        <EmailSearchDropdown onUserSelect={setSelectedUser} />

        <form className="vr-card" onSubmit={handleSubmit}>
          <h3 className="vr-title">Add CIE Employment</h3>

          <label>Customer ID</label>
          <input
            type="text"
            value={selectedUser ? selectedUser.id : ""}
            readOnly
            placeholder="Select a user first"
          />
 
          <label>VR Service</label>
          <input
            type="text"
            name="VR_Service"
            value={formData.VR_Service}
            onChange={handleChange}
            placeholder="Enter VR Service"
            required
          />

          <label className="checkbox-inline">
            <input
              type="checkbox"
              name="CIEEmployment"
              checked={formData.CIEEmployment}
              onChange={handleChange}
            />
            CIE Employment
          </label>

          <label>Employment Start Date</label>
          <input
            type="date"
            name="Employment_Start_Date"
            value={formData.Employment_Start_Date}
            onChange={handleChange}
            required
          />

          <label>Job Description</label>
          <input
            type="text"
            name="Job_Description"
            value={formData.Job_Description}
            onChange={handleChange}
            placeholder="Enter job description"
            required
          />

          <label>Hours Per Week</label>
          <input
            type="number"
            name="hours_per_week"
            value={formData.hours_per_week}
            onChange={handleChange}
            placeholder="Enter hours per week"
            required
          />

          <label>Pay Per Hour</label>
          <input
            type="number"
            name="pay_per_hour"
            value={formData.pay_per_hour}
            onChange={handleChange}
            placeholder="Enter pay per hour"
            required
          />

          <button type="submit" disabled={loading || !selectedUser}>
            {loading ? "Submitting..." : "Submit CIE Form"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CIEForm;