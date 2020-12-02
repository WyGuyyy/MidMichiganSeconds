import React, { Fragment } from 'react';
import Timeline from './timeline';
import TransparentMenu from './transparentMenu';
import HamburgerMenu from './hamburger';
import './upload.css'; 
import { Link } from 'react-router-dom';

class Upload extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            times: (props.location.state != undefined ? props.location.state.times : []),
            inputflag: "",
            selectedFiles: [],
            url: [],
            meetsConditions: 0,
            anchor: -1,
            buffer: [],
            shiftIsPressed: false,
            controlIsPressed: false,
            token: (props.location.state != undefined ? props.location.state.token : "")
        };

        this.backStackCheckTime();
        this.initializeFiles();

    }
    
    initializeFiles(){
        var i;
        var tempFiles = [];
        
        for(i = 0; i < Object.keys(this.state.times).length; i++){
            tempFiles[i] = "";
        }

        this.setState({
            selectedFiles: tempFiles
        });
    }

    componentDidMount(){
        this.fillSelected()

        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);

        document.addEventListener("keydown", this.onKeyDown, false);
        document.addEventListener("keyup", this.onKeyUp, false);
    }

    componentWillUnmount(){
        
    }

    componentDidUpdate(){
        //this.backStackCheckTime();
    }

    async backStackCheckTime(){
        var token = this.state.token;

        if(this.props.location.state == undefined){
            this.props.history.replace("/picktime");
        }

        var content;
        var count;
        var newAMPM;
        var newHour;
        var newMinute;
        var newSecond;

        console.log(this.state.selectedFiles);

        for(count=0; count < Object.keys(this.state.times).length; count++){
 
             newAMPM = this.state.times[count].split(":")[2].split(" ")[1];
             newHour = this.state.times[count].split(":")[0];
             newMinute = this.state.times[count].split(":")[1];
             newSecond = this.state.times[count].split(":")[2].split(" ")[0];

             console.log(newAMPM + "|" + newHour + "|" + newMinute + "|" + newSecond);
 
             //HERE NEED TO GET RID OF HARD CODED TOKEN AND USE STATE VARIABLE TOKEN
             //await fetch("https://localhost:8443/api/content/" + newAMPM + "/" + newHour + "/" + newMinute + "/" + newSecond, { 
                await fetch("http://192.168.1.10:8080/api/content/" + newAMPM + "/" + newHour + "/" + newMinute + "/" + newSecond, { 
                 method: "GET",                          
                 headers: {"Content-Type": "application/json",
                           "Authorization": "Bearer " + token
                }
                 }).then(res => res.json())
                 .then(data => {
                     content = data;
                 })
                 .catch(console.log);

         }


         if(content){
             this.props.history.replace("/picktime");
        }
    }

    //working here
    fillSelected(){

        var i;

        var selectedList = document.getElementById("upload-area");

       /* var first = selectedList.firstElementChild;

        while(first){
            first.remove();
            first = selectedList.firstElementChild;
        }*/

        for(i = 0; i < Object.keys(this.state.times).length; i++){

            var aParentDiv = document.createElement('div');
            var aTimeDiv = document.createElement('div');
            var aPhotoInput = document.createElement('input');
            var aURLInput = document.createElement('input');
            var aDivLine1 = document.createElement('div');
            var aDivLine2 = document.createElement('div');
            var aLabel = document.createElement('Label');
            var aPar = document.createElement('p');

            aTimeDiv.className = "time-upload";
            aTimeDiv.onclick = (e) => this.timeClick(e);
            aTimeDiv.id = "time-item-" + i;
            aPar.innerText = this.state.times[i];
            aPar.className = "time-par";
            aPar.style.cursor = "context-menu";
            aTimeDiv.appendChild(aPar);            

            aPhotoInput.className = "input-upload";
            aPhotoInput.id = "photo-input-" + i;
            aPhotoInput.type = "file";
            aPhotoInput.style.display = "none";
            aPhotoInput.onchange = (e) => this.handleFileUpload(e);
            aPhotoInput.disabled = true;
            
            //aPhotoInput.value = "Select a photo...";
            //aPhotoInput.onfocus = (e) => this.clearText(e);
            //aPhotoInput.onblur = (e) => this.refillDefault(e, "p");

            aLabel.innerHTML = "Choose a photo..."
            aLabel.setAttribute("for", "photo-input-" + i);
            //aLabel.style.fontSize = "20px";
            aLabel.style.color = "white";
            aLabel.onmouseover = (e) => {e.target.style.color = "green";}
            aLabel.onmouseout = (e) => {e.target.style.color = "white";}
            aLabel.className = "label-upload";
            aLabel.id = "label-" + i;

            aURLInput.className = "input-upload";
            aURLInput.id = "url-" + i
            aURLInput.value = "Enter a URL..."
            aURLInput.disabled = true;
            aURLInput.autocomplete = "off";
            aURLInput.onfocus = (e) => this.clearText(e);
            aURLInput.onblur = (e) => this.refillDefault(e, "u");
            aURLInput.onkeyup = (e) => this.cloneToSelected(e);

            aDivLine1.className = "line-upload";
            aDivLine2.className = "line-upload";

            aParentDiv.appendChild(aTimeDiv);
            aParentDiv.appendChild(aDivLine1);
            aParentDiv.appendChild(aLabel);
            aParentDiv.appendChild(aPhotoInput);
            aParentDiv.appendChild(aDivLine2);
            aParentDiv.appendChild(aURLInput);

            aParentDiv.className = "selection-line-upload"

            selectedList.appendChild(aParentDiv);

            /*var aTag = document.createElement('a');
            aTag.innerHTML = this.state.times[i];

            if(this.state.times[i].localeCompare(this.state.selected) == 0){
                aTag.style.color = "white";
                aTag.style.backgroundColor = "blue";
            }else{
                aTag.style.color = "white";
                aTag.style.backgroundColor = "black";
            }

            aTag.style.padding = "2px";
            aTag.style.fontSize = "33px";
            aTag.id = "selected-item-" + i;
            aTag.onclick = (e) => this.selectedClick(e);

            selectedList.appendChild(aTag);*/
        }
    }

    handleFileUpload(event){

        var _URL = window.URL || window.webkitURL;

        var tempFiles = this.state.selectedFiles;
        var idNum = event.target.id.split("-")[2];

        var file = event.target.files[0];

        var img = new Image();
        var imgwidth = 0;
        var imgheight = 0;

        var tempBuff = this.state.buffer;
        var tempTimes = this.state.times;
        var i;

        if(!(file == undefined)){

            img.src = _URL.createObjectURL(file);

            img.onload = function(){
                imgwidth = this.width;
                imgheight = this.height;

                if(imgwidth == 950 && imgheight == 750){

                    for(i=0; i < tempBuff.length; i++){
                        var index = tempTimes.indexOf(tempBuff[i]);
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

    clearText(event){
        if(event.target.value.localeCompare("") == 0 || event.target.value.localeCompare("Select a photo...") == 0 || event.target.value.localeCompare("Enter a URL...") == 0){
            event.target.value = "";
        }
    }

    refillDefault(event, flag){
        var aFlag = flag;
        var i;

        if(aFlag.localeCompare("p") == 0 && event.target.value.localeCompare("") == 0){
            event.target.value = "Select a photo...";
        }else if(aFlag.localeCompare("u") == 0 && event.target.value.localeCompare("") == 0){
            for(i = 0; i < this.state.buffer.length; i++){
                var index = this.state.times.indexOf(this.state.buffer[i]);
                document.getElementById("url-" + index).value = "Enter a URL...";
            }
        }

    }


    closeNav(){
        document.getElementById("mySidenav").style.width = "0";
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
        var buff = this.state.buffer;
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
                            var index = buff.indexOf(times[count]);
                            urlExist = 0;
                            alert("The url " + urlInput + " was not detected as an existing webpage. Please enure the URL is valid and try again.");
                            document.getElementById("time-item-" + count).style.background = "rgba(99, 0, 0, 1)";
                            document.getElementById("time-item-" + count).children[0].style.color = "white";
                            document.getElementById("photo-input-" + count).disabled = true;
                            document.getElementById("url-" + count).disabled = true;
                            if(index != -1){
                                buff.splice(index, 1);
                            }
                        }
                    }).catch(function(){
                        var index = buff.indexOf(times[count]);
                        urlExist = 0;
                        alert("The url " + urlInput + " was not detected as an existing webpage. Please enure the URL is valid and try again.");
                        document.getElementById("time-item-" + count).style.background = "rgba(99, 0, 0, 1)";
                        document.getElementById("time-item-" + count).children[0].style.color = "white";
                        document.getElementById("photo-input-" + count).disabled = true;
                        document.getElementById("url-" + count).disabled = true;
                        if(index != -1){
                            buff.splice(index, 1);
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
            buffer: buff
        });

        if(urlExist == 1){
            this.props.history.push({
                pathname: "/checkout",
                state: {times: this.state.times, url: this.state.url, selectedFiles: this.state.selectedFiles, token: this.state.token}
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

    timeClick(e){ 

        var timeDiv;
        var listNum;
        var tempArr = this.state.buffer;
        var i;

        if(e.target.id){
            timeDiv = document.getElementById(e.target.id);
        }else{
            timeDiv = e.target.parentElement;
        }

        listNum = timeDiv.id.split("-")[2];

        if(this.state.shiftIsPressed){

            if(this.state.buffer.length == 0){ //start here next time - finish shift functionality first
                tempArr[tempArr.length] = timeDiv.children[0].innerHTML;

                timeDiv.style.background = "rgba(252, 219, 3, 1)";
                timeDiv.style.color = "black";

                document.getElementById("photo-input-" + listNum).disabled = false;
                document.getElementById("url-" + listNum).disabled = false;
                
                this.setState({
                    buffer: tempArr,
                    anchor: listNum
                });
            }else{

                tempArr = [];

                if(listNum < this.state.anchor){

                    for(i = 0; i < this.state.times.length; i++){
                        document.getElementById("time-item-" + i).style.background = "rgba(99, 0, 0, 1)";
                        document.getElementById("time-item-" + i).children[0].style.color = "white";
                        document.getElementById("photo-input-" + i).disabled = true;
                        document.getElementById("url-" + i).disabled = true;
                    }

                    for(i = listNum; i <= this.state.anchor; i++){
                        tempArr[tempArr.length] = document.getElementById("time-item-" + i).children[0].innerHTML;
                        document.getElementById("time-item-" + i).style.background = "rgba(252, 219, 3, 1)";
                        document.getElementById("time-item-" + i).children[0].style.color = "black";
                        document.getElementById("photo-input-" + i).disabled = false;
                        document.getElementById("url-" + i).disabled = false;
                    }

                    this.setState({
                        buffer: tempArr
                    });

                }else{

                    for(i = 0; i < this.state.times.length; i++){
                        document.getElementById("time-item-" + i).style.background = "rgba(99, 0, 0, 1)";
                        document.getElementById("time-item-" + i).children[0].style.color = "white";
                        document.getElementById("photo-input-" + i).disabled = true;
                        document.getElementById("url-" + i).disabled = true;
                    }

                    for(i = this.state.anchor; i <= listNum; i++){
                        tempArr[tempArr.length] = document.getElementById("time-item-" + i).children[0].innerHTML;
                        document.getElementById("time-item-" + i).style.background = "rgba(252, 219, 3, 1)";
                        document.getElementById("time-item-" + i).children[0].style.color = "black";
                        document.getElementById("photo-input-" + i).disabled = false;
                        document.getElementById("url-" + i).disabled = false;
                    }

                    this.setState({
                        buffer: tempArr
                    });

                }

            }

        }else if(this.state.controlIsPressed){ //start here and remove if already includes

            if(this.state.buffer.includes(this.state.times[listNum])){

                var tempArr;

                for(i = 0; i < this.state.buffer.length; i++){
                    if(this.state.buffer[i].localeCompare(document.getElementById("time-item-" + listNum).children[0].innerHTML) == 0){ 
                        tempArr = this.state.buffer;
                        tempArr.splice(i, 1);
                        break;
                    }
                }
                
                document.getElementById("time-item-" + listNum).style.backgroundColor = "rgba(99, 0, 0, 1)";
                document.getElementById("time-item-" + listNum).children[0].style.color = "white";
                document.getElementById("photo-input-" + listNum).disabled = true;
                document.getElementById("url-" + listNum).disabled = true;

                for(i = 0; i < tempArr.length; i++){
                   // if(this.state.times.includes(tempArr[i])){
                    var index = this.state.times.indexOf(tempArr[i]);
                    document.getElementById("time-item-" + index).style.backgroundColor = "rgba(252, 219, 3, 1)";
                    document.getElementById("time-item-" + index).children[0].style.color = "black";
                    document.getElementById("photo-input-" + index).disabled = false;
                    document.getElementById("url-" + index).disabled = false;
                    //}
                }

                this.setState({
                    anchor: listNum,
                    buffer: tempArr
                });

            }else{

                for(i = 0; i < this.state.times.length; i++){
                    document.getElementById("time-item-" + i).style.backgroundColor = "rgba(99, 0, 0, 1)";
                    document.getElementById("time-item-" + i).children[0].style.color = "white";
                    document.getElementById("photo-input-" + i).disabled = true;
                    document.getElementById("url-" + i).disabled = true;
                }
                var tempArr = this.state.buffer;
                tempArr[tempArr.length] = this.state.times[listNum];

                for( i = 0; i < tempArr.length; i++){
                   // if(this.state.times.includes(tempArr[j])){
                    var index = this.state.times.indexOf(tempArr[i]);
                    document.getElementById("time-item-" + index).style.backgroundColor = "rgba(252, 219, 3, 1)";
                    document.getElementById("time-item-" + index).children[0].style.color = "black";
                    document.getElementById("photo-input-" + index).disabled = false;
                    document.getElementById("url-" + index).disabled = false;
                   // }
                }

                //document.getElementById("second-item-" + i).style.backgroundColor = "rgba(0, 171, 74, 1)";
                this.setState({
                    anchor: listNum,
                    buffer: tempArr
                });

            }

        }else{

            if(this.state.buffer.includes(this.state.times[listNum])){//this.state.second == i){
                            
                for(i = 0; i < this.state.times.length; i++){
                    document.getElementById("time-item-" + i).style.backgroundColor = "rgba(99, 0, 0, 1)";
                    document.getElementById("time-item-" + i).children[0].style.color = "white";
                    document.getElementById("photo-input-" + i).disabled = true;
                    document.getElementById("url-" + i).disabled = true;
                }
                
                document.getElementById("time-item-" + listNum).style.backgroundColor = "rgba(99, 0, 0, 1)";
                document.getElementById("time-item-" + listNum).children[0].style.color = "white";
                document.getElementById("photo-input-" + listNum).disabled = true;
                document.getElementById("url-" + listNum).disabled = true;
                this.setState({
                    anchor: i,
                    buffer: []
                });
            }else{

                for(i = 0; i < this.state.times.length; i++){
                    document.getElementById("time-item-" + i).style.backgroundColor = "rgba(99, 0, 0, 1)";
                    document.getElementById("time-item-" + i).children[0].style.color = "white";
                    document.getElementById("photo-input-" + i).disabled = true;
                    document.getElementById("url-" + i).disabled = true;
                }
                
                var tempArr = [this.state.times[listNum]];

                document.getElementById("time-item-" + listNum).style.backgroundColor = "rgba(252, 219, 3, 1)";
                document.getElementById("time-item-" + listNum).children[0].style.color = "black";
                document.getElementById("photo-input-" + listNum).disabled = false;
                document.getElementById("url-" + listNum).disabled = false;
                
                this.setState({
                    anchor: listNum,
                    buffer: tempArr
                });
        }

        }

        this.checkRowsFilled();

    }

    checkRowsFilled(){
        var i;
        var currTime;
        var currImg;
        var currURL

        for(i = 0; i < this.state.times.length; i++){
            currTime = document.getElementById("time-item-" + i);
            currImg = document.getElementById("label-" + i);
            currURL = document.getElementById("url-" + i);

            if(currImg.textContent.localeCompare("Choose a photo...") != 0 && currURL.value.localeCompare("Enter a URL...") != 0 && this.state.buffer.indexOf(this.state.times[i]) == -1){
                currTime.style.background = "rgba(0, 122, 31, 1)";
                currTime.children[0].style.color = "black";
            }
        }

    }

    cloneToSelected(e){
        var urlInput = e.target;
        var i;

        for(i = 0; i < this.state.buffer.length; i++){
            var index = this.state.times.indexOf(this.state.buffer[i]);
            document.getElementById("url-" + index).value = urlInput.value;
        }


    }

    onKeyDown(e){
        if(e.key.localeCompare("Shift") == 0){
            this.setState({
                shiftIsPressed: true
            });
        }else if(e.key.localeCompare("Control") == 0){
            this.setState({
                controlIsPressed: true
            });
        }
    }

    onKeyUp(e){
        if(e.key.localeCompare("Shift") == 0){
            this.setState({
                shiftIsPressed: false
            });
        }else if(e.key.localeCompare("Control") == 0){
            this.setState({
                controlIsPressed: false
            });
        }
    }

    render(){

        var flag = '2';

        return(

            <Fragment>

                <div id="mySidenav" className="sidenav">
                        <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                        <Link to="/">
                            <a href="#">Home</a>
                       </Link>
                       <Link to="/about">
                            <a href="#">About</a>
                        </Link>
                        <Link to="/contact">
                            <a href="#">Contact</a>
                        </Link>
                        <Link to="/terms">
                            <a href="#">Terms and Conditions</a>
                        </Link>
                </div>

                    <div id="wrapper-upload">
                        <div id="top-container-upload">

                            <HamburgerMenu flag="P" wrapperID="wrapper-upload" />

                            <div id="title-root-upload">
                                <h1 id="main-title-upload">MIDMICHIGAN SECONDS</h1> 
                            </div>

                            <div id="logo-root-upload">
                                <header id="logo-upload"></header>
                            </div>

                        </div>

                        <TransparentMenu />

                        <Timeline flag={flag} />

                        <div id="upload-area">

                        </div>

                        <div id="button-area-upload">

                        <Link to="/picktime">
                            <button id="back-button-upload">Back</button>
                        </Link>

                        
                        <button id="checkout-button-upload" onClick={(e) => {this.collectURLS(); this.checkConditions(e);}}>Checkout</button>
                            
                        </div>


                    </div>

            </Fragment>
        );
    }
}

export default Upload;


//"react-router-dom": "^6.0.0-alpha.1",
//<Link to={{pathname: this.state.meetsConditions == 1 ? "/checkout" : "javascript:void(0)", state: {times: this.state.times, url: this.state.url, selectedFiles: this.state.selectedFiles}}} onClick={this.checkConditions.bind(this)}>
//<button id="checkout-button-upload" onClick={this.collectURLS}>Checkout</button>
//</Link>

/*{ 
                            this.state.meetsConditions == 0
                            ? <Link to={{pathname: "/", state: {times: this.state.times, url: this.state.url, selectedFiles: this.state.selectedFiles}}} onClick={this.checkConditions.bind(this)}><button id="checkout-button-upload" onClick={this.collectURLS}>Checkout</button></Link>
                            : <Link to={{pathname: "/checkout", state: {times: this.state.times, url: this.state.url, selectedFiles: this.state.selectedFiles}}} className="notDisabled"><button id="checkout-button-upload" onClick={this.collectURLS}>Checkout</button></Link>
                        }*/