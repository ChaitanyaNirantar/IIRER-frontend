import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

      await api.post("/api/users/v1/login", formData);

      alert("OTP sent to your email");

      navigate("/otppage", {
        state: { email: formData.email }
      });
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        alert(error.response.data || `Server responded: ${error.response.status}`);
      } else if (error.request) {
        alert("Request was made but no response came back. Check CORS or backend URL.");
      } else {
        alert(`Request setup failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <div style={styles.topBar}></div>

          <p style={styles.universityText}>
            University of Illinois Urbana-Champaign
          </p>

          <h1 style={styles.title}>IIRER Portal Login</h1>

          <p style={styles.subtitle}>
            Illinois Institute for Rehabilitation and Employment Research
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Enter your university email"
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={loading ? styles.buttonDisabled : styles.button}
            >
              {loading ? "Sending OTP..." : "Login"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/signup")}
              style={styles.secondaryButton}
            >
              Create New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #13294B 0%, #1f3b63 55%, #FF5F05 100%)",
    fontFamily: "Arial, sans-serif",
    padding: "24px",
    boxSizing: "border-box"
  },
  overlay: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: "100%",
    maxWidth: "460px",
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.18)",
    padding: "0 32px 32px 32px",
    overflow: "hidden",
    boxSizing: "border-box"
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
    letterSpacing: "0.3px",
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
    fontSize: "15px",
    lineHeight: "1.5",
    color: "#4a5568"
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
    flexDirection: "column",
    width: "100%"
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
    marginTop: "8px",
    padding: "13px 16px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#FF5F05",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 6px 14px rgba(255, 95, 5, 0.25)",
    boxSizing: "border-box"
  },
  buttonDisabled: {
    width: "100%",
    marginTop: "8px",
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

export default Login;