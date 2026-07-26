import React from "react";
import { Link } from "react-router-dom";

function OpenAccount() {
  return (
    <div className="container p-5">
      <div className="row text-center">
        <h1>Open a Aurex account</h1>

        <p>
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
          F&O trades.
        </p>

        <Link
          to="/signup"
          className="landing-btn p-2 fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto" ,textDecoration:"none"}}
        >
          Sign up for free
        </Link>
      </div>
    </div>
  );
}

export default OpenAccount;