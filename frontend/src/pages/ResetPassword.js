import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";

import { resetPassword } from "../api/authApi";

function ResetPassword() {

  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {

    if (localStorage.getItem("token")) {
      navigate("/");
    }

  }, [navigate]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setErrorMessage("");

    if (password.length < 8) {
      return setErrorMessage(
        "Password must contain at least 8 characters."
      );
    }

    if (password !== confirmPassword) {
      return setErrorMessage(
        "Passwords do not match."
      );
    }

    try {

      setLoading(true);

      await resetPassword(token, password);

      toast.success(
        "Password changed successfully."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {

      setErrorMessage(
        err.response?.data?.message ||
          "Unable to reset password."
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
        style={{ width: "420px" }}
      >

        <h3 className="text-center mb-2">
          Create a New Password
        </h3>

        <p className="text-center text-muted mb-4">
          Enter your new password below.
        </p>

        {errorMessage && (
          <div className="alert alert-danger">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Password */}

          <div className="mb-3">

            <div className="input-group">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                className="form-control"
                placeholder="New Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                <i
                  className={`bi ${
                    showPassword
                      ? "bi-eye-slash"
                      : "bi-eye"
                  }`}
                ></i>
              </button>

            </div>

          </div>

          {/* Confirm Password */}

          <div className="mb-4">

            <div className="input-group">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                required
              />

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                <i
                  className={`bi ${
                    showConfirmPassword
                      ? "bi-eye-slash"
                      : "bi-eye"
                  }`}
                ></i>
              </button>

            </div>

          </div>

          <button
            className="landing-btn w-100"
            disabled={loading}
          >
            {loading
              ? "Updating..."
              : "Reset Password"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default ResetPassword;