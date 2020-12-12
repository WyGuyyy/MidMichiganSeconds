import React from 'react';
import ReactDOM from "react-dom"
import './Upload.css';
import Header from "../Header/Header"
import Popout from '../Popout/Popout';
import {getUsedSeconds} from '../Services/ContentService';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

class Upload extends React.Component{
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

    /*createOrder(data, actions) {
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
      }*/

    goToCheckout(){
        this.props.history.push({
            pathname: "/Checkout",
            state: {}
        });
    }

    render(){

        return(
            <div className="uploadContainer">
                <Popout hist={this.props.history}/>
                <section className="Upload-Top-Section" style={{height: this.state.topSectionHeight}}>
                    <div className="Upload-Header-Wrapper" style={{height: this.state.headerHeight}}>
                        <Header />
                    </div>
                </section>
                <section className="Upload-Content-Section" style={{height: this.state.middleSectionHeight}}>
                    
                    <div className="Upload-Selected-Wrapper">

                    </div>

                    <button className="Upload-Checkout-Button" onClick={e => this.goToCheckout(e)}>Checkout</button>
                    
                </section>
            </div>
        );
            
    }
}

export default Upload;


//"react-router-dom": "^6.0.0-alpha.1",