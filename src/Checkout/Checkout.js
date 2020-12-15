import React from 'react';
import ReactDOM from "react-dom"
import './Checkout.css';
import Header from "../Header/Header"
import Popout from '../Popout/Popout';
import Timeline from '../Timeline/Timeline';
import { PayPalButton } from "react-paypal-button-v2";
import {getUsedSeconds} from '../Services/ContentService';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

class Checkout extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            times: props.history.location.state.times,
            url: props.history.location.state.url,
            files: props.history.location.state.selectedFiles,

        };

    }
    
    componentDidMount(){ 
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);

        document.addEventListener("keydown", this.onKeyDown, false);
        document.addEventListener("keyup", this.onKeyUp, false);

        this.fillItems();
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

      fillItems(){

        var times = this.state.times;
        var total = times.length;
        var count = 0;

        var receipt = document.getElementsByClassName("Checkout-Receipt-Box")[0];
        var totalLabel = document.getElementsByClassName("Checkout-Receipt-Total")[0];

        for(count = 0; count < times.length; count++){
            var parentDiv = document.createElement("div");

            var timeDiv = document.createElement("div");
            var amountDiv = document.createElement("div");

            var timeTitle = document.createElement("h2");
            var amountTitle = document.createElement("h2");

            parentDiv.classList.add("Checkout-Receipt-Item");

            timeDiv.classList.add("Checkout-Receipt-Time-Wrapper");
            amountDiv.classList.add("Checkout-Receipt-Amount-Wrapper");

            timeTitle.classList.add("Checkout-Receipt-Time");
            amountTitle.classList.add("Checkout-Receipt-Amount");

            timeTitle.textContent = times[count];
            amountTitle.textContent = "$1.00"

            timeDiv.appendChild(timeTitle);
            amountDiv.appendChild(amountTitle);

            parentDiv.appendChild(timeDiv);
            parentDiv.appendChild(amountDiv);

            receipt.appendChild(parentDiv);
        }

        var parentDiv = document.createElement("div");

        var timeDiv = document.createElement("div");
        var amountDiv = document.createElement("div");

        var timeTitle = document.createElement("h2");
        var amountTitle = document.createElement("h2");

        parentDiv.classList.add("Checkout-Receipt-Item");

        timeDiv.classList.add("Checkout-Receipt-Time-Wrapper");
        amountDiv.classList.add("Checkout-Receipt-Amount-Wrapper");

        timeTitle.classList.add("Checkout-Receipt-Time");
        amountTitle.classList.add("Checkout-Receipt-Amount");

        timeTitle.textContent = "Transaction Fee";
        amountTitle.textContent = "$" + (times.length * .1).toFixed(2);

        timeDiv.appendChild(timeTitle);
        amountDiv.appendChild(amountTitle);

        parentDiv.appendChild(timeDiv);
        parentDiv.appendChild(amountDiv);

        receipt.appendChild(parentDiv);

        totalLabel.textContent = "TOTAL: $" + (total + (total * .1)).toFixed(2);

      }

      onApprove = async (data, actions) => {
        
        var success = await fetch("http://localhost:8080/api/order/capture", {  
            method: "POST",                          
            headers: {"Content-Type": "application/json"},
            body: {token: data.facilitatorAccessToken, orderID: data.orderID, payerID: data.payerID}
            }).catch(console.log);

        /*f(success === 1){
            await fetch("http://192.168.1.10:8080/api/file/" + contentID , { 
                method: "POST",                          
                body: fileData
                }).catch(console.log);
            }
        }*/
      }

      goToUpload(event){
          this.props.history.goBack();
      }

    render(){

        var totalCost = this.state.times.length + (this.state.times.length * .1);

        return(
            <div className="checkoutContainer">
                <Popout hist={this.props.history}/>
                <section className="Checkout-Top-Section" style={{height: this.state.topSectionHeight}}>
                    <div className="Checkout-Header-Wrapper" style={{height: this.state.headerHeight}}>
                        <Header />
                    </div>
                </section>
                <div className="Picktime-Timeline-Wrapper">
                    <Timeline flag="3"/>
                </div>
                <section className="Checkout-Content-Section" style={{height: this.state.middleSectionHeight}}>
                    
                    <div className="Checkout-Receipt-Wrapper">
                        <div className="Checkout-Receipt-Box">

                        </div>
                        <div className="Checkout-Receipt-Total-Wrapper">
                            <h2 className="Checkout-Receipt-Total"></h2>
                        </div>
                    </div>

                    <div className="Checkout-Paypal-Button">
                        <PayPalButton 
                            amount={totalCost}
                            currency={'USD'}
                            onApprove={this.onApprove}
                        />
                    </div>

                    <button className="Checkout-Back-Button" onClick={e => this.goToUpload(e)}>Back</button>
                </section>
            </div>
        );
            
    }
}

export default Checkout;


//"react-router-dom": "^6.0.0-alpha.1",