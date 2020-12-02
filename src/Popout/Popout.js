import React, { Fragment } from 'react';
import ReactDom from 'react-dom';
import './Popout.css';
import { Link } from 'react-router-dom';

class Popout extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            history: this.props.hist
        };

    }
    
    //Lifecycle method for after Header component has mounted to the DOM
    componentDidMount(){ 
        
    }

    componentDidUpdate(){

    }

    //Lifecycle event preparing Header component to unmount from DOM
    componentWillUnmount(){
        
    }

    goToFAQ(event){
        this.state.history.push("/FAQ");
    }

    goToTestimonials(event){
        this.state.history.push("/Testimonial");
    }

    //Render the Header component to the DOM/Screen
    render(){

        return(

            <div className="popoutContainer">
                <div className="popoutWrapper">
                    <button className="popoutButton">REGISTER</button>
                    <button className="popoutButton" onClick={e => this.goToFAQ(e)}>FAQS</button>
                    <button className="popoutButton" onClick={e => this.goToTestimonials(e)}>TESTIMONIALS</button>
                    <button className="popoutButton">TERMS & CONDITIONS</button>
                </div>
            </div>
        );
            
    }
}

export default Popout;

//<Hamburger />
//
//"react-router-dom": "^6.0.0-alpha.1",