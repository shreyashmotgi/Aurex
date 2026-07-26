import React from "react";

function Hero() {
  return (
    <div className="container">

      <div className="row p-3 p-md-5 mt-3 mt-md-5 mb-3 mb-md-5">
        <h1 className="fs-2 text-center">
          Empowering every investor with technology.
          <br />
          Building the future of smart investing.
        </h1>
      </div>

      <div
        className="row p-2 p-md-5 mt-3 mt-md-5 border-top text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.15em" }}
      >

        <div className="col-12 col-md-6 p-2 p-md-5">

          <p>
            Aurex was built with a simple vision—to make investing accessible,
            intuitive, and transparent for everyone. We believe powerful
            financial tools shouldn't be limited to professionals; they should
            be available to every investor.
          </p>

          <p>
            Combining modern technology with a seamless user experience, Aurex
            brings together real-time market data, advanced charting,
            portfolio management, and intelligent investment tools into one
            unified platform.
          </p>

          <p>
            Every feature is designed with speed, simplicity, and reliability
            in mind, helping users focus on making informed investment
            decisions instead of navigating complex software.
          </p>

        </div>

        <div className="col-12 col-md-6 p-2 p-md-5">

          <p>
            Beyond trading, Aurex aims to create a community where learning and
            investing go hand in hand. Educational resources, market insights,
            and intuitive analytics are built into the platform to help users
            grow with confidence.
          </p>

          <p>
            As financial markets continue to evolve, Aurex is committed to
            delivering innovative products that simplify investing while
            maintaining security, performance, and transparency at every step.
          </p>

          <p>
            Whether you're investing for the first time or managing an
            experienced portfolio, Aurex is built to support your journey—
            helping you <strong>Trade Smarter. Rise Higher.</strong>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Hero;