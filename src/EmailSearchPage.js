import React, { useState } from "react";
import axios from "axios";
import EmailSearchDropdown from "./EmailSearchDropdown";
import "./Employee.css";

function EmailSearchPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [vrService, setVrService] = useState("");
  const [effectiveness, setEffectiveness] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitVRService = async (e) => {
    e.preventDefault();

    if (!selectedUser) {
      alert("Please select a user first.");
      return;
    }

    const payload = {
      customer_id: selectedUser.id,
      VR_Service: vrService,
      effectiveness: effectiveness,
    };

    try {
      setLoading(true);
      const response = await axios.post("/api/users/newvrservice", payload);
      console.log("VR Service Response:", response.data);
      alert("VR Service submitted successfully!");
      setVrService("");
      setEffectiveness("");
    } catch (error) {
      console.error("Error submitting VR service:", error);
      alert("Error submitting VR service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="header-card">
        <div className="brand-bar"></div>
        <p className="header-tag">College of Applied Health Sciences</p>
        <h1>VR Service Lookup</h1>
        <p className="header-subtitle">
          Illinois Institute for Rehabilitation and Employment Research
        </p>
      </div>

      <div className="search-layout">
        <EmailSearchDropdown onUserSelect={setSelectedUser} />

        <form className="vr-card" onSubmit={handleSubmitVRService}>
          <h3 className="vr-title">Add VR Service</h3>

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
            value={vrService}
            onChange={(e) => setVrService(e.target.value)}
            placeholder="Enter VR Service"
          />

          <label>Effectiveness</label>
          <input
            type="text"
            value={effectiveness}
            onChange={(e) => setEffectiveness(e.target.value)}
            placeholder="Enter effectiveness"
          />

          <button type="submit" disabled={loading || !selectedUser}>
            {loading ? "Submitting..." : "Submit VR Service"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmailSearchPage;