import React from 'react';
import ReactDOM from 'react-dom';
import { PayPalButton } from "react-paypal-button-v2";

const paypal = require('paypal-rest-sdk');

class PaypalButton extends React.Component {
  
  render() {

    //const { amount, onSuccess, onCancel, paypalClick, currency } = this.props;
    const { amount, currency, onApprove } = this.props;

    const  card = "card";
    const credit = "Credit";

    return (
        <div >
            <PayPalButton
                amount={amount}
                currency={currency}
                onApprove={(data, actions) => onApprove(data, actions)}
                options={{
                  disableFunding: credit,
                  clientId: "AYLPU7smKqDi1Jgw27Xt8tKJxrB0CnteO7qH2P1gI3_E339dPWMmcBmZwmUZpvhuikyOcuOfTXcIQDmr" // Live Client ID
                  //clientId: "ARhqzB1bBjZ_gtoFaXgXNr_Q7wJvTQp6Z7TZn2Qe59C2djLpaICLBBJv7PJXxDU2tdO_AqMxyjh3FSuG" //Sandbox Client ID
                }}
            />
        </div>
    );

  }
}
export default PaypalButton;

//createOrder={(data, actions) => createOrder(data, actions)}
//                onClick={paypalClick}
//                onCancel={(data) => onCancel(data)}