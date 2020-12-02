import React from 'react';
import './Home.css';
import Header from "./Header/Header"
import Slideshow from "./Slideshow/Slideshow"
import TextTile_TBT from "./Tiles/TextTile_TBT"
import ImageTile from "./Tiles/ImageTile"
import ImageTextTile from './Tiles/ImageTextTile';
import Popout from './Popout/Popout';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import wy from '../src/Assets/wy.PNG';
import ja from '../src/Assets/ja.PNG';
import company from '../src/Assets/company.png';
import construction from '../src/Assets/construction.png';
import exp from '../src/Assets/exp.jpg';
import jimbo from '../src/Assets/jimbo.png';
import kennedy from '../src/Assets/kennedy.png';
import lorum from '../src/Assets/lorum.jpg';
import starbucks from '../src/Assets/starbucks.png';
import teknix from '../src/Assets/teknix.jpg';
import view from '../src/Assets/viewour.PNG';
import register from '../src/Assets/register.jpg';
import faqs from '../src/Assets/faqs.jpg';
import testimonial from '../src/Assets/testimonial.jpg';

class Home extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            topSectionHeight: window.innerHeight + 10,
            middleSectionHeight: -1,
            bottomSectionHeight: -1,
            headerHeight: -1,
            slideshowHeight: window.innerHeight + 10 - 75,
            whatIsHeight: -1,
            tileAreaHeight: -1,
            meetUsHeight: -1,
            actionAreaHeight: -1,
            subscribeHeight: -1,
            footerHeight: -1
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    }
    
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

        var newTopSectionHeight = window.innerHeight + 10;
        var newSlideshowHeight = window.innerHeight + 10 - 75;

        this.setState({
            topSectionHeight: newTopSectionHeight + 15,
            slideshowHeight: newSlideshowHeight
        });
    }
    
    render(){

        var registerBannerText = "REGISTER";
        var registerTileText = "Feature your business on MidMichigan Seconds";
        var faqsBannerText = "FAQS";
        var faqsTileText = "Frequently asked questions";
        var testimonialBannerText = "TESTIMONIALS";
        var testimonialTileText = "Hear from MidMichigan Seconds users";

        return(
            <div className="homeContainer">
                <Popout hist={this.props.history}/>
                <section className="Home-Top-Section" style={{height: this.state.topSectionHeight}}>
                    <div className="Home-Header-Wrapper" style={{height: this.state.headerHeight}}>
                        <Header />
                    </div>
                    <div className="Home-Slideshow-Wrapper" style={{height: this.state.slideshowHeight}}>
                        <Slideshow />
                    </div>
                </section>
                <section className="Home-Middle-Section" style={{height: this.state.middleSectionHeight}}>
                    <div className="Home-WhatIs-Wrapper" style={{height: this.state.whatIsHeight}}>
                        <TextTile_TBT />
                    </div>
                    <div className="Home-Tile-Wrapper" style={{height: this.state.tileAreaHeight}}>
                            <div className="Home-Tile-Grid" >
                                <ImageTile tileArea="tile1" backColor="#963700" float={false} imageSrc={company}/>
                                <ImageTile tileArea="tile2" backColor="#4585b0" float={false} imageSrc={starbucks}/>
                                <ImageTile tileArea="tile3" backColor="#636363" float={false} imageSrc={exp}/>

                                <ImageTile tileArea="tile4" backColor="#36434d" float={false} imageSrc={jimbo}/>
                                <div className="floatingTile">
                                    <ImageTile tileArea="" backColor="#1a2126" float={true} imageSrc={view}/>
                                </div>
                                <ImageTile tileArea="tile5" backColor="#80674a" float={false} imageSrc={kennedy}/>

                                <ImageTile tileArea="tile6" backColor="#593b00" float={false} imageSrc={lorum}/>
                                <ImageTile tileArea="tile7" backColor="#2e2e2e" float={false} imageSrc={teknix}/>
                                <ImageTile tileArea="tile8" backColor="#633300" float={false} imageSrc={construction}/>
                            </div>
                    </div>
                    <div className="Home-Meet-Wrapper" style={{height: this.state.meetUsHeight}}>
                        <div className="Meet-Area-Text"> 
                            <h2 className="Meet-Area-Title">MEET WYATT AND JASON</h2>
                            <p className="Meet-Area-Par">Jason and Wyatt are both born and raised in the MidMichigan region. After taking trips around the country and traveling around the world they both found their way back to the mid-michigan area and appreciated everything it has to offer from the vast expanses of water, and stunning views inland all the way to the people, shops, and businesses making the area what it is.<br/><br/>
                                                         Jason and Wyatt came together to create this website to promote the area and let the world see the great things it has to offer. Join them in their journey by uploading images and links to landmarks and people that make MidMichigan what it is.</p>
                        </div>
                        <div className="Meet-Area-Images"> 
                            <div className="Image-Wyatt-Wrapper">
                                <img className="imageWyatt" src={wy}/>
                                <figcaption className="captionWyatt">Wyatt</figcaption>
                            </div>
                            <div className="Image-Jason-Wrapper">
                                <img className="imageJason" src={ja}/>
                                <figcaption className="captionJason">Jason</figcaption>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="Home-Bottom-Section" style={{height: this.state.bottomSectionHeight}}>
                    <div className="Home-Actions-Wrapper" style={{height: this.state.actionAreaHeight}}>
                        <ImageTextTile bannerText={registerBannerText} tileText={registerTileText} imageSrc={register}/>
                        <ImageTextTile bannerText={faqsBannerText} tileText={faqsTileText} imageSrc={faqs}/>
                        <ImageTextTile bannerText={testimonialBannerText} tileText={testimonialTileText} imageSrc={testimonial}/>
                    </div>
                    <div className="Home-Subscribe-Wrapper" style={{height: this.state.subscribeHeight}}>
                        <label className="subscribeLabel">Subscribe and stay up to date </label>
                        <input className="subscribeInput"/>
                    </div>
                    <footer className="homeFooter" stlye={{height: this.state.footerHeight}}>
                        <p className="Home-Footer-Text">copyright Jason Spaude and Wyatt Towne</p>
                    </footer>
                </section>
            </div>
        );
            
    }
}

export default Home;


//"react-router-dom": "^6.0.0-alpha.1",