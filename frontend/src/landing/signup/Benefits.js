import React from "react";

function Benefits() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">

        {/* Left Side */}
        <div className="col-md-6 text-center">
          <img
            src="media/images/acop-benefits.svg"
            alt="Benefits"
            className="img-fluid"
            style={{width:"60%"}}
          />

          <h2 className="mt-4 fs-4">
            Benefits of opening a Aurex demat account
          </h2>
        </div>

        {/* Right Side */}
        <div className="col-md-6">

          <div className="mb-5">
            <h3>Unbeatable pricing</h3>
            <p className="text-muted">
              Zero charges for equity & mutual fund investments.
              Flat ₹20 fees for intraday and F&O trades.
            </p>
          </div>

          <div className="mb-5">
            <h3>Best investing experience</h3>
            <p className="text-muted">
              Simple and intuitive trading platform with an
              easy-to-understand user interface.
            </p>
          </div>

          <div className="mb-5">
            <h3>No spam or gimmicks</h3>
            <p className="text-muted">
              Committed to transparency — no gimmicks, spam,
              "gamification", or intrusive push notifications.
            </p>
          </div>

          <div>
            <h3>The Aurex universe</h3>
            <p className="text-muted">
              More than just an app — gain free access to the
              entire ecosystem of our partner products.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Benefits;