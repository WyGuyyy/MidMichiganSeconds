import React from 'react';
import './Home.css';
import Header from "./Header/Header"
import Slideshow from "./Slideshow/Slideshow"
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component{
    constructor(props){
        super(props);


    }
    
    componentDidMount(){ 
    
    }

    componentWillUnmount(){
        
    }

    
    render(){

        return(
            <div className="homeContainer">
                <section className="Home-Top-Section">
                    <div className="Home-Header-Wrapper">
                        <Header />
                    </div>
                    <div className="Home-Slideshow-Wrapper">
                        <Slideshow />
                    </div>
                </section>
            </div>
        );
            
    }
}

export default Home;


//"react-router-dom": "^6.0.0-alpha.1",