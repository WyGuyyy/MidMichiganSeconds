import React from 'react';
import ReactDOM from "react-dom"
import './Upload.css';
import Header from "../Header/Header"
import Popout from '../Popout/Popout';
import {getUsedSeconds} from '../Services/ContentService';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

class Upload extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            times: props.history.location.state.times
        };

        console.log(props.history.location.state.times);

    }
    
    componentDidMount(){ 
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);

        document.addEventListener("keydown", this.onKeyDown, false);
        document.addEventListener("keyup", this.onKeyUp, false);

        this.fillItems();
    }

    //Lifecycle event preparing Slideshow component to unmount from DOM
    componentWillUnmount(){

    }

    onKeyDown(e){
        if(e.key.localeCompare("Shift") == 0){
            this.setState({
                shift: true
            });
        }else if(e.key.localeCompare("Control") == 0){
            this.setState({
                ctrl: true
            });
        }
    }

    onKeyUp(e){
        if(e.key.localeCompare("Shift") == 0){
            this.setState({
                shift: false
            });
        }else if(e.key.localeCompare("Control") == 0){
            this.setState({
                ctrl: false
            });
        }
    }

      fillItems(){

        var times = this.state.times;
        var count = 0;

        var selectedList = document.getElementsByClassName("Upload-Selected-Wrapper")[0];

        for(count = 0; count < times.length; count++){

            var parentDiv = document.createElement("div");

            var timeWrapper = document.createElement("div");
            var timeText = document.createElement("h2");

            var photoWrapper = document.createElement("div");
            var aPhotoInput = document.createElement("input");
            var aLabel = document.createElement("Label");

            var urlWrapper = document.createElement("div");
            var aURLInput = document.createElement("input");

            parentDiv.classList.add("Upload-Selected-Item");

            timeWrapper.classList.add("Upload-Item-Time-Wrapper");
            timeText.classList.add("Upload-Item-Time-Text");

            photoWrapper.classList.add("Upload-Item-Image-Wrapper");
            aPhotoInput.classList.add("Upload-Item-Image-Input");
            aLabel.classList.add("Upload-Item-Image-Label");

            urlWrapper.classList.add("Upload-Item-URL-Wrapper");
            aURLInput.classList.add("Upload-Item-URL-Input");

            timeWrapper.onclick = e => this.timeClick(e);
            timeWrapper.id = "time-item-" + count;

            timeText.textContent = times[count];
            timeWrapper.appendChild(timeText);

            aPhotoInput.id = "photo-input-" + count;
            aPhotoInput.type = "file";
            aPhotoInput.style.display = "none";
            aPhotoInput.disabled = true;
            aPhotoInput.onchange = e => this.handleFileUpload(e);

            aLabel.textContent = "Choose a photo...";
            aLabel.setAttribute("for", "photo-input-" + count);
            aLabel.style.color = "white";
            aLabel.onmouseover = e => {e.target.style.color = "green";}
            aLabel.onmouseout = e => {e.target.style.color = "white";}
            aLabel.id = "label-" + count;

            photoWrapper.appendChild(aPhotoInput);
            photoWrapper.appendChild(aLabel);

            aURLInput.id = "url-" + count
            aURLInput.value = "Enter a URL..."
            aURLInput.disabled = true;
            aURLInput.autocomplete = "off";
            aURLInput.onfocus = (e) => this.clearText(e);
            aURLInput.onblur = (e) => this.refillDefault(e, "u");
            aURLInput.onkeyup = (e) => this.cloneToSelected(e);
            urlWrapper.appendChild(aURLInput);
            
            parentDiv.appendChild(timeWrapper);
            parentDiv.appendChild(photoWrapper);
            parentDiv.appendChild(urlWrapper);

            selectedList.appendChild(parentDiv);
        }

      }

    clearText(event){
        if(event.target.value.localeCompare("") === 0 || event.target.value.localeCompare("Select a photo...") === 0 || event.target.value.localeCompare("Enter a URL...") === 0){
            event.target.value = "";
        }
    }

    refillDefault(event, flag){
        var aFlag = flag;
        var count;

        if(aFlag.localeCompare("p") === 0 && event.target.value.localeCompare("") === 0){
            event.target.value = "Select a photo...";
        }else if(aFlag.localeCompare("u") == 0 && event.target.value.localeCompare("") == 0){
            for(count = 0; count < this.state.buffer.length; count++){
                var index = this.state.times.indexOf(this.state.buffer[count]);
                document.getElementById("url-" + index).value = "Enter a URL...";
            }
        }

    }

    cloneToSelected(e){
        var urlInput = e.target;
        var count;

        for(count = 0; count < this.state.buffer.length; count++){
            var index = this.state.times.indexOf(this.state.buffer[count]);
            document.getElementById("url-" + index).value = urlInput.value;
        }

    }

    timeClick(event){

    }

    handleFileUpload(event){

    }

    goToCheckout(){
        this.props.history.push({
            pathname: "/Checkout",
            state: {}
        });
    }

    goToPicktime(){
        this.props.history.goBack();
    }

    render(){

        return(
            <div className="uploadContainer">
                <Popout hist={this.props.history}/>
                <section className="Upload-Top-Section" style={{height: this.state.topSectionHeight}}>
                    <div className="Upload-Header-Wrapper" style={{height: this.state.headerHeight}}>
                        <Header />
                    </div>
                </section>
                <section className="Upload-Content-Section" style={{height: this.state.middleSectionHeight}}>
                    
                    <div className="Upload-Selected-Wrapper">

                    </div>

                    <div className="Upload-Button-Area">
                        <button className="Upload-Back-Button" onClick={e => this.goToPicktime(e)}>Back</button>
                        <button className="Upload-Checkout-Button" onClick={e => this.goToCheckout(e)}>Checkout</button>
                    </div>
                    
                </section>
            </div>
        );
            
    }
}

export default Upload;


//"react-router-dom": "^6.0.0-alpha.1",