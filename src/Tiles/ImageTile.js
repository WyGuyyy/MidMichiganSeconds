import React from 'react';
import './ImageTile.css';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

class ImageTile extends React.Component{
    constructor(props){
        super(props);



        this.state={
            area: (this.props.tileArea == null ? -1 : this.props.tileArea),
            backColor: this.props.backColor,
            tileWidth: (this.props.float ? window.innerWidth/3 + ((window.innerWidth/3) * 0.15) : window.innerWidth/3),
            tileHeight: (this.props.float ? 400 + 100 : 400),
            float: this.props.float
        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    }
    
    //Lifecycle method for after Sldieshow component has mounted to the DOM
    componentDidMount(){ 
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    //Lifecycle event preparing Slideshow component to unmount from DOM
    componentWillUnmount(){
        this.setState({

        });
    }

    updateWindowDimensions(){

        if(window.innerWidth >= 1500){
            var newTileWidth = (this.state.float ? (window.innerWidth/3) + ((window.innerWidth/3) * 0.15) : window.innerWidth/3);
            var newTileHeight = (this.state.float ? 500 + 100 : 500);
        }else if(window.innerWidth >= 1000){
            var newTileWidth = (this.state.float ? (window.innerWidth) : window.innerWidth/2);
            var newTileHeight = (this.state.float ? 500 + 100 : 500);
        }else{
            var newTileWidth = (this.state.float ? (window.innerWidth) : window.innerWidth);
            var newTileHeight = (this.state.float ? 500 + 100 : 500);
        }

        /*if(window.innerWidth >= 1024){
            var newTileHeight = (this.state.float ? (window.innerHeight/3) + 100 : window.innerHeight/3);
        }else if(window.innerWidth >= 768){
            var newTileHeight = (this.state.float ? (window.innerHeight/3) + 100 : window.innerHeight/3);
        }else{
            var newTileHeight = (this.state.float ? (window.innerHeight/3) + 100 : window.innerHeight/3);
        }*/

        this.setState({
            tileWidth: newTileWidth,
            tileHeight: newTileHeight
        });
    }

    //Render the Slideshow component to the DOM/Screen
    render(){

        console.log(this.props.imageSrc);

        return(
            <div className="Image-Tile-Container" style={{background: this.state.backColor, gridArea: this.state.area , width: this.state.tileWidth, height: this.state.tileHeight}}>
                <div className="imageTile" style={{backgroundImage: "url(" + this.props.imageSrc + ")"}}>

                </div>
            </div>
        );
            
    }
}

export default ImageTile;


//"react-router-dom": "^6.0.0-alpha.1",
//<div className="slideshowImage" />