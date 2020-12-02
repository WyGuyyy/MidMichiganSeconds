import React from 'react';
import './Testimonial.css';
import Header from "../Header/Header"
import Popout from '../Popout/Popout';
import midmiclipped from '../Assets/midmiclipped.PNG';
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

        var backgroundImage = midmiclipped;

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
                        <div className="Testimonial-Content-1">
                            <div className="Testimonial-Content-TopWrapper-1">
                                <p className="Testimonial-Content-Text"></p>
                                <div className="Testimonial-Content-Image"></div>
                            </div>
                            <div className="Testimonial-Content-BottomWrapper-1">
                                <h1 className="Testimonial-Content-Name"></h1>
                                <h1 className="Testimonial-Content-Job"></h1>
                                <h1 className="Testimonial-Content-Company"></h1>
                            </div>
                        </div>

                        <div className="Testimonial-Content-2">
                            <div className="Testimonial-Content-TopWrapper-2">
                                <p className="Testimonial-Content-Text"></p>
                                <div className="Testimonial-Content-Image"></div>
                            </div>
                            <div className="Testimonial-Content-BottomWrapper-2">
                                <h1 className="Testimonial-Content-Name"></h1>
                                <h1 className="Testimonial-Content-Job"></h1>
                                <h1 className="Testimonial-Content-Company"></h1>
                            </div>
                        </div>

                        <div className="Testimonial-Content-3">
                            <div className="Testimonial-Content-TopWrapper-1">
                                <p className="Testimonial-Content-Text"></p>
                                <div className="Testimonial-Content-Image"></div>
                            </div>
                            <div className="Testimonial-Content-BottomWrapper-1">
                                <h1 className="Testimonial-Content-Name"></h1>
                                <h1 className="Testimonial-Content-Job"></h1>
                                <h1 className="Testimonial-Content-Company"></h1>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
            
    }
}

export default Testimonial;


//"react-router-dom": "^6.0.0-alpha.1",