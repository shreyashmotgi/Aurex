import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { forgotPassword } from "../api/authApi";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await forgotPassword(email);

      toast.success(res.message);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to send reset link"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow p-5"
        style={{ width: "400px" }}
      >
        <div className="text-center mb-4">
          <img
            src="/media/images/kite-logo.svg"
            alt="Kite"
            width="70"
          />

          <h3 className="mt-3">
            Forgot Password?
          </h3>

          <p className="text-muted">
            Enter your registered email and we'll
            send you a password reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <button
            className="landing-btn w-100"
            disabled={loading}
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to="/login">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;