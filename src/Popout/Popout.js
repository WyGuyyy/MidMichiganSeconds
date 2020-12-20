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

    goToHome(event){
        this.state.history.push("/");
    }

    goToPicktime(event){
        this.state.history.push("/Picktime");
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
                    <button className="popoutButton" onClick={e => this.goToHome(e)}>HOME</button>
                    <button className="popoutButton" onClick={e => this.goToPicktime(e)}>PURCHASE SECONDS</button>
                    <button className="popoutButton" onClick={e => this.goToFAQ(e)}>FAQS</button>
                    <button className="popoutButton" onClick={e => this.goToTestimonials(e)}>TESTIMONIALS</button>
                    <a href={process.env.PUBLIC_URL + "/assets/Terms_and_Conditions.pdf"} download=""><button className="popoutButton">TERMS & CONDITIONS</button></a>
                </div>
            </div>
        );
            
    }
}

export default Popout;

//<Hamburger />
//
//"react-router-dom": "^6.0.0-alpha.1",