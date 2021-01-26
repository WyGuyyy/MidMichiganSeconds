import React from 'react';
import './Testimonial.css';
import Header from "../Header/Header"
import Popout from '../Popout/Popout';
import TestimonialShowcaseBox from './TestimonialShowcaseBox';
/*import midmiclipped from '../Assets/midmiclipped.PNG';*/
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

class Testimonial extends React.Component{
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

        var backgroundImage = process.env.PUBLIC_URL + "/assets/midmiclipped.PNG";

        var testimonial1 = "\"I've lived in Saginaw for almost 20 years because of the incredible people in that region - including Jason and Wyatt. These guys are driven, always striving to help others and I am so excited and proud that they are creating a site to showcase the amazing state of Michigan. I highly recommend them and Mid-Michigan Seconds!\"";
        var testimonial2 = "\"My fiancé and I love exploring mid-Michigan, and are always looking for new places to go. This platform gives us the opportunity to share our experiences with others who also like to explore!\"";

        var sig1 = "-Kaitlyn Cole ~ Kaitlyn's Creations";
        var sig2 = "-Shelby Pitt ~ Hartwick Pines";

        return(
            <div className="testimonialContainer">
                <Popout hist={this.props.history}/>
                <section className="Testimonial-Top-Section" style={{height: this.state.topSectionHeight}}>
                    <div className="Testimonial-Header-Wrapper" style={{height: this.state.headerHeight}}>
                        <Header />
                    </div>
                </section>
                <section className="Testimonial-Content-Section" style={{height: this.state.middleSectionHeight}}>
                    <div className="Testimonial-Content-Header">
                        <div className="Testimonial-Content-Header-Image" style={{backgroundImage: "url(" + backgroundImage + ")"}}> 
                            <div className="Testimonial-Content-Header-Tile">
                                <h2 className="Testimonial-Content-Header-Title">Testimonials</h2>
                            </div>
                        </div>
                    </div>
                    <div className="Testimonial-Content-Wrapper">
                        <TestimonialShowcaseBox text={testimonial1} signature={sig1}/>
                        <TestimonialShowcaseBox text={testimonial2} signature={sig2}/>
                    </div>
                </section>
            </div>
        );
            
    }
}

export default Testimonial;


//"react-router-dom": "^6.0.0-alpha.1",