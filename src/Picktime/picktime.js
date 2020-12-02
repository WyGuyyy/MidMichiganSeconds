import React, { Fragment } from 'react';
import HamburgerMenu from './hamburger';
import Timeline from './timeline';
import TransparentMenu from './transparentMenu';
import './picktime.css'; 
import { Link } from 'react-router-dom';

class PickTime extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            ampmFlag: "",
            hour: -1,
            minute: -1,
            //second: -1,
            second: [],
            //selCount: 0,
           // selected: "",
            times: [],
            availableSeconds: new Array(60),
            toRemoveTimes: [],
            token: "",
            shiftIsPressed: false,
            controlIsPressed: false,
            anchorValue: -1,
            selAnchorValue: -1
          };

          this.fetchToken();

    }
    
    componentDidMount(){
        this.fillHours();
        this.fillMinutes();
        this.fillSeconds();
        this.fillSelected();
        this.initializeSeconds();

        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);

        document.addEventListener("keydown", this.onKeyDown, false);
        document.addEventListener("keyup", this.onKeyUp, false);

        //const { times } = this.props.location.state;
    }

    componentDidUpdate(){
        //this.fillSelected();
    }

    componentWillUnmount(){
        
    }

    async fetchToken(){

        var tempToken = "";
        var secretKey = "";

        //await fetch("https://localhost:8443/api/authenticate/secret"  , { 
        await fetch("http://192.168.1.10:8080/api/authenticate/secret"  , { 
            method: "GET",                      
            headers: {
                "Content-Type": "application/json"
                }
            })
            .then(res => res.text())
            .then(
                (text) => {
                    secretKey = text;
                    console.log(secretKey);
                }
            )
            .catch(console.log);


        //await fetch("https://localhost:8443/api/authenticate"  , { 
            await fetch("http://192.168.1.10:8080/api/authenticate"  , {
                method: "POST",
                body: JSON.stringify({apiKey: secretKey}),                          
                headers: {
                    "Content-Type": "application/json"
                    }
                })
                .then(res => res.text())
                .then(
                    (text) => {

                        var result = text.length ? JSON.parse(text) : {};

                        tempToken = result.token;
                         console.log(tempToken);

                         this.setState({
                             token: tempToken
                         });

                    }
                )
                .catch(console.log);

}

    initializeSeconds(){
        this.state.availableSeconds.fill(1);
    }

    fillHours(){
        var i;

        var hourList = document.getElementById("menu-hour");

        var first = hourList.firstElementChild;

        while(first){
            first.remove();
            first = hourList.firstElementChild;
        }

        
        for(i = 0; i < 12; i++){
            var aTag = document.createElement('a');
            aTag.innerHTML = (i + 1);
            aTag.style.color = "rgba(89, 89, 89, 1)";
            aTag.style.backgroundColor = "black";
            aTag.style.padding = "2px";
            aTag.style.fontSize = "33px";
            aTag.style.cursor = "context-menu";
            aTag.id = "hour-item-" + i;
            aTag.onclick = (e) => this.hourClick(e);
            //Add onClick here and pass id

            hourList.appendChild(aTag);
        }
    
    }

    fillMinutes(){
        var i;

        var minuteList = document.getElementById("menu-minute");

        var first = minuteList.firstElementChild;

        while(first){
            first.remove();
            first = minuteList.firstElementChild;
        }

        for(i = 0; i < 60; i++){
            var aTag = document.createElement('a');
            aTag.innerHTML = i;

            aTag.style.color = "rgba(89, 89, 89, 1)";
            aTag.style.backgroundColor = "black";
            aTag.style.padding = "2px";
            aTag.style.fontSize = "33px";
            aTag.style.cursor = "context-menu";
            aTag.id = "minute-item-" + i;
            aTag.onclick = (e) => this.minuteClick(e);

            minuteList.appendChild(aTag);
        }
    }

    fillSeconds(){
        var i;

        var secondList = document.getElementById("menu-second");

        var first = secondList.firstElementChild;

        while(first){
            first.remove();
            first = secondList.firstElementChild;
        }

        for(i = 0; i < 60; i++){
            var aTag = document.createElement('a');
            aTag.innerHTML = i;
            aTag.style.color = "rgba(89, 89, 89, 1)";
            aTag.style.backgroundColor = "black";
            aTag.style.padding = "2px";
            aTag.style.fontSize = "33px";
            aTag.style.cursor = "context-menu";
            aTag.id = "second-item-" + i;
            aTag.onclick = (e) => this.secondClick(e);

            secondList.appendChild(aTag);
        }
    }

    fillSelected(){
        var i;

        var selectedList = document.getElementById("selected-times");

        var first = selectedList.firstElementChild;

        while(first){
            first.remove();
            first = selectedList.firstElementChild;
        }

        for(i = 0; i < this.state.times.length; i++){
            var aTag = document.createElement('a');
            aTag.className = "selected-list-item";
            aTag.innerHTML = this.state.times[i];

            if(this.state.toRemoveTimes.includes(this.state.times[i])){
                aTag.style.color = "white";
                aTag.style.backgroundColor = "rgba(0, 171, 74, 1)";
            }else{
                aTag.style.color = "white";
                aTag.style.backgroundColor = "black";
            }

            aTag.style.padding = "2px";
            aTag.style.fontSize = "33px";
            aTag.style.cursor = "context-menu";
            aTag.id = "selected-item-" + i;
            aTag.onclick = (e) => this.selectedClick(e);

            selectedList.appendChild(aTag);
        }
    }

    chooseAMPM(flag){
        if(flag == 1){
            document.getElementById("am-button").style.backgroundColor = "rgb(163, 255, 166)"; 
            document.getElementById("pm-button").style.backgroundColor = "rgb(0, 150, 37)";
            this.setState({
                ampmFlag: "AM"
            },
            this.checkAMPMRefresh
            );
        }else{
            document.getElementById("am-button").style.backgroundColor = "rgb(0, 150, 37)";
            document.getElementById("pm-button").style.backgroundColor = "rgb(163, 255, 166)";
            this.setState({
                ampmFlag: "PM",
                
            },
            this.checkAMPMRefresh
            );
        }

    }

    checkAMPMRefresh(){

        var i;

        for(i=0; i < 12; i++){
            var aTag = document.getElementById("hour-item-" + i);
            aTag.style.color = "white";
            aTag.style.backgroundColor = "black";
        }

        this.fillMinutes();
        this.fillSeconds();

        this.setState({
            hour: -1,
            minute: -1,
            second: []
        });

        /*if(this.state.ampmFlag.localeCompare("") == 0){
            this.fillHours();
            
        }else{

            var i;

            for(i=0; i < 12; i++){
                var aTag = document.getElementById("hour-item-" + i).style.color = "white";
            }
            
        }*/
    }

    hourClick(event){
        var i = 0;
        var id = event.target.id;

        if(!this.state.ampmFlag.localeCompare("") == 0){
            for(i = 0; i < 12; i++){
                if(id.localeCompare("hour-item-" + i) == 0){

                    if(this.state.hour == i){
                        document.getElementById("hour-item-" + i).style.backgroundColor = "black";
                        this.setState({
                            hour: -1
                        },
                        this.checkHourRefresh
                        );
                    }else{
                    document.getElementById("hour-item-" + i).style.backgroundColor = "rgba(0, 171, 74, 1)";
                    this.setState({
                        hour: i
                    },
                    this.checkHourRefresh
                    );
                }

                }else{
                    document.getElementById("hour-item-" + i).style.backgroundColor = "black";
                }
            }
        }

    }

    checkHourRefresh(){

        if(this.state.hour == -1){
            this.fillMinutes();
        }else{
            var i;

            for(i = 0; i < 60; i++){
                var aTag = document.getElementById('minute-item-' + i);
                aTag.style.color = "white";
                aTag.style.backgroundColor = "black";
            }
        }

        this.fillSeconds();

        this.setState({
            minute: -1,
            second: []
        });
    }

    minuteClick(event){
        var i = 0;
        var id = event.target.id;

        if(!(this.state.hour == -1)){
            for(i = 0; i < 60; i++){
                if(id.localeCompare("minute-item-" + i) == 0){

                    if(this.state.minute == i){
                        document.getElementById("minute-item-" + i).style.backgroundColor = "black";
                        this.setState({
                            minute: -1
                        },
                        this.checkMinuteRefresh
                        );
                    }else{
                    document.getElementById("minute-item-" + i).style.backgroundColor = "rgba(0, 171, 74, 1)";
                    this.setState({
                        minute: i
                    },
                    this.checkMinuteRefresh
                    );
                }

                }else{
                    document.getElementById("minute-item-" + i).style.backgroundColor = "black";
                }
            }
        }
    }

    checkMinuteRefresh = async () => {
        var itemCount;
        var token = this.state.token;

        this.fillSeconds();

        if(this.state.minute == -1){
            
        }else{
            var tempArr = this.state.availableSeconds;

            var ampm = this.state.ampmFlag;
            //var newTime = (((this.state.hour) < 9 ? "0" + (this.state.hour + 1) : this.state.hour + 1) + ":" + ((this.state.minute) < 9 ? "0" + (this.state.minute) : this.state.minute) + ":" + ((this.state.second) < 9 ? "0" + (this.state.second) : this.state.second) + " " + this.state.ampmFlag);
            var hour = (this.state.hour < 9 ? "0" + (this.state.hour + 1) : this.state.hour + 1);
            var minute = (this.state.minute <= 9 ? "0" + (this.state.minute) : this.state.minute);
            
            //await fetch("https://localhost:8443/api/content/" + ampm + "/" + hour + "/" + minute  , {
            await fetch("http://192.168.1.10:8080/api/content/" + ampm + "/" + hour + "/" + minute  , {  
                method: "GET",                          
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token}
                })
                .then(res => res.text())
                .then(
                    (text) => {

                        var result = text.length ? JSON.parse(text) : {};

                        var count;
                        tempArr.fill(1);

                        for(count = 0; count < result.length; count++){
                            var second = parseInt(result[count].second);
                            tempArr[second] = 0;
                        }

                    }
                )
                .catch(console.log);

                for(itemCount = 0; itemCount < 60; itemCount++){

                    var hour = (this.state.hour < 9 ? "0" + (this.state.hour + 1) : this.state.hour + 1);
                    var minute = (this.state.minute <= 9 ? "0" + (this.state.minute) : this.state.minute);
                    var second = (itemCount <= 9 ? "0" + (itemCount) : itemCount);
                    var ampm = this.state.ampmFlag;
                    var time = hour + ":" + minute + ":" + second + " " + ampm;
                    var isPicked = (this.state.times.includes(time) ? 1 : 0);

                    if(tempArr[itemCount] == 1 && isPicked == 0){
                        console.log(time);
                        document.getElementById("second-item-" + itemCount).style.color = "white";
                    }
                }

                this.setState({
                    availableSeconds: tempArr,
                    second: []
                });
            
        }
    }

    secondClick(event){
        var i = 0;
        var j = 0;
        var id = event.target.id;

        var index = id.split("-")[2];

        if(this.state.availableSeconds[index] == 1 && !(this.state.minute == -1) && !this.isSelected(index)){
            for(i = 0; i < 60; i++){
                if(id.localeCompare("second-item-" + i) == 0){

                    if(this.state.shiftIsPressed){ //Shift pressed
                        
                        if(this.state.second.length == 0){

                            document.getElementById("second-item-" + i).style.backgroundColor = "rgba(0, 171, 74, 1)";

                            this.setState({
                                anchorValue: i,
                                second: [i]
                            });
                        }else{
                            var splitArr = id.split("-");
                            var idNum = parseInt(splitArr[2]);
                            var tempArr = [];

                            for(j = 0; j < this.state.second.length; j++){
                                document.getElementById("second-item-" + this.state.second[j]).style.backgroundColor = "black";
                            }

                            if(idNum < this.state.anchorValue){
                                for(j = this.state.anchorValue; j >= idNum; j--){
                                    tempArr[tempArr.length] = j;
                                    document.getElementById("second-item-" + j).style.backgroundColor = "rgba(0, 171, 74, 1)";
                                    
                                    /*alert("hi");
                                    if(tempArr.includes(j)){
                                        var k = 0;
                                        for(k = 0; k < tempArr.length; k++){
                                            if(tempArr[k] == j){
                                                tempArr.splice(k, 1);
                                                document.getElementById("second-item-" + j).style.backgroundColor = "rgba(0, 171, 74, 1)";
                                                break;
                                            }
                                        }
                                    }else{
                                        tempArr[tempArr.length] = j;
                                        document.getElementById("second-item-" + i).style.backgroundColor = "rgba(0, 171, 74, 1)";
                                    }*/
                                }
                                this.setState({
                                    second: tempArr
                                });
                            }else{
                                for(j = this.state.anchorValue; j <= idNum; j++){
                                    tempArr[tempArr.length] = j;
                                    document.getElementById("second-item-" + j).style.backgroundColor = "rgba(0, 171, 74, 1)";
                                    
                                    /*alert("hi");
                                    if(tempArr.includes(j)){
                                        var k = 0;
                                        for(k = 0; k < tempArr.length; k++){
                                            if(tempArr[k] == j){
                                                tempArr.splice(k, 1);
                                                document.getElementById("second-item-" + j).style.backgroundColor = "rgba(0, 171, 74, 1)";
                                                break;
                                            }
                                        }
                                    }else{
                                        tempArr[tempArr.length] = j;
                                        document.getElementById("second-item-" + i).style.backgroundColor = "rgba(0, 171, 74, 1)";
                                    }*/
                                }
                                this.setState({
                                    second: tempArr
                                });
                            }
                        }

                    }else if(this.state.controlIsPressed){ //Control pressed

                        if(this.state.second.includes(i)){//this.state.second == i){

                            var tempArr;

                            for(j = 0; j < this.state.second.length; j++){
                                if(this.state.second[j] == i){
                                    tempArr = this.state.second;
                                    tempArr.splice(j, 1);
                                }
                            }
                            
                            document.getElementById("second-item-" + i).style.backgroundColor = "black";

                            for(j = 0; j < tempArr.length; j++){
                                document.getElementById("second-item-" + tempArr[j]).style.backgroundColor = "rgba(0, 171, 74, 1)";
                            }

                            this.setState({
                                second: tempArr,
                                anchorValue: i
                            });
                        }else{ //Start here next time.. need to finish multi select with control.. then move onto shift

                            for(j = 0; j < this.state.second.length; j++){
                                document.getElementById("second-item-" + this.state.second[j]).style.backgroundColor = "black";
                            }
                            
                            var tempArr = this.state.second;
                            tempArr[tempArr.length] = i;

                            for( j = 0; j < tempArr.length; j++){
                                document.getElementById("second-item-" + tempArr[j]).style.backgroundColor = "rgba(0, 171, 74, 1)";
                            }

                            //document.getElementById("second-item-" + i).style.backgroundColor = "rgba(0, 171, 74, 1)";
                            this.setState({
                                second: tempArr,
                                anchorValue: i
                            });
                    }

                    }else{ //Neither pressed

                        if(this.state.second.includes(i)){//this.state.second == i){
                            
                            for(j = 0; j < this.state.second.length; j++){
                                document.getElementById("second-item-" + this.state.second[j]).style.backgroundColor = "black";
                            }
                            
                            document.getElementById("second-item-" + i).style.backgroundColor = "black";
                            this.setState({
                                second: [],
                                anchorValue: i
                            });
                        }else{

                        for(j = 0; j < this.state.second.length; j++){
                            document.getElementById("second-item-" + this.state.second[j]).style.backgroundColor = "black";
                        }
                        
                        var tempArr = [i];

                        document.getElementById("second-item-" + i).style.backgroundColor = "rgba(0, 171, 74, 1)";
                        this.setState({
                            second: tempArr,
                            anchorValue: i
                        });
                    }

                }

                    }else{
                        //document.getElementById("second-item-" + i).style.backgroundColor = "black";
                    }
            }
        }
    }

    selectedClick(event){

        //alert("part1");

        var i = 0;
        var j = 0;
        var id = event.target.id;

        var size = this.state.times.length;

        for(i = 0; i < this.state.times.length; i++){
            
            if(event.target.innerHTML.localeCompare(this.state.times[i]) == 0){

                if(this.state.shiftIsPressed){ //Shift pressed

                                
                    if(this.state.toRemoveTimes.length == 0){

                        var selItem = document.getElementById("selected-item-" + i);
                        selItem.style.backgroundColor = "rgba(0, 171, 74, 1)";

                        //alert("intruder");

                        this.setState({
                            selAnchorValue: i,
                            toRemoveTimes: [selItem.innerHTML]
                        });

                    }else{
                        var splitArr = id.split("-");
                        var idNum = parseInt(splitArr[2]);
                        var tempArr = [];

                        for(j = 0; j < this.state.times.length; j++){
                            document.getElementById("selected-item-" + j).style.backgroundColor = "black";
                        }

                        if(idNum < this.state.selAnchorValue){
                            for(j = this.state.selAnchorValue; j >= idNum; j--){
                                var selItem = document.getElementById("selected-item-" + j);
                                tempArr[tempArr.length] = selItem.innerHTML;
                                selItem.style.backgroundColor = "rgba(0, 171, 74, 1)";
                                
                                /*alert("hi");
                                if(tempArr.includes(j)){
                                    var k = 0;
                                    for(k = 0; k < tempArr.length; k++){
                                        if(tempArr[k] == j){
                                            tempArr.splice(k, 1);
                                            document.getElementById("second-item-" + j).style.backgroundColor = "rgba(0, 171, 74, 1)";
                                            break;
                                        }
                                    }
                                }else{
                                    tempArr[tempArr.length] = j;
                                    document.getElementById("second-item-" + i).style.backgroundColor = "rgba(0, 171, 74, 1)";
                                }*/
                            }
                            this.setState({
                                toRemoveTimes: tempArr
                            });
                        }else{
                            for(j = this.state.selAnchorValue; j <= idNum; j++){
                               
                                var selItem = document.getElementById("selected-item-" + j);
                                tempArr[tempArr.length] = selItem.innerHTML;
                                selItem.style.backgroundColor = "rgba(0, 171, 74, 1)";
                                
                                /*alert("hi");
                                if(tempArr.includes(j)){
                                    var k = 0;
                                    for(k = 0; k < tempArr.length; k++){
                                        if(tempArr[k] == j){
                                            tempArr.splice(k, 1);
                                            document.getElementById("second-item-" + j).style.backgroundColor = "rgba(0, 171, 74, 1)";
                                            break;
                                        }
                                    }
                                }else{
                                    tempArr[tempArr.length] = j;
                                    document.getElementById("second-item-" + i).style.backgroundColor = "rgba(0, 171, 74, 1)";
                                }*/
                            }
                            this.setState({
                                toRemoveTimes: tempArr
                            });
                        }
                    }

                }else if(this.state.controlIsPressed){
                    
                    

                    if(this.state.toRemoveTimes.includes(this.state.times[i])){//this.state.second == i){

                        var tempArr;

                        for(j = 0; j < this.state.toRemoveTimes.length; j++){
                            if(this.state.toRemoveTimes[j] == document.getElementById("selected-item-" + i).innerHTML){
                                tempArr = this.state.toRemoveTimes;
                                tempArr.splice(j, 1);
                            }
                        }
                        
                        document.getElementById("selected-item-" + i).style.backgroundColor = "black";

                        for(j = 0; j < tempArr.length; j++){
                            if(this.state.times.includes(tempArr[j])){
                                var index = this.state.times.indexOf(tempArr[j]);
                                document.getElementById("selected-item-" + index).style.backgroundColor = "rgba(0, 171, 74, 1)";
                            }
                        }

                        this.setState({
                            selAnchorValue: i,
                            toRemoveTimes: tempArr
                        });
                    }else{ //Start here next time.. need to finish multi select with control.. then move onto shift

                        for(j = 0; j < this.state.times.length; j++){
                            document.getElementById("selected-item-" + j).style.backgroundColor = "black";
                        }
                        var tempArr = this.state.toRemoveTimes;
                        tempArr[tempArr.length] = this.state.times[i];

                        for( j = 0; j < tempArr.length; j++){
                            if(this.state.times.includes(tempArr[j])){
                                var index = this.state.times.indexOf(tempArr[j]);
                                document.getElementById("selected-item-" + index).style.backgroundColor = "rgba(0, 171, 74, 1)";
                            }
                        }

                        //document.getElementById("second-item-" + i).style.backgroundColor = "rgba(0, 171, 74, 1)";
                        this.setState({
                            selAnchorValue: i,
                            toRemoveTimes: tempArr
                        });
                }
                }else{

                    if(this.state.toRemoveTimes.includes(this.state.times[i])){//this.state.second == i){
                            
                        for(j = 0; j < this.state.times.length; j++){
                            document.getElementById("selected-item-" + j).style.backgroundColor = "black";
                        }
                        
                        document.getElementById("selected-item-" + i).style.backgroundColor = "black";
                        this.setState({
                            selAnchorValue: i,
                            toRemoveTimes: []
                        });
                    }else{

                        for(j = 0; j < this.state.times.length; j++){
                            document.getElementById("selected-item-" + j).style.backgroundColor = "black";
                        }
                        
                        var tempArr = [this.state.times[i]];

                        document.getElementById("selected-item-" + i).style.backgroundColor = "rgba(0, 171, 74, 1)";
                        this.setState({
                            selAnchorValue: i,
                            toRemoveTimes: tempArr
                        });
                }

                }
                break;
        }

    }

        /*for(i = 0; i < size; i++){
            if(id.localeCompare("selected-ite m-" + i) == 0){

                if(this.state.selected.localeCompare(event.target.innerHTML) == 0){
                    document.getElementById("selected-item-" + i).style.backgroundColor = "black";
                    this.setState({
                        selected: ""
                    });
                }else{
                document.getElementById("selected-item-" + i).style.backgroundColor = "rgba(0, 171, 74, 1)";
                this.setState({
                    selected: event.target.innerHTML
                });
            }

            }else{
                document.getElementById("selected-item-" + i).style.backgroundColor = "black";
            }
        }*/

        this.fillSelected();

    }

    closeNav(){
        document.getElementById("mySidenav").style.width = "0";
    }


    /*addTime(){
        var i;
        var price;
        var time;

        var selList = document.getElementById("selected-times");

        if(!(this.state.hour == -1) && !(this.state.minute == -1) && !(this.state.second == -1)){
            var aTag = document.createElement('a');

            time = (((this.state.hour) < 9 ? "0" + (this.state.hour + 1) : this.state.hour + 1) + ":" + ((this.state.minute) < 9 ? "0" + (this.state.minute + 1) : this.state.minute + 1) + ":" + ((this.state.second) < 9 ? "0" + (this.state.second + 1) : this.state.second + 1) + " " + this.state.ampmFlag);

            aTag.innerHTML = time;
            aTag.style.color = "white";
            aTag.style.backgroundColor = "black";
            aTag.style.padding = "2px";
            aTag.style.fontSize = "33px";
            aTag.id = "selected-item-" + this.state.selCount;
            aTag.onclick = (e) => this.selectedClick(e);
            //aTag.onclick = (e) => this.minuteClick(e);

            document.getElementById("second-item-" + this.state.second).style.backgroundColor = "black";
            document.getElementById("minute-item-" + this.state.minute).style.backgroundColor = "black";
            document.getElementById("hour-item-" + this.state.hour).style.backgroundColor = "black";
            document.getElementById("am-button").style.backgroundColor = "rgb(163, 255, 166)"; 
            document.getElementById("pm-button").style.backgroundColor = "rgb(0, 150, 37)";

            i = this.state.selCount;

            this.setState({
                ampmFlag: "AM",
                hour: -1,
                minute: -1,
                second: -1,
                selCount: (i + 1),
                times: this.state.times.concat([time])
              });

            document.getElementById("total-price").innerHTML = "Total Price: " + i + 1;
            selList.appendChild(aTag);
        }else{s
            //Add message box here or something for part of time not selected?
        }

    }*/

    addTime(){ //HERE NEED TO MODIFY HOW TIMES ARE ADDED - MULTIPLE SECONDS CAN BE ADDED NOW

            var i;
            var j;
            var tempTimes = this.state.times;

            if(!(this.state.hour == -1) && !(this.state.minute == -1) && !(this.state.second.length == null)){
                
                for(i = 0; i < this.state.second.length; i++){
            
                    tempTimes[tempTimes.length] = (((this.state.hour) < 9 ? "0" + (this.state.hour + 1) : this.state.hour + 1) + ":" + ((this.state.minute) <= 9 ? "0" + (this.state.minute) : this.state.minute) + ":" + ((this.state.second[i]) <= 9 ? "0" + (this.state.second[i]) : this.state.second[i]) + " " + this.state.ampmFlag);

                    document.getElementById("second-item-" + this.state.second[i]).style.backgroundColor = "black";
                    document.getElementById("minute-item-" + this.state.minute).style.backgroundColor = "black";
                    document.getElementById("hour-item-" + this.state.hour).style.backgroundColor = "black";
                    document.getElementById("am-button").style.backgroundColor = "rgb(0, 150, 37)";//"rgb(163, 255, 166)"; 
                    document.getElementById("pm-button").style.backgroundColor = "rgb(0, 150, 37)";

            }

            document.getElementById("total-price").innerHTML = "Total Price: $" + (tempTimes.length);

            this.setState({
                ampmFlag: "",
                hour: -1,
                minute: -1,
                second: [],
                //selCount: tempTimes.length,
                times: tempTimes
            });

            this.fillSeconds();
            this.fillMinutes();

            for(j = 0; j < 12; j++){
                var aTag = document.getElementById("hour-item-" + j);

                aTag.style.color = "rgba(89, 89, 89, 1)";
                aTag.style.backgroundColor = "black";
            }

            this.fillSelected();

            }else{
                alert("The hour, minute, and second fields must all be selected to add a time! Please ensure a value is chosen for each.");
        }

    }

    removeTime(){
        var i;
        var selCount;
        var count;
        var price;
        var tempTimes;

        var selList = document.getElementById("selected-times");

        if(!this.state.toRemoveTimes.length == 0){
            tempTimes = this.state.times;
            for(selCount = 0; selCount < this.state.toRemoveTimes.length; selCount++){
                i = this.state.times.indexOf(this.state.toRemoveTimes[selCount]);

                tempTimes.splice(i, 1); //START HERE NEXT TIME.. NEED TO WORK ON REMOVING TIMES IN BATCHES
            }

            //count = this.state.times.length;

            this.setState({
                //selected: "",
                times: tempTimes,
                toRemoveTimes: []
                //selCount: (count - 1)
            });

            document.getElementById("total-price").innerHTML = "Total Price: $" + (tempTimes.length)

            this.fillSelected();
            this.checkAMPMRefresh();

        }else{
            alert("No time selected! Please select a time to remove.");
        }

    }

    isSelected(item){
        var hour = (this.state.hour < 9 ? "0" + (this.state.hour + 1) : this.state.hour + 1);
        var minute = (this.state.minute <= 9 ? "0" + (this.state.minute) : this.state.minute);
        var second = (parseInt(item) <= 9 ? "0" + (parseInt(item)) : parseInt(item));
        var ampm = this.state.ampmFlag;

        var time = hour + ":" + minute + ":" + second + " " + ampm;

        return this.state.times.includes(time);
        
    }

    check(event){

        if(this.state.times.length > 0){
            this.props.history.push({
                pathname: "/upload",
                state: {times: this.state.times, token: this.state.token}
            });
        }else{
            alert("You have not selected any times. Please select at least one time to purchase before continuing.");
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

        var flag = '1';
        var hamFlag = 'P';

        return(

            <Fragment >

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

                    <div id="wrapper-picktime">
                        
                        <div id="top-container">

                            <HamburgerMenu flag={hamFlag} wrapperID="wrapper-picktime" />

                            <div id="title-root-picktime">
                                <h1 id="main-title-picktime">MIDMICHIGAN SECONDS</h1> 
                            </div>

                            <div id="logo-root-picktime">
                                <header id="logo-picktime"></header>
                            </div>
                        
                        </div>

                        <TransparentMenu />

                        <Timeline flag={flag}/>

                        <div id="timepicker-root">

                            <div id="pick-side">
                                <div id="am-or-pm">
                                    <button id="am-button" onClick={() => this.chooseAMPM(1)}>AM</button>
                                    <p>or</p>
                                    <button id="pm-button" onClick={() => this.chooseAMPM(2)}>PM</button>
                                </div>

                                <div id="hour-menu-area">
                                    <h2>Hour</h2>
                                    <div id="menu-hour"></div>
                                </div>

                                <div id="minute-menu-area">
                                    <h2>Minute</h2>
                                    <div id="menu-minute"></div> 
                                </div>

                                <div id="second-menu-area">
                                    <h2>Second</h2> 
                                    <div id="menu-second"></div>
                                </div>

                                <button id="add-button-picktime" onClick={() => this.addTime()}>Add</button>  
                                <button id="remove-button-picktime" onClick={() => this.removeTime()}>Remove</button>

                            </div>

                            <div id="result-side">
                                
                                <h1>Your Times</h1>
                                <div id="selected-times"></div>
                                <h2 id="total-price">Total Price:</h2>

                                <button id="continue-button-picktime" onClick={(e) => this.check(e)}>Continue</button>  
                                
                            </div>

                        </div>

                    </div>

            </Fragment>

        );
    }
}

export default PickTime;

