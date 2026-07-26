import React from "react";

function AccountTypes() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">
        Explore different account types
      </h1>

      <div className="row g-5">

        {/* Individual Account */}
        <div className="col-md-4">
          <div className="border rounded p-4 h-100 d-flex">
            <img
              src="media/images/acop-individual.svg"
              alt="Individual"
              className="me-3"
              width="40"
              height="40"
            />

            <div>
              <h4>Individual Account</h4>
              <p className="text-muted mt-3">
                Invest in equity, mutual funds and derivatives
              </p>
            </div>
          </div>
        </div>

        {/* HUF Account */}
        <div className="col-md-4">
          <div className="border rounded p-4 h-100 d-flex">
            <img
              src="media/images/acop-huf.svg"
              alt="HUF"
              className="me-3"
              width="40"
              height="40"
            />

            <div>
              <h4>HUF Account</h4>
              <p className="text-muted mt-3">
                Make tax-efficient investments for your family
              </p>
            </div>
          </div>
        </div>

        {/* NRI Account */}
        <div className="col-md-4">
          <div className="border rounded p-4 h-100 d-flex">
            <img
              src="media/images/acop-nri.svg"
              alt="NRI"
              className="me-3"
              width="40"
              height="40"
            />

            <div>
              <h4>NRI Account</h4>
              <p className="text-muted mt-3">
                Invest in equity, mutual funds, debentures, and more
              </p>
            </div>
          </div>
        </div>

        {/* Minor Account */}
        <div className="col-md-4">
          <div className="border rounded p-4 h-100 d-flex">
            <img
              src="media/images/acop-minor.svg"
              alt="Minor"
              className="me-3"
              width="40"
              height="40"
            />

            <div>
              <h4>Minor Account</h4>
              <p className="text-muted mt-3">
                Teach your little ones about money & invest for their future
                with them
              </p>
            </div>
          </div>
        </div>

        {/* Corporate */}
        <div className="col-md-4">
          <div className="border rounded p-4 h-100 d-flex">
            <img
              src="media/images/acop-corporate.svg"
              alt="Corporate"
              className="me-3"
              width="40"
              height="40"
            />

            <div>
              <h4>Corporate / LLP / Partnership</h4>
              <p className="text-muted mt-3">
                Manage your business surplus and investments easily
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AccountTypes;