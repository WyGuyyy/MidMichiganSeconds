import React from 'react';
import ReactDOM from "react-dom"
import './Upload.css';
import Header from "../Header/Header"
import Popout from '../Popout/Popout';
import Timeline from '../Timeline/Timeline';
import {getUsedSeconds} from '../Services/ContentService';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

class Upload extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            times: props.history.location.state.times,
            selectedTimes: [],
            selectedFiles: [],
            url: [],
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
            parentDiv.id = "selected-item-" + count;
            parentDiv.onclick = e => this.timeClick(e);

            timeWrapper.classList.add("Upload-Item-Time-Wrapper");
            timeText.classList.add("Upload-Item-Time-Text");

            photoWrapper.classList.add("Upload-Item-Image-Wrapper");
            aPhotoInput.classList.add("Upload-Item-Image-Input");
            aLabel.classList.add("Upload-Item-Image-Label");

            urlWrapper.classList.add("Upload-Item-URL-Wrapper");
            aURLInput.classList.add("Upload-Item-URL-Input");

            //timeWrapper.onclick = e => this.timeClick(e);
            timeWrapper.id = "time-item-" + count;

            timeText.textContent = times[count];
            timeText.id = "text-time-item-" + count;
            timeWrapper.appendChild(timeText);

            photoWrapper.id = "photo-item-" + count;
            aPhotoInput.id = "photo-" + count;
            aPhotoInput.type = "file";
            aPhotoInput.style.display = "none";
            aPhotoInput.disabled = true;
            aPhotoInput.onchange = e => this.handleFileUpload(e);

            aLabel.textContent = "Choose a photo...";
            aLabel.setAttribute("for", "photo-" + count);
            aLabel.style.color = "white";
            aLabel.onmouseover = e => {e.target.style.color = "green";}
            aLabel.onmouseout = e => {e.target.style.color = "white";}
            aLabel.id = "label-" + count;

            photoWrapper.appendChild(aPhotoInput);
            photoWrapper.appendChild(aLabel);

            urlWrapper.id = "url-item-" + count;
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
        var idNum = parseInt(splitArr[splitArr.length - 1]);

        if(splitArr.length > 2){        
            if(this.state.shift){
                this.handleTimeShift(idNum);
            }else if(this.state.ctrl){
                this.handleTimeCtrl(idNum);
            }else{
                this.handleTimeSingle(idNum);
            }
        }

    }

    handleTimeShift(idNumber){
        var selTimes = [];
        var times = this.state.times;
        var idNum = idNumber;
        var aPivot = this.state.pivot;
        var count = 0;

        if(aPivot === -1){

            for(count = 0; count <= idNum; count++){
                document.getElementById("selected-item-" + count).style.background = "rgb(65, 65, 65)";
                var text = document.getElementById("text-time-item-" + count);
                text.style.color = "rgb(97, 183, 226)";
                selTimes.push(text.textContent);

                document.getElementById("photo-" + count).disabled = false;
                document.getElementById("url-" + count).disabled = false;
            }

            for(count = count; count < times.length; count++){
                document.getElementById("selected-item-" + count).style.background = "rgb(0, 0, 0)";
                document.getElementById("text-time-item-" + count).style.color = "rgb(255, 255, 255)";
                document.getElementById("photo-" + count).disabled = true;
                document.getElementById("url-" + count).disabled = true;
            }

        }else if(idNum < aPivot){

            for(count = 0; count < times.length; count++){
                document.getElementById("selected-item-" + count).style.background = "rgb(0, 0, 0)";
                document.getElementById("text-time-item-" + count).style.color = "rgb(255, 255, 255)";
                document.getElementById("photo-" + count).disabled = true;
                document.getElementById("url-" + count).disabled = true;
                if(count === idNum){
                    for(count = count; count <= aPivot; count++){
                        document.getElementById("selected-item-" + count).style.background = "rgb(65, 65, 65)";
                        var text = document.getElementById("text-time-item-" + count);
                        text.style.color = "rgb(97, 183, 226)";
                        selTimes.push(text.textContent);

                        document.getElementById("photo-" + count).disabled = false;
                        document.getElementById("url-" + count).disabled = false;
                    }
                    count--;
                }
            }

        }else{

            for(count = 0; count < times.length; count++){
                document.getElementById("selected-item-" + count).style.background = "rgb(0, 0, 0)";
                document.getElementById("text-time-item-" + count).style.color = "rgb(255, 255, 255)";
                document.getElementById("photo-" + count).disabled = true;
                document.getElementById("url-" + count).disabled = true;
                if(count === aPivot){
                    for(count = count; count <= idNum; count++){
                        document.getElementById("selected-item-" + count).style.background = "rgb(65, 65, 65)";
                        var text = document.getElementById("text-time-item-" + count);
                        text.style.color = "rgb(97, 183, 226)";
                        selTimes.push(text.textContent);

                        document.getElementById("photo-" + count).disabled = false;
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

    handleTimeCtrl(idNumber){
        var selTimes = this.state.selectedTimes;
        var times = this.state.times;
        var idNum = idNumber;
        var aPivot = this.state.pivot;

        var aTime = document.getElementById("text-time-item-" + idNum).textContent;

        if(selTimes.includes(aTime)){
            var index = selTimes.indexOf(aTime);
            selTimes.splice(index, 1);

            aPivot = times.indexOf(selTimes[selTimes.length - 1]);
            document.getElementById("selected-item-" + idNum).style.background = "rgb(0, 0, 0)";
            document.getElementById("text-time-item-" + idNum).style.color = "rgb(255, 255, 255)";

            document.getElementById("photo-" + idNum).disabled = true;
            document.getElementById("url-" + idNum).disabled = true;
        }else{
            document.getElementById("selected-item-" + idNum).style.background = "rgb(65, 65, 65)";
            var text = document.getElementById("text-time-item-" + idNum);
            text.style.color = "rgb(97, 183, 226)";
            selTimes.push(text.textContent);
            aPivot = idNum;

            document.getElementById("photo-" + idNum).disabled = false;
            document.getElementById("url-" + idNum).disabled = false;
        }

        this.setState({
            selectedTimes: selTimes,
            pivot: aPivot
        });

    }

    handleTimeSingle(idNumber){
        var selTimes = this.state.selectedTimes;
        var times = this.state.times;
        var idNum = idNumber;
        var aPivot = this.state.pivot;
        var count = 0;

        var aTime = document.getElementById("text-time-item-" + idNum).textContent;

        if(selTimes.includes(aTime)){

            for(count = 0; count < selTimes.length; count++){
                var index = times.indexOf(selTimes[count]);
                document.getElementById("selected-item-" + index).style.background = "rgb(0, 0, 0)";
                document.getElementById("text-time-item-" + index).style.color = "rgb(255, 255, 255)";

                document.getElementById("photo-" + count).disabled = true;
                document.getElementById("url-" + count).disabled = true;
            }

            selTimes = [];
            aPivot = -1;

        }else{
            for(count = 0; count < selTimes.length; count++){
                var index = times.indexOf(selTimes[count]);
                document.getElementById("selected-item-" + index).style.background = "rgb(0, 0, 0)";
                document.getElementById("text-time-item-" + index).style.color = "rgb(255, 255, 255)";

                document.getElementById("photo-" + count).disabled = true;
                document.getElementById("url-" + count).disabled = true;
            }

            selTimes = [];
            selTimes.push(aTime);
            aPivot = idNum;

            document.getElementById("selected-item-" + idNum).style.background = "rgb(65, 65, 65)";
            document.getElementById("text-time-item-" + idNum).style.color = "rgb(97, 183, 226)";

            document.getElementById("photo-" + idNum).disabled = false;
            document.getElementById("url-" + idNum).disabled = false;
        }

        this.setState({
            selectedTimes: selTimes,
            pivot: aPivot
        });

    }

    handleFileUpload(event){

        var _URL = window.URL || window.webkitURL;

        var tempFiles = this.state.selectedFiles;
        var idNum = event.target.id.split("-")[2];

        var file = event.target.files[0];

        var img = new Image();
        var imgwidth = 0;
        var imgheight = 0;

        var selectedTimes = this.state.selectedTimes;
        var tempTimes = this.state.times;
        var i;

        if(!(file == undefined)){

            img.src = _URL.createObjectURL(file);

            img.onload = function(){
                imgwidth = this.width;
                imgheight = this.height;

                if(imgwidth == 950 && imgheight == 750){

                    for(i=0; i < selectedTimes.length; i++){
                        var index = tempTimes.indexOf(selectedTimes[i]);
                        tempFiles[index] = event.target.files[0];
                        document.getElementById("label-" + index).innerHTML = event.target.files[0].name;
                    }

                }else{
                    alert("Image dimensions are invalid. The image must be 950(width)x750(height).");
                }
            }

            this.setState({
                selectedFiles: tempFiles
            });
    
    }

    }

    collectURLS = (event) => {
        var count = 0;

        for(count = 0; count < Object.keys(this.state.times).length; count++){
            var aURLInput = document.getElementById("url-" + count);

            this.state.url[count] = aURLInput.value;
        }
    }

    async checkConditions(event){

        event.preventDefault();

        var imageCount = this.state.selectedFiles.length;
        var urlExist = 0;
        var newSelectedTimes = this.state.selectedTimes;
        var times = this.state.times;

        //var request = new XMLHttpRequest();
        var status;
        var statusText;

        var count = 0;

        if(this.state.url.length == 1 && (this.state.url[0].trim().localeCompare("") == 0 || this.state.url[0].trim().localeCompare("Enter a URL...") == 0)){
            alert("There is an empty URL field. Please fill all URL fields to continue.");
        }

        for(count = 0; count < this.state.url.length; count++){
            var urlInput = this.state.url[count];

            if(this.validURL(urlInput)){

                if(urlInput.localeCompare("") == 0){
                    urlExist = 0;
                    alert("There is an empty URL field. Please fill all URL fields to continue.");
                    break;
                }else{
                    await fetch(urlInput, {method: 'head', mode: 'no-cors'}).then(function(response){ //Need to find out if url exists still
                        if(response.type.localeCompare("opaque") == 0){
                            urlExist = 1;
                        }else{
                            var index = newSelectedTimes.indexOf(times[count]);
                            urlExist = 0;
                            alert("The url " + urlInput + " was not detected as an existing webpage. Please enure the URL is valid and try again.");
                            document.getElementById("time-item-" + count).style.background = "rgba(99, 0, 0, 1)";
                            document.getElementById("time-item-" + count).children[0].style.color = "white";
                            document.getElementById("photo-" + count).disabled = true;
                            document.getElementById("url-" + count).disabled = true;
                            if(index != -1){
                                newSelectedTimes.splice(index, 1);
                            }
                        }
                    }).catch(function(){
                        var index = newSelectedTimes.indexOf(times[count]);
                        urlExist = 0;
                        alert("The url " + urlInput + " was not detected as an existing webpage. Please enure the URL is valid and try again.");
                        document.getElementById("time-item-" + count).style.background = "rgba(99, 0, 0, 1)";
                        document.getElementById("time-item-" + count).children[0].style.color = "white";
                        document.getElementById("photo-" + count).disabled = true;
                        document.getElementById("url-" + count).disabled = true;
                        if(index != -1){
                            newSelectedTimes.splice(index, 1);
                        }
                    });
                    //request.open("GET", urlInput, true);
                    //request.send();
                    //request.onload = function(){
                    //status = request.status;
                    //statusText = request.statusText;

                    //alert(request.response);

                    /*if(status == 200) //if(statusText == OK)
                    {
                        urlExist = 1;
                    }
                    else{
                        urlExist = 0;
                        alert("The url " + urlInput + " was not detected as an existing webpage. Please enure the URL is valid and try again.");
                    }
                }*/

                if(urlExist == 0){
                    break;
                }

                }
        }else{
            alert("Invalid url: " + urlInput + ". URL must contain the full address, including the protocol (http/https) - (e.g. https://www.somesite.com)");
            urlExist = 0;
            break;
        }
    }

        if(imageCount == this.state.times.length && urlExist == 1){
            urlExist = 1;
        }else if(!(imageCount == this.state.times.length)){
            urlExist = 0;
            alert("Any empty photo slot has been detected. Please choose an image for every selected time.");
        }

        this.setState({
            meetsConditions: urlExist,
            selectedTimes: newSelectedTimes
        });

        if(urlExist == 1){
            console.log(this.state.selectedFiles);
            this.props.history.push({
                pathname: "/checkout",
                state: {times: this.state.times, url: this.state.url, selectedFiles: this.state.selectedFiles}
            });
        }
    }

    validURL(str){

        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return pattern.test(str);
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
                <div className="Upload-Timeline-Wrapper">
                    <Timeline flag="2"/>
                </div>
                <section className="Upload-Content-Section" style={{height: this.state.middleSectionHeight}}>
                    
                    <div className="Upload-Selected-Wrapper">

                    </div>

                    <div className="Upload-Button-Area">
                        <button className="Upload-Back-Button" onClick={e => this.goToPicktime(e)}>Back</button>
                        <button className="Upload-Checkout-Button" onClick={(e) => {this.collectURLS(); this.checkConditions(e);}}>Checkout</button>
                    </div>
                    
                </section>
            </div>
        );
            
    }
}

export default Upload;


//"react-router-dom": "^6.0.0-alpha.1",