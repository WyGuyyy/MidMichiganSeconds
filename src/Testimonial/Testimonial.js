import React from 'react';
import './Testimonial.css';
import Header from "../Header/Header"
import Popout from '../Popout/Popout';
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

        return(
            <div className="testimonialContainer">
                <Popout hist={this.props.history}/>
                <section className="Testimonial-Top-Section" style={{height: this.state.topSectionHeight}}>
                    <div className="Testimonial-Header-Wrapper" style={{height: this.state.headerHeight}}>
                        <Header />
                    </div>
                </section>
                <section className="Testimonial-Content-Section" style={{height: this.state.middleSectionHeight}}>

                </section>
            </div>
        );
            
    }
}

export default Testimonial;


//"react-router-dom": "^6.0.0-alpha.1",