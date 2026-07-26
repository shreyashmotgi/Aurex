import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

import { useAuth } from "../contexts/AuthContext";

function Login() {
  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If the user tried to open a protected page first,
  // redirect back there after login.
  const redirectTo = location.state?.from?.pathname || "/dashboard";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);

      navigate(location.pathname, {
        replace: true,
        state: {},
      });
    }
  }, [location, navigate]);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await googleSignIn(credentialResponse.credential);
      toast.success("Welcome! Google Sign In Successful 🎉");

      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Google Sign Up Failed");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await login(formData);

      navigate(redirectTo, {
        replace: true,
      });
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message ||
          "Login failed. Please check your credentials and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card shadow p-5" style={{ width: "400px" }}>
        <div className="text-center mb-4">
          <img src="/media/images/kite-logo.svg" alt="Kite" width="70" />

          <h3 className="mt-3">Welcome Back</h3>

          <p className="text-muted">Login to your trading account</p>
        </div>

        {errorMessage && (
          <div className="alert alert-danger py-2" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>

          <button
            type="submit"
            className="landing-btn w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className="text-end mb-3">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <p className="text-center mt-4">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>

        <div className="d-flex justify-content-center mt-3">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              setErrorMessage("Google Login Failed");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
