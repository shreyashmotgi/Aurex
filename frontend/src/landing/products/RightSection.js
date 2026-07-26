import React from 'react';

function RightSection({
  imageURl,
  productName,
  productDescription,
  tryDemo,
}) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-6 mt-3 mt-md-5 p-2 p-md-5">
          <h1>{productName}</h1>
          <p>{productDescription}</p>
          <div>
            <a href={tryDemo}>{tryDemo}  <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
          </div>
        </div>
        <div className="col-12 col-md-6 p-2 p-md-3 text-center text-md-start">
          <img src={imageURl} />
        </div>
      </div>
    </div>
  );
}

export default RightSection;