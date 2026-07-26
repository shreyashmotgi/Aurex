import React from 'react';
import Hero from "./Hero.js"
import InvestmentOptions from "./InvestmentOptions.js"
import Steps from "./Steps.js"
import Benefits from "./Benefits.js"
import AccountTypes from "./AccountTypes.js"
import OpenAccount from '../OpenAccount.js';


function SignUp() {
    return ( 
        <>
         <Hero />
         <InvestmentOptions/>
         <Steps />
         <Benefits />
         <AccountTypes/>
         <OpenAccount/>
        </>
     );
}

export default SignUp;