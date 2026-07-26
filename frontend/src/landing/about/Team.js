import React from 'react';

function Team() {
    return ( 
        <div className='container'>

             <div className='row p-2 p-md-3 mt-3 mt-md-5 border-top text-muted' 
             style={{lineHeight:"1.8",fontSize:"1.2em"}}> 
                    <div className='col-12 col-md-6 p-2 p-md-3 text-center'>
                        <img src='media/images/aurex_logo.png' alt='ceo'
                         style={{borderRadius:"100%",width:"50%"}}/>
                         <h4 className='mt-3 mt-md-5'>Shreyash Motgi</h4>
                         <h6>Founder, CEO</h6>
                        </div>
                    <div className='col-12 col-md-6 p-2 p-md-3'>
                        <p>Aurex was created with one mission — to make investing simple, fast, and accessible for everyone. Whether you're placing your first trade or building a long-term portfolio, Aurex combines powerful tools with an intuitive experience.</p>
                        <p>Built using modern web technologies, Aurex provides real-time market tracking, advanced interactive charts, portfolio management, watchlists, and secure trading workflows in one seamless platform..</p>
                        <p>We believe investing shouldn't be complicated. It should be transparent, educational, and empowering.</p>
                        <p>Connect on <a href='/about'>Homepage</a> / <a href='/about'>TradingQnA</a> / <a href='/about'>Twitter</a></p>
                    </div>
            </div>
        </div>
     );
}

export default Team;