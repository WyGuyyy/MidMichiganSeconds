import React from 'react';
import './ImageTextTile.css';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import aPhoto from '../Assets/midmi.jpg';
//import wy from '../src/Assets/wy.PNG';
//import ja from '../src/Assets/ja.PNG';

class ImageTextTile extends React.Component{
    constructor(props){
        super(props);

        this.state={
            bannerText: this.props.bannerText,
            tileText: this.props.tileText
        }

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
            <div className="Image-Text-Tile-Container" onClick={this.props.customClick}>
                <div className="Image-Text-Tile-Banner">
                    <h2 className="Image-Text-Tile-Banner-Text">{this.state.bannerText}</h2>
                </div>
                <div className="Image-Text-Tile-Wrapper">
                    <div className="Image-Text-Tile-Image" style={{backgroundImage: "url(" + this.props.imageSrc + ")"}}>

                    </div>
                    <div className="Image-Text-Tile-Text">
                        <p className="Image-Text-Tile-Tile-Text">{this.state.tileText}</p>
                    </div>
                </div>
            </div>
        );
            
    }
}

export default ImageTextTile;


//"react-router-dom": "^6.0.0-alpha.1",
//<div className="slideshowImage" />