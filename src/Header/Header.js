import React from 'react';
import './Header.css';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MMS_Title from './MMS_Title';
import Hamburger from './Hamburger';

class Header extends React.Component{
    constructor(props){
        super(props);

    }
    
    //Lifecycle method for after Header component has mounted to the DOM
    componentDidMount(){ 
    
    }

    //Lifecycle event preparing Header component to unmount from DOM
    componentWillUnmount(){
        
    }

    //Render the Header component to the DOM/Screen
    render(){

        return(
            <div className="headerContainer">
                <div className="MMS-Title-Container">
                    <MMS_Title />
                </div>
                <div className="hamburgerContainer">
                    <Hamburger />
                </div>
            </div>
        );
            
    }
}

export default Header;


//"react-router-dom": "^6.0.0-alpha.1",