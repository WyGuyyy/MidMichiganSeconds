import React from 'react';
//import './Home.css';
import './checkout.css';
import Timeline from './timeline';
import TransparentMenu from './transparentMenu';
import HamburgerMenu from './hamburger';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import PayPalButton from '../PaypalButton/PaypalButton';

//const paypal = require('paypal-rest-sdk');

/*paypal.configure({
    'mode': 'sandbox',
    'client_id': 'ARhqzB1bBjZ_gtoFaXgXNr_Q7wJvTQp6Z7TZn2Qe59C2djLpaICLBBJv7PJXxDU2tdO_AqMxyjh3FSuG',
    'client_secret': 'ECH6zPLe8tLnbjkVYx-zqPcpagU6tzN1fPzNrmTt2TCOW1DvMX752lmI2Fksdz6LTej8cADXNqsaOl3Z'
});*/

//let PayPalButton = paypal.Buttons.driver('react', {React, ReactDOM});

/*const CLIENT = {
    sandbox: 'ARhqzB1bBjZ_gtoFaXgXNr_Q7wJvTQp6Z7TZn2Qe59C2djLpaICLBBJv7PJXxDU2tdO_AqMxyjh3FSuG'
}

const ENV = process.env.NODE_ENV === 'production'
    ? 'production'
    : 'sandbox';*/

