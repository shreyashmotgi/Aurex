import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signupUser } from "../../api/authApi";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../contexts/AuthContext";

function Hero() {
  const navigate = useNavigate();
  const { googleSignIn } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
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

  const handleGoogleError = () => {
    console.log("GOOGLE FAILED");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await signupUser(formData);

      navigate("/login", {
        state: {
          message:
            "Registration successful. Please verify your email before logging in.",
        },
      });
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container p-5">
      <div className="row text-center mt-5">
        <h1>Open a free demat and trading account online</h1>

        <h3 className="text-muted mt-3 fs-4">
          Start investing brokerage free and join a community of 1.6+ crore
          investors and traders
        </h3>
      </div>

      <div className="row align-items-center mt-5">
        <div className="col-lg-6 text-center mb-5">
          <img
            src="media/images/account_open.svg"
            alt="Open Account"
            className="img-fluid"
          />
        </div>

        <div className="col-lg-6">
          <h2>Create Account</h2>

          <p className="text-muted mb-4">
            Start investing in just a few minutes.
          </p>

          {errorMessage && (
            <div className="alert alert-danger py-2" role="alert">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="fullName"
                className="form-control"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                disabled={isSubmitting}
                minLength={8}
                required
              />
              <small className="text-muted">
                Password must be min 8 characters long.
              </small>
            </div>

            <button
              className="landing-btn w-100"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <div className="text-center mt-3">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </div>
          <div className="text-center mt-4">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="row text-center mt-5">
        <h2>Already have a demat account?</h2>

        <p className="text-muted">
          Move your holdings to Aurex and we'll cover your transfer costs, up to
          ₹500. <a href="/">Learn more</a>
        </p>
      </div>
    </div>
  );
}

export default Hero;
