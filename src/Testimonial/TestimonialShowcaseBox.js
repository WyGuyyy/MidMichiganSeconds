import React from 'react';
import './TestimonialShowcaseBox.css';
import Header from "../Header/Header"
import Popout from '../Popout/Popout';
import thumb1 from '../assets/thumbnail1.jpg';
import thumb2 from '../assets/thumbnail2.jpg';
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
        
        var tImages = [thumb1, thumb2];

        return(
            <div className="TestimonialShowcaseBox-Content-Wrapper">
                <div className="TestimonialShowcaseBox-Content">
                    <div className="TestimonialShowcaseBox-Content-Text-Wrapper">
                        <h2 className="TestimonialShowcaseBox-Content-Text">{this.props.text}</h2>
                    </div>
                    <div className="TestimonialShowcaseBox-Content-Signature-Wrapper">
                        <div className="TestimonialShowcaseBox-Content-SignatureText-Wrapper">
                            <p className="TestimonialShowcaseBox-Content-Signature">{this.props.signature}</p>
                        </div>
                        <div className="TestimonialShowcaseBox-Content-SignatureImage-Wrapper">
                            <img src={tImages[this.props.imageIndex]} alt="Avatar" className="TestimonialShowcaseBox-Signature-Image"></img>
                        </div>
                    </div>
                </div>
            </div>
        );
            
    }
}

export default TestimonialShowcaseBox;


//"react-router-dom": "^6.0.0-alpha.1",