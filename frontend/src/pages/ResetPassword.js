import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { resetPassword } from "../api/authApi";

function ResetPassword() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");

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

      navigate("/login");

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
        style={{ width: "400px" }}
      >
        <h3 className="text-center mb-4">
          Reset Password
        </h3>

        {errorMessage && (
          <div className="alert alert-danger">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <input
              type="password"
              className="form-control"
              placeholder="New Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          <div className="mb-4">

            <input
              type="password"
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

          </div>

          <button
            className="landing-btn  w-100"
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