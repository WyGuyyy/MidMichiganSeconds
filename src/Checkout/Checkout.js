import React from 'react';
import ReactDOM from "react-dom"
import './Checkout.css';
import Header from "../Header/Header"
import Popout from '../Popout/Popout';
import { PayPalButton } from "react-paypal-button-v2";
import {getUsedSeconds} from '../Services/ContentService';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

class Checkout extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            times: []
        };

    }
    
    componentDidMount(){ 
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);

        document.addEventListener("keydown", this.onKeyDown, false);
        document.addEventListener("keyup", this.onKeyUp, false);
    }

    //Lifecycle event preparing Slideshow component to unmount from DOM
    componentWillUnmount(){

    }

    onKeyDown(e){
        if(e.key.localeCompare("Shift") == 0){
            this.setState({
                shift: true
            });
        }else if(e.key.localeCompare("Control") == 0){
            this.setState({
                ctrl: true
            });
        }
    }

    onKeyUp(e){
        if(e.key.localeCompare("Shift") == 0){
            this.setState({
                shift: false
            });
        }else if(e.key.localeCompare("Control") == 0){
            this.setState({
                ctrl: false
            });
        }
    }

    createOrder(data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: "0.01",
              },
            },
          ],
        });
      }
    
      onApprove(data, actions) {
          
        fetch()
          //Call backend here
      }

    render(){

        return(
            <div className="checkoutContainer">
                <Popout hist={this.props.history}/>
                <section className="Checkout-Top-Section" style={{height: this.state.topSectionHeight}}>
                    <div className="Checkout-Header-Wrapper" style={{height: this.state.headerHeight}}>
                        <Header />
                    </div>
                </section>
                <section className="Checkout-Content-Section" style={{height: this.state.middleSectionHeight}}>
                    
                <PayPalButton
                    options={{
                        clientId: "ARhqzB1bBjZ_gtoFaXgXNr_Q7wJvTQp6Z7TZn2Qe59C2djLpaICLBBJv7PJXxDU2tdO_AqMxyjh3FSuG",
                        disableFunding: "card"
                    }}
                    amount={0.1}
                    currency={'USD'}
                />
                </section>
            </div>
        );
            
    }
}

export default Checkout;


//"react-router-dom": "^6.0.0-alpha.1",