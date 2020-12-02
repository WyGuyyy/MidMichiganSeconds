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
                <h2 className="Text-Tile-TBT-Title">WHAT IS MIDMICHIGAN SECONDS?</h2>
                <div className="Text-Tile-TBT-Bar" />
                <p className="Text-Tile-TBT-Text">MidMichigan seconds is a website set out to promote the greater MidMichigan area and what truly defines the area. This is done by allowing you to display the features of this region one second at a time. This can be done by displaying a picture of the natural features, landscapes, people, cultures, businesses, etc. that define the region and make it what it is. A URL link can be added to the pictures so that if they are clicked, they will link you to the more information about the picture, who uploaded the picture, or more content similar to what was posted. The overall goal of this page is to promote the area and the great resources it has to offer.</p>
            </div>
        );
            
    }
}

export default TextTile_TBT;


//"react-router-dom": "^6.0.0-alpha.1",
//<div className="slideshowImage" />