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
            times: props.history.location.state.times,
            selectedTimes: [],
            shift: false,
            ctrl: false,
            pivot: -1
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
            if(!this.state.shift){
                this.setState({
                    shift: true
                });
            }
        }else if(e.key.localeCompare("Control") == 0){
            if(!this.state.ctrl){
                this.setState({
                    ctrl: true
                });
            }
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
            timeText.id = "text-time-item-" + count;
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
            for(count = 0; count < this.state.selectedTimes.length; count++){
                var index = this.state.times.indexOf(this.state.selectedTimes[count]);
                document.getElementById("url-" + index).value = "Enter a URL...";
            }
        }

    }

    cloneToSelected(e){
        var urlInput = e.target;
        var count;

        for(count = 0; count < this.state.selectedTimes.length; count++){
            var index = this.state.times.indexOf(this.state.selectedTimes[count]);
            document.getElementById("url-" + index).value = urlInput.value;
        }

    }

    timeClick(event){

        var id = event.target.id.replace("text-", "");
        var splitArr = id.split("-");

        if(this.state.shift){
            this.handleTimeShift(splitArr);
        }else if(this.state.ctrl){
            this.handleTimeCtrl(splitArr);
        }else{
            this.handleTimeSingle(splitArr);
        }

    }

    handleTimeShift(splitArr){
        var selTimes = [];
        var times = this.state.times;
        var idNum = parseInt(splitArr[2]);
        var aPivot = this.state.pivot;
        var count = 0;

        if(aPivot === -1){

            for(count = 0; count <= idNum; count++){
                var text = document.getElementById("text-time-item-" + count);
                text.style.color = "rgb(97, 183, 226)";
                selTimes.push(text.textContent);

                document.getElementById("photo-input-" + count).disabled = false;
                document.getElementById("url-" + count).disabled = false;
            }

            for(count = count; count < times.length; count++){
                document.getElementById("text-time-item-" + count).style.color = "rgb(255, 255, 255)";
                document.getElementById("photo-input-" + count).disabled = true;
                document.getElementById("url-" + count).disabled = true;
            }

        }else if(idNum < aPivot){

            for(count = 0; count < times.length; count++){
                document.getElementById("text-time-item-" + count).style.color = "rgb(255, 255, 255)";
                document.getElementById("photo-input-" + count).disabled = true;
                document.getElementById("url-" + count).disabled = true;
                if(count === idNum){
                    for(count = count; count <= aPivot; count++){
                        var text = document.getElementById("text-time-item-" + count);
                        text.style.color = "rgb(97, 183, 226)";
                        selTimes.push(text.textContent);

                        document.getElementById("photo-input-" + count).disabled = false;
                        document.getElementById("url-" + count).disabled = false;
                    }
                    count--;
                }
            }

        }else{

            for(count = 0; count < times.length; count++){
                document.getElementById("text-time-item-" + count).style.color = "rgb(255, 255, 255)";
                document.getElementById("photo-input-" + count).disabled = true;
                document.getElementById("url-" + count).disabled = true;
                if(count === aPivot){
                    for(count = count; count <= idNum; count++){
                        var text = document.getElementById("text-time-item-" + count);
                        text.style.color = "rgb(97, 183, 226)";
                        selTimes.push(text.textContent);

                        document.getElementById("photo-input-" + count).disabled = false;
                        document.getElementById("url-" + count).disabled = false;
                    }
                    count--;
                }
            }

        }

        this.setState({
            selectedTimes: selTimes
        });
    }

    handleTimeCtrl(splitArr){
        var selTimes = this.state.selectedTimes;
        var times = this.state.times;
        var idNum = parseInt(splitArr[2]);
        var aPivot = this.state.pivot;

        var aTime = document.getElementById("text-time-item-" + idNum).textContent;

        if(selTimes.includes(aTime)){
            var index = selTimes.indexOf(aTime);
            selTimes.splice(index, 1);

            aPivot = times.indexOf(selTimes[selTimes.length - 1]);
            document.getElementById("text-time-item-" + idNum).style.color = "rgb(255, 255, 255)";

            document.getElementById("photo-input-" + idNum).disabled = true;
            document.getElementById("url-" + idNum).disabled = true;
        }else{
            var text = document.getElementById("text-time-item-" + idNum);
            text.style.color = "rgb(97, 183, 226)";
            selTimes.push(text.textContent);
            aPivot = idNum;

            document.getElementById("photo-input-" + idNum).disabled = false;
            document.getElementById("url-" + idNum).disabled = false;
        }

        this.setState({
            selectedTimes: selTimes,
            pivot: aPivot
        });

    }

    handleTimeSingle(splitArr){
        var selTimes = this.state.selectedTimes;
        var times = this.state.times;
        var idNum = parseInt(splitArr[2]);
        var aPivot = this.state.pivot;
        var count = 0;

        var aTime = document.getElementById("text-time-item-" + idNum).textContent;

        if(selTimes.includes(aTime)){

            for(count = 0; count < selTimes.length; count++){
                var index = times.indexOf(selTimes[count]);
                document.getElementById("text-time-item-" + index).style.color = "rgb(255, 255, 255)";

                document.getElementById("photo-input-" + count).disabled = true;
                document.getElementById("url-" + count).disabled = true;
            }

            selTimes = [];
            aPivot = -1;

        }else{
            for(count = 0; count < selTimes.length; count++){
                var index = times.indexOf(selTimes[count]);
                document.getElementById("text-time-item-" + index).style.color = "rgb(255, 255, 255)";

                document.getElementById("photo-input-" + count).disabled = true;
                document.getElementById("url-" + count).disabled = true;
            }

            selTimes = [];
            selTimes.push(aTime);
            aPivot = idNum;

            document.getElementById("text-time-item-" + idNum).style.color = "rgb(97, 183, 226)";

            document.getElementById("photo-input-" + idNum).disabled = false;
            document.getElementById("url-" + idNum).disabled = false;
        }

        this.setState({
            selectedTimes: selTimes,
            pivot: aPivot
        });

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