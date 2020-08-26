import React from 'react';
import './TextTile_TBT.css';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

class TextTile_TBT extends React.Component{
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
            <div className="Text-Tile-TBT-Container">
                <h2 className="Text-Tile-TBT-Title"></h2>
                <div className="Text-Tile-TBT-Bar" />
                <p className="Text-Tile-TBT-Text"></p>
            </div>
        );
            
    }
}

export default TextTile_TBT;


//"react-router-dom": "^6.0.0-alpha.1",
//<div className="slideshowImage" />