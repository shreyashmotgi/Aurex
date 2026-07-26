import React from 'react';

function Awards() {
    return ( 
        <div className='container mt-5 '>
            <div className='row'>
                 <div className='col-12 col-md-6 p-2 p-md-5'>
                 <img src='media/images/largestBroker.svg' alt='Award'/>
            </div>
            <div className='col-12 col-md-6'>
                <div className='row p-2 p-md-5 mt-2 mt-md-5'>
                     <h1>Largest stock broker in India </h1>
                     <p>2+ million Aurex clients contribute to over 15% of all retail order volumes in india daily by trading and investing in: </p>
                     <div className='col-12 col-sm-6'>
                        <ul>
                            <li>
                                <p>Futures and options</p>
                            </li>
                            <li>
                                <p>Commodity derivatives</p>
                            </li>
                            <li>
                                <p>Currency derivatives</p>
                            </li>
                        </ul>
                     </div>
                     <div className='col-12 col-sm-6'>
                        <ul>
                            <li>
                                <p>Stocks and IPOs</p>
                            </li>
                            <li>
                                <p>Direct mutual funds</p>
                            </li>
                            <li>
                                <p>Bonds and Govt.Securities</p>
                            </li>
                        </ul>
                     </div>
                     <img src='media/images/pressLogos.png'style={{width:"90%"}} className='mt-3'/>
                </div>
            </div>
            </div>
        </div>
     );
}

export default Awards;