import React, { useState } from "react";
import axios from "axios";

function PdfUploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfId, setPdfId] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a PDF first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "/upload-pdf",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setMessage(`Upload successful. PDF ID: ${response.data.id}`);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Upload failed.");
    }
  };

  const handleViewPdf = async () => {
    if (!pdfId) {
      setMessage("Please enter a PDF ID.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `/api/users/pdf/${pdfId}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const fileURL = window.URL.createObjectURL(blob);
      window.open(fileURL, "_blank");
    } catch (error) {
      console.error("View error:", error);
      setMessage("Could not open PDF.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.topBar}></div>

        <p style={styles.universityText}>
          University of Illinois Urbana-Champaign
        </p>

        <h1 style={styles.title}>IIRER PDF Portal</h1>
        <p style={styles.subtitle}>Upload and view PDF documents</p>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Upload PDF</h2>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            style={styles.input}
          />
          <button onClick={handleUpload} style={styles.button}>
            Upload PDF
          </button>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Open PDF by ID</h2>
          <input
            type="number"
            placeholder="Enter PDF ID"
            value={pdfId}
            onChange={(e) => setPdfId(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleViewPdf} style={styles.secondaryButton}>
            Open PDF
          </button>
        </div>

        {message && <div style={styles.messageBox}>{message}</div>}
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
    fontFamily: "Arial, sans-serif",
    padding: "24px"
  },
  card: {
    width: "100%",
    maxWidth: "650px",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "0 32px 32px 32px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.18)"
  },
  topBar: {
    height: "12px",
    background: "linear-gradient(90deg, #FF5F05, #13294B)",
    margin: "0 -32px 22px -32px",
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
    fontSize: "30px",
    color: "#13294B",
    marginBottom: "10px"
  },
  subtitle: {
    color: "#555",
    marginBottom: "28px"
  },
  section: {
    marginBottom: "24px",
    padding: "20px",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    backgroundColor: "#f8fafc"
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: "14px",
    color: "#13294B",
    fontSize: "20px"
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #cbd5e0",
    fontSize: "15px",
    marginBottom: "14px",
    boxSizing: "border-box"
  },
  button: {
    padding: "12px 16px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#FF5F05",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer"
  },
  secondaryButton: {
    padding: "12px 16px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#13294B",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer"
  },
  messageBox: {
    marginTop: "12px",
    padding: "12px",
    borderRadius: "10px",
    backgroundColor: "#edf2f7",
    color: "#1a202c"
  }
};

export default PdfUploadPage;