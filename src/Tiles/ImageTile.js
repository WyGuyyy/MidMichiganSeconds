import React from 'react';
import './ImageTile.css';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

class ImageTile extends React.Component{
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
            <div className="Image-Tile-Container">
                <div className="imageTile">

                </div>
            </div>
        );
            
    }
}

export default ImageTile;


//"react-router-dom": "^6.0.0-alpha.1",
//<div className="slideshowImage" />