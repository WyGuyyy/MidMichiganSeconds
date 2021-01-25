import React from 'react';
import './TestimonialShowcaseBox.css';
import Header from "../Header/Header"
import Popout from '../Popout/Popout';
/*import midmiclipped from '../Assets/midmiclipped.PNG';*/
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

class TestimonialShowcaseBox extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            text: props.text,
            signature: props.signature
        };

    }
    
    componentDidMount(){ 

    }

    //Lifecycle event preparing Slideshow component to unmount from DOM
    componentWillUnmount(){

    }
    
    render(){

        return(
            <div className="TestimonialShowcaseBox-Content-Wrapper">
                <div className="TestimonialShowcaseBox-Content">
                    <div className="TestimonialShowcaseBox-Content-Text-Wrapper">
                        <h2 className="TestimonialShowcaseBox-Content-Text">{this.props.text}</h2>
                    </div>
                    <div className="TestimonialShowcaseBox-Content-Signature-Wrapper">
                        <p className="TestimonialShowcaseBox-Content-Signature">{this.props.signature}</p>
                    </div>
                </div>
            </div>
        );
            
    }
}

export default TestimonialShowcaseBox;


//"react-router-dom": "^6.0.0-alpha.1",