class Checkout extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            times: (props.location.state != undefined ? props.location.state.times : []),
            inputflag: "",
            selectedFiles: (props.location.state != undefined ? props.location.state.selectedFiles : []),
            url: (props.location.state != undefined ? props.location.state.url : []),
            token: (props.location.state != undefined ? props.location.state.token : "")
        };

        console.log(this.state.token);

        this.backStackCheckTime();
        console.log(this.state.selectedFiles);
    
    }
    
    componentDidMount(){
        var secCost = Object.keys(this.state.times).length;
        var procCost = (Object.keys(this.state.times).length * 0.10).toFixed(2);
        var  totalCost = (secCost + (+procCost)).toFixed(2);

        var costHeader = document.getElementById("paypal-cost-header-checkout");
        costHeader.innerHTML = "Receipt:<br/> Selected Seconds: $" + secCost + "<br/>  Processing Fee:   $" + procCost + "<br/>Total Cost: $" + totalCost;
    }

    componentWillUnmount(){
        
    }

    componentDidUpdate(){
        this.backStackCheckTime();
    }

    async backStackCheckTime(){

        if(this.props.location.state == undefined){
            this.props.history.replace("/picktime");
        }

        var content;
        var count;
        var newAMPM;
        var newHour;
        var newMinute;
        var newSecond;

        var token = this.state.token;

        for(count=0; count < Object.keys(this.state.selectedFiles).length; count++){
 
             newAMPM = this.state.times[count].split(":")[2].split(" ")[1];
             newHour = this.state.times[count].split(":")[0];
             newMinute = this.state.times[count].split(":")[1];
             newSecond = this.state.times[count].split(":")[2].split(" ")[0];
 
             //await fetch("https://localhost:8443/api/content/" + newAMPM + "/" + newHour + "/" + newMinute + "/" + newSecond, { 
                await fetch("http://192.168.1.10:8080/api/content/" + newAMPM + "/" + newHour + "/" + newMinute + "/" + newSecond, { 
                 method: "GET",                          
                 headers: {"Content-Type": "application/json",
                           "Authorization": "Bearer " + token}
                 }).then(res => res.json())
                 .then(data => {
                     content = data;
                 })
                 .catch(console.log);

         }

         if(content){
             this.props.history.replace("/picktime");
        }
    }

    closeNav(){
        document.getElementById("mySidenav").style.width = "0";
    }

    testApprove = async (data, action) => { //START HERE NEXT TIME.. FIGURE OUT HOW TO CANCEL PAYMENT OR OFFER REFUND
        /** Here you can call your backend API
          endpoint and update the database */
          console.log(data, action);
    }

     paymentHandler = async (details, data) => {
        /** Here you can call your backend API
          endpoint and update the database */
          console.log(details, data);

        var count = 0;

        var newAMPM;
        var newHour;
        var newMinute;
        var newSecond;

        var token = this.state.token;

        for(count=0; count < Object.keys(this.state.selectedFiles).length; count++){

           // const contentData = new FormData();
            const fileData = new FormData();

            console.log(JSON.stringify({email: details.payer.email_address}));

           // await fetch("https://localhost:8443/api/customer", { 
            await fetch("http://192.168.1.10:8080/api/customer", { 
                method: "POST",                          
                headers: {"Content-Type": "application/json",
                          "Authorization": "Bearer " + token},
                body: JSON.stringify({email: details.payer.email_address})
                }).catch(console.log);

            var contentID;

            newAMPM = this.state.times[count].split(":")[2].split(" ")[1];
            newHour = this.state.times[count].split(":")[0];
            newMinute = this.state.times[count].split(":")[1];
            newSecond = this.state.times[count].split(":")[2].split(" ")[0];

           // await fetch("https://localhost:8443/api/content", { 
            await fetch("http://192.168.1.10:8080/api/content", { 
                method: "POST",                          
                headers: {"Content-Type": "application/json",
                          "Authorization": "Bearer " + token},
                body: JSON.stringify({email: details.payer.email_address, url: this.state.url[count], am_pm: newAMPM, hour: newHour, minute: newMinute, second: newSecond})
                }).then(res => res.json())
                .then(data => {
                    contentID = data;
                })
                .catch(console.log);

           fileData.append("files", this.state.selectedFiles[count]);

                console.log(contentID);

          //await fetch("https://localhost:8443/api/file/" + contentID , { 
            await fetch("http://192.168.1.10:8080/api/file/" + contentID , { 
                method: "POST",                          
                body: fileData
                }).catch(console.log);
        }
        
        this.props.history.replace({
            pathname: "/SuccessPage",
            state: {processed: true}
        });
        //instead of replacing history, just add checks that seconds have not already been purchased!!!!!!!!!

      }

      //reserveTime()

     /* async reserveTime(){
        var i;

        for(i = 0; i < this.state.times.length; i++){

            var ampm = this.state.times[i].split(" ")[1];
            var splitArr = this.state.times[i].split(":");

            var hour = splitArr[0];
            var minute = splitArr[1];
            var second = splitArr[2].split(" ")[0];

            console.log(hour + "|" + minute + "|" + second + ampm);

            /*await fetch("http://192.168.1.10:8080/api/customer", { 
                method: "POST",                          
                headers: {"Content-Type": "application/json",
                        "Authorization": "Bearer " + token},
                body: JSON.stringify({email: details.payer.email_address})
                }).catch(console.log);*/

        /*}


            console.log("im here");

      }

      cancelTime = async (data) => {
        var token = this.state.token;
        var contentID;

        await fetch("http://192.168.1.10:8080/api/content", { 
                method: "POST",                          
                headers: {"Content-Type": "application/json",
                          "Authorization": "Bearer " + token},
                body: JSON.stringify({email: "test_email@test.com", url: "www.test.com", am_pm: "AM", hour: "01", minute: "01", second: "01"})
                }).then(res => res.json())
                .then(data => {
                    contentID = data;
                })
                .catch(console.log);
      }*/

    render(){

        /*const paypal = require('paypal-rest-sdk');
        paypal.configure()*/

        var totalCost = (Object.keys(this.state.times).length) + (Object.keys(this.state.times).length * 0.10) 

        const onSuccess = (payment) =>
            console.log('Successful payment!', payment);
        const onError = (error) =>
            console.log('Erroneous payment OR failed to load script!', error);
        const onCancel = (data) =>
            console.log('Cancelled payment!', data);

        var flag = '3';

        return(

            <Fragment>

                <div id="mySidenav" className="sidenav">
                        <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                        <Link to="/">
                            <a href="#">Home</a>
                       </Link>
                       <Link to="/about">
                            <a href="#">About</a>
                        </Link>
                        <Link to="/contact">
                            <a href="#">Contact</a>
                        </Link>
                        <Link to="/terms">
                            <a href="#">Terms and Conditions</a>
                        </Link>
                </div>

                <div id="wrapper-checkout-main">

                    <div id="top-container-checkout">

                        <HamburgerMenu flag="P" wrapperID="wrapper-checkout" />

                        <div id="title-root-checkout">
                            <h1 id="main-title-checkout">MIDMICHIGAN SECONDS</h1> 
                        </div>

                        <div id="logo-root-checkout">
                            <header id="logo-checkout"></header>
                        </div>

                    </div>

                    <TransparentMenu />

                    <Timeline flag={flag} />


                    <div id="wrapper-checkout">
                            <h1 id="paypal-cost-header-checkout">Total Cost:</h1>
                            <p id="paypal-cost-text-checkout">(All transactions are handled via PayPal checkout)</p>
                            <PayPalButton
                                amount={totalCost}
                                currency={'USD'}
                                onSuccess={this.paymentHandler}
                            />
                            <Link to={{pathname: "/upload", state: {times: this.state.times}}}>
                                <button id="back-button-checkout">Back</button>
                            </Link>
                    </div>

                    

                </div>

            </Fragment>

        );
    }
}

export default Checkout;


//"react-router-dom": "^6.0.0-alpha.1",
//onSuccess={this.paymentHandler}
//createOrder={this.reserveTime}
//paypalClick={this.reserveTime.bind(this)}
//onCancel={this.cancelTime}