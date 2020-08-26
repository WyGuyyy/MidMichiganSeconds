import React from 'react';
import './Slideshow.css';
import Clock from "./Clock"
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

class Slideshow extends React.Component{
    constructor(props){
        super(props);

    }
    
    //Lifecycle method for after Sldieshow component has mounted to the DOM
    componentDidMount(){ 
    
    }

    //Lifecycle event preparing Slideshow component to unmount from DOM
    componentWillUnmount(){
        
    }

    //Render the Slideshow component to the DOM/Screen
    render(){

        return(
            <div className="slideshowContainer">
                <div className="slideshowImage" />
                <Clock />
            </div>
        );
            
    }
}

export default Slideshow;


//"react-router-dom": "^6.0.0-alpha.1",