import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { verifyEmail } from "../api/authApi";

function VerifyEmail() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail(token);

        setMessage("Email verified successfully!");

        setTimeout(() => {
          navigate("/email-verified", {
            replace: true,
          });
        }, 1000);

      } catch (err) {

        setMessage(
          err.response?.data?.message ||
            "Verification link is invalid or has expired."
        );

        setTimeout(() => {
          navigate("/login", {
            replace: true,
          });
        }, 2500);
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow p-5 text-center"
        style={{ width: "450px" }}
      >
        <div
          className="spinner-border text-primary mb-3 mx-auto"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>

        <h3>{message}</h3>

        <p className="text-muted mt-3">
          Please wait while we verify your account.
        </p>
      </div>
    </div>
  );
}

export default VerifyEmail;