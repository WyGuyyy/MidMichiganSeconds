import React from 'react';
import ReactDOM from "react-dom"
import './ImageCropComponent.css';
import Cropper from 'react-easy-crop'
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

class ImageCropComponent extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            crop: {x: 0, y: 0},
            size: {width: (window.innerWidth * .95), height: (950 * .85)},
            zoom: 1,
            aspect: window.innerWidth * .85 / 950 * .95,
            transform: "translate(0, 0)"
        };

    }
    
    componentDidMount(){ 
        
    }

    //Lifecycle event preparing Slideshow component to unmount from DOM
    componentWillUnmount(){

    }

    onCropChange = crop => {
        this.setState({crop});

        var transform = "translate(" + crop.x + "," + crop.y + ")";

        this.setState({transform});
    }

    onZoomChange = zoom => {
        this.setState({zoom});
    }

    render(){

        var midmi = process.env.PUBLIC_URL + "/assets/midmi.jpg";
        var d3 = process.env.PUBLIC_URL + "/assets/capture.PNG";

        var styleObj = {display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"};

        return(
            <div className="ImageCropComponent-Container">
                <div className="ImageCropComponent-Cropper-Area">
                    <Cropper 
                        crop={this.state.crop}
                        image={d3}
                        zoom={this.state.zoom}
                        aspect={this.state.aspect}
                        onCropChange={this.onCropChange}
                        onZoomChange={this.onZoomChange}
                        onCropAreaChange = {this.onCropAreaChange}
                        style={{containerStyle: {styleObj}}}
                        cropSize={this.state.size}
                    />
                </div>
                <div className="ImageCropComponent-Palet-Area">
                </div>
            </div>
        );
            
    }
}

export default ImageCropComponent;


//"react-router-dom": "^6.0.0-alpha.1",
//cropSize={this.state.size}
//transform={this.state.transform}