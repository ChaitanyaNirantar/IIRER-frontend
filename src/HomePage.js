import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.topBar}></div>

        <p style={styles.universityText}>
          University of Illinois Urbana-Champaign
        </p>

        <h1 style={styles.title}>IIRER Application</h1>

        <p style={styles.subtitle}>
          Select a service to continue
        </p>

        <div style={styles.buttonGrid}>
          <button
            style={styles.button}
            onClick={() => navigate("/employeeform")}
          >
            AT Application
          </button>

          <button
            style={styles.button}
            onClick={() => navigate("/email-search")}
          >
            VR Services Received
          </button>

          <button
            style={styles.button}
            onClick={() => navigate("/cie-form")}
          >
            CIE Form
          </button>

          <button
            style={styles.button}
            onClick={() => navigate("/drs-closure")}
          >
            AT Closure
          </button>
        </div>

        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
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
    background: "linear-gradient(135deg, #13294B 0%, #1f3b63 60%, #FF5F05 100%)",
    fontFamily: "Arial, sans-serif"
  },
  card: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "0 30px 30px 30px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
    textAlign: "center"
  },
  topBar: {
    height: "12px",
    background: "linear-gradient(90deg, #FF5F05, #13294B)",
    margin: "0 -30px 20px -30px",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px"
  },
  universityText: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#13294B",
    textTransform: "uppercase",
    marginBottom: "10px"
  },
  title: {
    fontSize: "28px",
    color: "#13294B",
    marginBottom: "10px"
  },
  subtitle: {
    color: "#555",
    marginBottom: "25px"
  },
  buttonGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    marginBottom: "20px"
  },
  button: {
    padding: "15px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#01075b",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.2s",
    boxShadow: "0 6px 12px rgba(0,0,0,0.15)"
  },
  logoutButton: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#c62828",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  }
};

export default HomePage;