import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "./api";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState("");

  useEffect(() => {
    if (!email) {
      navigate("/", { replace: true });
    }
  }, [email, navigate]);

  const validateOtp = (value) => {
    if (!value) return "Please enter your OTP.";
    if (!/^\d{6}$/.test(value)) return "OTP must be exactly 6 digits.";
    return "";
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
    if (fieldError) setFieldError(validateOtp(value));
    if (error) setError("");
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    const validationError = validateOtp(otp);
    if (validationError) {
      setFieldError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/api/users/verify-otp", { email, otp });

      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (err) {
      const status = err.response?.status;
      const serverMessage = err.response?.data?.message;

      if (status === 400 || status === 401) {
        setError(serverMessage || "Invalid or expired OTP. Please try again.");
      } else if (status === 429) {
        setError("Too many attempts. Please wait a moment before trying again.");
      } else if (!err.response) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <div style={styles.topBar}></div>

        <div style={styles.cardBody}>
          <p style={styles.universityText}>
            University of Illinois Urbana-Champaign
          </p>

          <h1 style={styles.title}>Verify OTP</h1>

          <p style={styles.subtitle}>
            Enter the one-time passcode sent to <strong>{email}</strong>
          </p>

          {error && (
            <div style={styles.errorBanner} role="alert">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                <circle cx="10" cy="10" r="9" stroke="#ef4444" strokeWidth="1.5" />
                <path d="M10 6v4M10 13.5v.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <p style={styles.errorBannerText}>{error}</p>
            </div>
          )}

          <form onSubmit={handleVerify} noValidate style={styles.form}>
            <div>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={handleOtpChange}
                required
                maxLength="6"
                style={{
                  ...styles.input,
                  borderColor: fieldError ? "#ef4444" : "#cbd5e0",
                  background: fieldError ? "#fff9f9" : "#ffffff",
                }}
                aria-describedby={fieldError ? "otp-error" : undefined}
              />
              {fieldError && (
                <p id="otp-error" style={styles.fieldError}>{fieldError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={loading ? styles.buttonDisabled : styles.button}
            >
              {loading ? "Verifying..." : "Verify OTP"}
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
    background: "linear-gradient(135deg, #13294B 0%, #1f3b63 55%, #FF5F05 100%)",
    fontFamily: "Arial, sans-serif",
    padding: "24px",
    boxSizing: "border-box",
  },
  card: {
    width: "100%",
    maxWidth: "460px",
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
    overflow: "hidden",
    boxSizing: "border-box",
  },
  topBar: {
    height: "12px",
    background: "linear-gradient(90deg, #FF5F05 0%, #13294B 100%)",
  },
  cardBody: {
    padding: "24px 32px 32px 32px",
  },
  universityText: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "600",
    color: "#13294B",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  title: {
    marginTop: "12px",
    marginBottom: "10px",
    fontSize: "30px",
    color: "#13294B",
  },
  subtitle: {
    marginTop: 0,
    marginBottom: "20px",
    fontSize: "15px",
    lineHeight: "1.5",
    color: "#4a5568",
  },
  errorBanner: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    background: "#fff3f3",
    border: "1px solid #fca5a5",
    borderRadius: "10px",
    padding: "12px 14px",
    marginBottom: "16px",
  },
  errorBannerText: {
    margin: 0,
    fontSize: "14px",
    color: "#b91c1c",
    lineHeight: "1.5",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1.5px solid #cbd5e0",
    fontSize: "18px",
    letterSpacing: "4px",
    textAlign: "center",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.15s",
  },
  fieldError: {
    margin: "6px 0 0 4px",
    fontSize: "13px",
    color: "#b91c1c",
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
    boxSizing: "border-box",
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
    boxSizing: "border-box",
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
    boxSizing: "border-box",
    fontSize: "15px",
  },
};

export default VerifyOtp;