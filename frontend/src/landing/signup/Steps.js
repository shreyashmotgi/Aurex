import React from "react";

function Steps() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">
        Steps to open a demat account with Aurex
      </h1>

      <div className="row align-items-center">

        {/* Left Side */}
        <div className="col-md-6 text-center">
          <img
            src="media/images/steps-acop.svg"
            alt="Steps"
            className="img-fluid"
          />
        </div>

        {/* Right Side */}
        <div className="col-md-6">

          <div className="d-flex align-items-center border-bottom pb-3 mb-4">
            <h2 className="me-4 text-secondary">01</h2>
            <h2>Enter the requested details</h2>
          </div>

          <div className="d-flex align-items-center border-bottom pb-3 mb-4">
            <h2 className="me-4 text-secondary">02</h2>
            <h2>Complete e-sign & verification</h2>
          </div>

          <div className="d-flex align-items-center">
            <h2 className="me-4 text-secondary">03</h2>
            <h2>Start investing!</h2>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Steps;