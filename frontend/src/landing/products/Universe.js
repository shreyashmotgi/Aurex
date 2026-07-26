import React from "react";
import { Link } from "react-router-dom";

function Universe() {
  return (
    <div className="container">
      <div className="row text-center mt-5">
        <h1>The Aurex Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
        <div className="col-12 col-sm-6 col-md-4 p-3 mt-5 mb-5">
          <img
            src="media/images/zerodhaFundhouse.png"
            style={{ width: "50%" }}
          />
          <p className="text-small text-muted mt-3">
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals.
          </p>
        </div>
        <div className="col-12 col-sm-6 col-md-4 p-3 mt-5 mb-5">
          <img src="media/images/sensibullLogo.svg" style={{ width: "50%" }} />
          <p className="text-small text-muted mt-3">
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open interest, FII/DII, and
            more.
          </p>
        </div>
        <div className="col-12 col-sm-6 col-md-4 p-3 mt-5">
          <img src="media/images/tijori.svg" style={{ width: "40%" }} />
          <p className="text-small text-muted mt-3">
            Investment research platform that offers detailed insights on
            stocks, sectors, supply chains, and more.
          </p>
        </div>
        <div className="col-12 col-sm-6 col-md-4 p-3 mt-5">
          <img src="media/images/streakLogo.png" style={{ width: "50%" }} />
          <p className="text-small text-muted mt-3">
            Systematic trading platform that allows you to create and backtest
            strategies without coding.
          </p>
        </div>
        <div className="col-12 col-sm-6 col-md-4 p-3 mt-5">
          <img src="media/images/smallcaseLogo.png" />
          <p className="text-small text-muted mt-3">
            Thematic investing platform that helps you invest in diversified
            baskets of stocks on ETFs.
          </p>
        </div>
        <div className="col-12 col-sm-6 col-md-4 p-3 mt-5">
          <img src="media/images/dittoLogo.png" style={{ width: "50%" }} />
          <p className="text-small text-muted mt-3">
            Personalized advice on life and health insurance. No spam and no
            mis-selling.
          </p>
        </div>
        <Link
          to="/signup"
          className="landing-btn p-2 fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Sign up for free
        </Link>
      </div>
    </div>
  );
}

export default Universe;