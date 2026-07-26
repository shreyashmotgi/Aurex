import React from "react";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div className="p-3 p-md-5" id="supportWrapper">
        <h4>Support Portal</h4>
        <a href="">Track Tickets</a>
      </div>
      <div className="row p-2 p-md-5 m-0 m-md-3">
        <div className="col-12 col-md-6 p-2 p-md-5">
          <h1>
            Search for an answer or browser helps topics to create a ticket
          </h1>
          <input placeholder="Eg. how do I activate F&O" /><br></br>
          <a href="">Track Account Opening</a>
          <a href="">Track segment activation</a>
          <a href="">Intraday margins</a>
          <a href="">Kite user manual</a>
        </div>
        <div className="col-12 col-md-6 p-2 p-md-5">
            <h1>Featured </h1>
            <ol>
                <li><a href="">Current Takeovers and Delisting - January 2024</a></li>
                <li><a href="">Latest Intraday leverages MIS & CO</a></li>
            </ol>            
        </div>
      </div>
    </section>
  );
}

export default Hero;