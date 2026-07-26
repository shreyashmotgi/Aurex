import { Link } from "react-router-dom";

function EmailVerified() {
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card p-5 text-center shadow">

        <h2 className="text-success">
          Email Verified 🎉
        </h2>

        <p className="mt-3">
          Your account has been verified successfully.
        </p>

        <Link
          to="/login"
          className="landing-btn mt-3"
        >
          Login
        </Link>

      </div>
    </div>
  );
}

export default EmailVerified;