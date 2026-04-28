import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/api/users/signup", formData);

      console.log(response.data);
      alert("Signup successful!");

      navigate("/");
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data);
      } else {
        alert("Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.topBar}></div>

        <p style={styles.universityText}>
          University of Illinois Urbana-Champaign
        </p>

        <h1 style={styles.title}>Create Account</h1>

        <p style={styles.subtitle}>
          Illinois Institute for Rehabilitation and Employment Research
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter university email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={loading ? styles.buttonDisabled : styles.button}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            style={styles.secondaryButton}
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #13294B 0%, #1f3b63 55%, #FF5F05 100%)",
    fontFamily: "Arial, sans-serif",
    padding: "24px"
  },

  card: {
    width: "100%",
    maxWidth: "460px",
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
    padding: "0 32px 32px 32px",
    boxSizing: "border-box",
    overflow: "hidden"
  },

  topBar: {
    height: "12px",
    background: "linear-gradient(90deg, #FF5F05 0%, #13294B 100%)",
    margin: "0 -32px 24px -32px"
  },

  universityText: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "600",
    color: "#13294B",
    textTransform: "uppercase"
  },

  title: {
    marginTop: "12px",
    marginBottom: "10px",
    fontSize: "30px",
    color: "#13294B",
    fontWeight: "700"
  },

  subtitle: {
    marginTop: 0,
    marginBottom: "28px",
    color: "#4a5568",
    fontSize: "15px",
    lineHeight: "1.5"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    width: "100%",
    boxSizing: "border-box"
  },

  fieldGroup: {
    display: "flex",
    flexDirection: "column"
  },

  label: {
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#13294B"
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #cbd5e0",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box"
  },

  button: {
    width: "100%",
    padding: "13px 16px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#FF5F05",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    boxSizing: "border-box"
  },

  buttonDisabled: {
    width: "100%",
    padding: "13px 16px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#f4a57a",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "not-allowed",
    boxSizing: "border-box"
  },

  secondaryButton: {
    width: "100%",
    padding: "12px",
    border: "1px solid #13294B",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    color: "#13294B",
    fontWeight: "700",
    cursor: "pointer",
    boxSizing: "border-box"
  }
};

export default Signup;