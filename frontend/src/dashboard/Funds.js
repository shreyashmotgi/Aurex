import React, { useEffect, useState } from "react";


import { getFunds } from "../api/fundsApi";

const Funds = () => {
  const [funds, setFunds] = useState(null);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const data = await getFunds();
        setFunds(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFunds();
  }, []);

  if (!funds) {
    return <h4 style={{ padding: "30px" }}>Loading...</h4>;
  }

  return (
    <>
      {/* <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI</p>

        <Link className="btn btn-green">
          Add funds
        </Link>

        <Link className="btn btn-blue">
          Withdraw
        </Link>
      </div> */}

      <div className="row">
        <div className="dashboard-col">

          <span>
            <p>Equity</p>
          </span>

          <div className="table">

            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">
                ₹{funds.availableMargin.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>Used margin</p>
              <p className="imp">
                ₹{funds.usedMargin.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>Available cash</p>
              <p className="imp">
                ₹{funds.availableBalance.toFixed(2)}
              </p>
            </div>

            <hr />

            <div className="data">
              <p>Opening Balance</p>
              <p>
                ₹{funds.openingBalance.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>Payin</p>
              <p>
                ₹{funds.payin.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>Payout</p>
              <p>
                ₹{funds.payout.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>SPAN</p>
              <p>
                ₹{funds.span.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>Delivery margin</p>
              <p>
                ₹{funds.deliveryMargin.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>Exposure</p>
              <p>
                ₹{funds.exposure.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>Options premium</p>
              <p>
                ₹{funds.optionPremium.toFixed(2)}
              </p>
            </div>

            <hr />

            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>
                ₹{funds.collateralLiquid.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>Collateral (Equity)</p>
              <p>
                ₹{funds.collateralEquity.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>Total Collateral</p>
              <p>
                ₹{funds.totalCollateral.toFixed(2)}
              </p>
            </div>

          </div>
        </div>

        {/* <div className="dashboard-col">
          <div className="commodity">
            <p>You don't have a commodity account</p>

            <Link className="btn btn-blue">
              Open Account
            </Link>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Funds;
