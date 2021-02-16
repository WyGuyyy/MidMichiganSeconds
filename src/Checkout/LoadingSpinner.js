import React from 'react';
import ReactDOM from "react-dom"
import './LoadingSpinner.css';
import Header from "../Header/Header"
import Popout from '../Popout/Popout';
import Timeline from '../Timeline/Timeline';
import AlertModal from '../AlertModal/AlertModal';
import { PayPalButton } from "react-paypal-button-v2";
import {processOrder} from '../Services/OrderService';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

class LoadingSpinner extends React.Component{
    constructor(props){
        super(props);

        this.state = {

        };

    }
    
    componentDidMount(){ 

    }

    //Lifecycle event preparing Slideshow component to unmount from DOM
    componentWillUnmount(){
        
    }


    render(){

        return(
            <div className="loaderBackground">
                <div className="loader">
                    
                </div>
            </div>
        );
            
    }
}

export default LoadingSpinner;


//"react-router-dom": "^6.0.0-alpha.1",