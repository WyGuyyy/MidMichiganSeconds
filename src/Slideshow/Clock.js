import React from 'react';
import './Clock.css';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

class Clock extends React.Component{
    constructor(props){
        super(props);

    }
    
    //Lifecycle method for after Clock component has mounted to the DOM
    componentDidMount(){ 
    
    }

    //Lifecycle event preparing Clock component to unmount from DOM
    componentWillUnmount(){
        
    }

    //Render the Clock component to the DOM/Screen
    render(){

        return(
            <div className="clockContainer">
                
            </div>
        );
            
    }
}

export default Clock;


//"react-router-dom": "^6.0.0-alpha.1",