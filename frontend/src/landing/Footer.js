import React from "react";

function Footer() {
  return (
    <footer style={{ backgroundColor: "#0B1220", color: "#ffff" }}>
      <div className="container border-top mt-5">
        <div className="row mt-5">
          <div className="col">
            <img
              src="media/images/aurex.png"
              alt="logo"
              style={{ width: "50%" }}
            />
            <p className="mt-3">
              Aurex is a modern trading and investment platform built to
              simplify investing through powerful technology, intuitive design,
              and real-time market insights.
            </p>

            <p>© 2026 Aurex Technologies Pvt Ltd. All rights reserved.</p>
          </div>
          <div className="col">
            <p>Account</p>
            <a href="/">NRI demat account</a>
            <br />
            <a href="/">Minor demat account</a>
            <br />
            <a href="/">Open demat account</a>
            <br />
            <a href="/">HUF demat account</a>
            <br />
            <a href="/">Commodity</a>
            <br />
            <a href="/">Dematerialisation</a>
            <br />
            <a href="/">Fund transfer</a>
            <br />
            <a href="/">MTF</a>
          </div>
          <div className="col">
            <p>Support</p>
            <a href="/">Contact us</a>
            <br />
            <a href="/">Support portal</a>
            <br />
            <a href="/">How to file a complaint?</a>
            <br />
            <a href="/">Status of your complaints</a>
            <br />
            <a href="/">Bulletin</a>
            <br />
            <a href="/">Circular</a>
            <br />
            <a href="/">Z-Connect blog</a>
            <br />
            <a href="/">Downloads</a>
          </div>
          <div className="col">
            <p>Company</p>
            <a href="/">About</a>
            <br />
            <a href="/">Philosophy</a>
            <br />
            <a href="/">Press & media</a>
            <br />
            <a href="/">Careers</a>
            <br />
            <a href="/">Aurex Cares (CSR)</a>
            <br />
            <a href="/">Aurex.tech</a>
            <br />
            <a href="/">Open source</a>
            <br />
            <a href="/">Referral program</a>
          </div>
          <div className="col">
            <p>Quick Links</p>
            <a href="/">Upcoming IPOs</a>
            <br />
            <a href="/">Brokerage charges</a>
            <br />
            <a href="/">Market holidays</a>
            <br />
            <a href="/">Economic calendar</a>
            <br />
            <a href="/">Calculators</a>
            <br />
            <a href="/">Markets</a>
            <br />
            <a href="/">Sectors</a>
            <br />
            <a href="/">Gift Nifty</a>
          </div>
        </div>
        <div className="mt-5" style={{ fontSize: "14px" }}>
          {/* <p>
            Investments in securities are subject to market risks. Please read
            all relevant documents carefully before investing.
          </p>
          <p>
            Aurex provides trading tools, portfolio analytics, and educational
            resources to help investors make informed decisions. We do not
            guarantee profits or provide personalized financial advice.
          </p>
          <p>
            Market prices, charts, and financial information may be delayed
            depending on the exchange and data provider.
          </p> */}
          <p>
            This platform is built for educational and portfolio purposes. It is
            inspired by modern brokerage platforms and does not execute real
            financial transactions.
          </p>
          <p>For support, contact us at support@aurex.com</p>{" "}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
