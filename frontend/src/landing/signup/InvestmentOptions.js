import React from "react";

function InvestmentOptions() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">
        Investment options with Aurex demat account
      </h1>

      <div className="row g-5">
        <div className="col-md-6">
          <div className="d-flex align-items-start">
            <img src="media/images/stocks-acop.svg" className="me-4" alt="stocksacop" />
            <div>
              <h3>Stocks</h3>
              <p>Invest in all exchange-listed securities</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="d-flex align-items-start">
            <img src="media/images/mf-acop.svg" className="me-4" alt="mfacop" />
            <div>
              <h3>Mutual funds</h3>
              <p>Invest in commission-free direct mutual funds</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="d-flex align-items-start">
            <img src="media/images/ipo-acop.svg" className="me-4" alt="ipoacop" />
            <div>
              <h3>IPO</h3>
              <p>Apply to the latest IPOs instantly via UPI</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-5">
          <div className="d-flex align-items-start">
            <img src="media/images/fo-acop.svg" className="me-4" alt="foacop" />
            <div>
              <h3>Futures & Options</h3>
              <p>
                Hedge and mitigate market risk through simplified F&O trading
              </p>
            </div>
          </div>
        </div>
        <button className='landing-btn p-2 fs-5 mb-5'style={{width:"20%",margin:"0 auto"}}>Explore Investments</button>
      </div>
    </div>
  );
}

export default InvestmentOptions;
