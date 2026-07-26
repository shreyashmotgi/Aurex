import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container py-5">

      <div className="row text-center align-items-center">

        {/* Hero Image */}

        <div className="col-12">
          <img
            src="media/images/homeHero.png"
            alt="Aurex Trading Platform"
            className="img-fluid mb-5"
            style={{ maxWidth: "100%" }}
          />
        </div>

        {/* Small Badge */}

        <div className="col-12">
          <span
            className="badge px-3 py-2 mb-3"
            style={{
              backgroundColor: "#FFF7E0",
              color: "#D4AF37",
              border: "1px solid #D4AF37",
              fontSize: "14px",
              letterSpacing: "0.5px",
            }}
          >
            NEXT-GENERATION TRADING PLATFORM
          </span>
        </div>

        {/* Heading */}

        <div className="col-12">
          <h1
            className="fw-bold"
            style={{
              fontSize: "3rem",
              color: "#0B1220",
            }}
          >
            Trade Smarter.
            <br />
            Rise Higher.
          </h1>
        </div>

        {/* Sub Heading */}

        <div className="col-lg-8 mx-auto mt-3">
          <p
            className="fs-5"
            style={{
              color: "#6c757d",
              lineHeight: "1.8",
            }}
          >
            Experience lightning-fast trading, advanced charting,
            real-time market insights, and effortless portfolio
            management—all designed to help your investments rise
            with confidence.
          </p>
        </div>

        {/* Buttons */}

        <div className="col-12 mt-4">

          <Link
            to="/signup"
            className="landing-btn me-3 px-4 py-2"
            style={{
              backgroundColor: "#D4AF37",
              color: "#0B1220",
              fontWeight: "600",
              borderRadius: "8px",
            }}
          >
            Get Started
          </Link>

          

        </div>

      </div>

    </div>
  );
}

export default Hero;