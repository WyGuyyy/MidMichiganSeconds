import React from 'react';
import './Header.css';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MMS_Title from './MMS_Title';
import Hamburger from './Hamburger';

class Header extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            hamSelected: false
        };
    }
    
    //Lifecycle method for after Header component has mounted to the DOM
    componentDidMount(){ 
    
    }

    //Lifecycle event preparing Header component to unmount from DOM
    componentWillUnmount(){
        
    }

    hamClick(){

        if(this.state.hamSelected){        
            
            this.setState({
                hamSelected: false
            });

            this.closeMenu();

        }else{
            
            this.setState({
                hamSelected: true
            });

            this.openMenu();

        }
    }

    openMenu(){

        var popout = document.getElementsByClassName("popoutContainer")[0];
        popout.classList.remove("popoutWrapper-goUp");
        popout.classList.add("popoutWrapper-goDown");
        //
        //popout.style.visibility = "visbile";
        /*popout.style.transform = "scale(1)";
        popout.style.transitionDuration = "0.75s";
        popout.style.opacity = "1";
        popout.style.transition = "opacity 0.4s ease";*/

    }

    closeMenu(){
        var popout = document.getElementsByClassName("popoutContainer")[0];
        popout.classList.remove("popoutWrapper-goDown");
        popout.classList.add("popoutWrapper-goUp");
        //popout.className = popout.className;
        //popout.style.visibility = "hidden";
    }

    //Render the Header component to the DOM/Screen
    render(){

        return(
            <div className="headerContainer">
                <div className="MMS-Title-Container">
                    <MMS_Title />
                </div>
                <div className="hamburgerContainer">
                    <Hamburger hamClick={this.hamClick.bind(this)}/>
                </div>
            </div>
        );
            
    }
}

export default Header;


//"react-router-dom": "^6.0.0-alpha.1",