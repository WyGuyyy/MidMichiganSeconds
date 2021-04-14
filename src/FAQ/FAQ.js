import React from 'react';
import ReactDOM from "react-dom"
import './FAQ.css';
import Header from "../Header/Header"
import Popout from '../Popout/Popout';
/*import midmiclipped from '../Assets/midmiclipped.PNG';*/
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

class FAQ extends React.Component{
    constructor(props){
        super(props);

        this.state = {

        };

    }
    
    componentDidMount(){ 

    }

    //Lifecycle event preparing Slideshow component to unmount from DOM
    componentWillUnmount(){

    }

    
    render(){

        var backgroundImage = process.env.PUBLIC_URL + "/assets/midmiclipped.PNG";

        return(
            <div className="faqContainer">
                <Popout hist={this.props.history}/>
                <section className="FAQ-Top-Section" style={{height: this.state.topSectionHeight}}>
                    <div className="FAQ-Header-Wrapper" style={{height: this.state.headerHeight}}>
                        <Header hist={this.props.history}/>
                    </div>
                </section>
                <section className="FAQ-Content-Section" style={{height: this.state.middleSectionHeight}}>
                    <div className="FAQ-Content-Header">
                        <div className="FAQ-Content-Header-Image" style={{backgroundImage: "url(" + backgroundImage + ")"}}> 
                            <div className="FAQ-Content-Header-Tile">
                                <h2 className="FAQ-Content-Header-Title">FAQ</h2>
                            </div>
                        </div>
                    </div>
                    <div className="FAQ-Content-Wrapper">
                        <div className="FAQ-Content-Displayed FAQ-Content-1">
                            <h1 className="FAQ-Content-Displayed-Title FAQ-Title">When is my image displayed?</h1>
                            <p className="FAQ-Content-Displayed-Text FAQ-Text">Your image is displayed at the exact second chosen at checkout. Your image will be displayed at that second every 24 hours at the same time.</p>
                        </div>

                        <div className="FAQ-Content-Price FAQ-Content-2">
                            <h1 className="FAQ-Content-Price-Title FAQ-Title">What is the price per second?</h1>
                            <p className="FAQ-Content-Price-Text FAQ-Text">Each second is 1 USD to upload a picture and a link to a website of your choosing</p>
                        </div>

                        <div className="FAQ-Content-Upload FAQ-Content-1">
                            <h1 className="FAQ-Content-Upload-Title FAQ-Title">What type of pictures can I upload?</h1>
                            <p className="FAQ-Content-Upload-Text FAQ-Text">Progressive pictures that build and play a scene over a few seconds are the best but overall the purpose of the page is to promote the mid-michigan area and tell its story so any pictures, images, or advertisement that fits the website theme is great</p>
                        </div>

                        <div className="FAQ-Content-Change FAQ-Content-2">
                            <h1 className="FAQ-Content-Change-Title FAQ-Title">Can I change my picture or link afterward?</h1>
                            <p className="FAQ-Content-Change-Text FAQ-Text">Once an image or link is uploaded it cannot be changed</p>
                        </div>

                        <div className="FAQ-Content-Available FAQ-Content-1">
                            <h1 className="FAQ-Content-Available-Title FAQ-Title">Which seconds are available?</h1>
                            <p className="FAQ-Content-Available-Text FAQ-Text">Any second bearing the mid-michigan seconds logo is an available second. A list of all available second can also be viewed in the purchase seconds page.</p>
                        </div>

                        <div className="FAQ-Content-MoreThanOnce FAQ-Content-2">
                            <h1 className="FAQ-Content-MoreThanOnce-Title FAQ-Title">Can a second be purchased more than once?</h1>
                            <p className="FAQ-Content-MoreThanOnce-Text FAQ-Text">Once a second is purchased no one else can purchase the second again that second is yours and will display your image every day at your time.</p>
                        </div>

                        <div className="FAQ-Content-URL FAQ-Content-1">
                            <h1 className="FAQ-Content-URL-Title FAQ-Title">What URL do I upload if I don't have one?</h1>
                            <p className="FAQ-Content-URL-Text FAQ-Text">If you don’t have a URL you can upload a URL of a Facebook page or other social media website that supports the MidMichigan area. If you prefer not to do this, you can always link back to the MidMichigan seconds website again</p>
                        </div>
                    </div>
                </section>
            </div>
        );
            
    }
}

export default FAQ;


//"react-router-dom": "^6.0.0-alpha.1",