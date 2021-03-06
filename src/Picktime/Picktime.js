import React from 'react';
import ReactDOM from "react-dom"
import './Picktime.css';
import Header from "../Header/Header"
import Popout from '../Popout/Popout';
import Dropdown from './Dropdown';
import Timeline from '../Timeline/Timeline';
import {getUsedSeconds} from '../Services/ContentService';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

class Picktime extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            ampm: "AM",
            hour: -1,
            minute: -1,
            seconds: [],
            times: [],
            focusedTimes: [],
            timePivot: -1,
            available: [],
            ctrl: false,
            shift: false,
            pivot: -1
        };

    }
    
    componentDidMount(){ 
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);

        document.addEventListener("keydown", this.onKeyDown, false);
        document.addEventListener("keyup", this.onKeyUp, false);

        this.fillTimes();
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

    produceHourArray(){
        var hourArr = [];
        var count = 0;

        for(count = 0; count < 12; count++){
            hourArr.push({value: count, active: true});
        }

        return hourArr;
    }

    produceMinuteArray(){
        var minuteArr = [];
        var count = 0;

        for(count = 0; count < 60; count++){
            minuteArr.push({value: count, active: true});
        }

        return minuteArr;
    }

    getSeconds(){
        var availableArr = [];
        var count = 0;

        var ampm = this.state.ampm;
        var hour = this.state.hour;
        var minute = this.state.minute;

        var data = getUsedSeconds(ampm, hour, minute);
        
        return data;
    }

    getSelected(){
        var selectedTimes = this.state.times;
        var count = 0;

        var selectedItems = [];

        for(count = 0; count < selectedTimes.length; count++){
            var timeArr = selectedTimes[count].split(":");
            var hour = timeArr[0];
            var minute = timeArr[1];
            var second = timeArr[2].split(" ")[0];
            var ampm = timeArr[2].split(" ")[1];

            var currHour = (this.state.hour <= 9 ? "0" + this.state.hour : this.state.hour);
            var currMinute = (this.state.minute <= 9 ? "0" + this.state.minute : this.state.minute);
            var currAMPM = this.state.ampm;

            if(hour.localeCompare(currHour) === 0 && minute.localeCompare(currMinute) === 0 && ampm.localeCompare(currAMPM) === 0){
                selectedItems.push(parseInt(second));
            }
        }

        return selectedItems;
    }

    fillTimes(){

        var selectedList = document.getElementsByClassName("Picktime-Selected-List")[0];
        var times = this.state.times;

        var listItem = "";
        var listItemText = "";

        var count = 0;

        while(selectedList.lastElementChild){
            selectedList.removeChild(selectedList.lastElementChild);
        }

        for(count = 0; count < times.length; count++){
            
            listItem = document.createElement("div");
            listItemText = document.createElement("h2");

            listItem.onclick = e => this.focusTimes(e);

            listItem.id = "Selected-" + count;
            listItemText.id = "Text-Selected-" + count;

            listItem.classList.add("Picktime-Selected-Item");
            listItemText.classList.add("Picktime-Selected-Item-Text");

            listItemText.textContent = times[count];

            listItem.appendChild(listItemText);
            selectedList.appendChild(listItem);

        }

    }

    addTimes(event){

        var ampm = this.state.ampm;
        var hour = (this.state.hour <= 9 ? "0" + this.state.hour : "" + this.state.hour);
        var minute = (this.state.minute <= 9 ? "0" + this.state.minute : "" + this.state.minute);
        var seconds = this.state.seconds;

        var time = "";
        var timesArr = this.state.times;
        var currSecond = 0;
        var count = 0;

        var selectedList = document.getElementsByClassName("Picktime-Selected-List")[0];
        var listItem = "";
        var listItemText = "";

        for(count = 0; count < seconds.length; count++){
            currSecond = (seconds[count] <= 9 ? "0" + seconds[count] : "" + seconds[count]);
            time = hour + ":" + minute + ":" + currSecond + " " + ampm;

            timesArr.push(time);

            document.getElementById("Second-" + seconds[count]).style.background = "rgb(0, 0, 0)";
        }

        document.getElementById("Minute-" + this.state.minute).style.background = "rgb(0, 0, 0)";
        document.getElementById("Hour-" + (this.state.hour - 1)).style.background = "rgb(0, 0, 0)";

        this.setState({
            hour: -1,
            minute: -1,
            seconds: [],
            times: timesArr
        });

        this.fillTimes();

    }

    focusTimes(event){

        var id = event.target.id.replace("Text-", "");

        if(id.localeCompare("") === 0){
            return;
        }

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

        var idNum = parseInt(splitArr[1]);
        var newFocusedTimes = [];
        var times = this.state.times;
        var timePivot = this.state.timePivot;

        var count = 0;

        if(timePivot === -1){

            for(count = 0; count <= idNum; count++){
                document.getElementById("Selected-" + count).style.background = "rgb(97, 183, 226)";
                document.getElementById("Text-Selected-" + count).style.color = "rgb(0, 0, 0)";
                var aTime = document.getElementById("Text-Selected-" + count).textContent;
                newFocusedTimes.push(aTime);
            }

            for(count = count; count < times.length; count++){
                document.getElementById("Selected-" + count).style.background = "rgb(0, 0, 0)";
                document.getElementById("Text-Selected-" + count).style.color = "rgb(255, 255, 255)";
            }

        }else if(timePivot < idNum){
            for(count = 0; count < times.length; count++){
                document.getElementById("Selected-" + count).style.background = "rgb(0, 0, 0)";
                document.getElementById("Text-Selected-" + count).style.color = "rgb(255, 255, 255)";
                if(count === timePivot){
                    for(count = count; count <= idNum; count++){
                        document.getElementById("Selected-" + count).style.background = "rgb(97, 183, 226)";
                        document.getElementById("Text-Selected-" + count).style.color = "rgb(0, 0, 0)";
                        var aTime = document.getElementById("Text-Selected-" + count).textContent;
                        newFocusedTimes.push(aTime);
                    }
                }
            }

        }else{

            for(count = 0; count < times.length; count++){
                document.getElementById("Selected-" + count).style.background = "rgb(0, 0, 0)";
                document.getElementById("Text-Selected-" + count).style.color = "rgb(255, 255, 255)";
                if(count === idNum){
                    for(count = count; count <= timePivot; count++){
                        document.getElementById("Selected-" + count).style.background = "rgb(97, 183, 226)";
                        document.getElementById("Text-Selected-" + count).style.color = "rgb(0, 0, 0)";
                        var aTime = document.getElementById("Text-Selected-" + count).textContent;
                        newFocusedTimes.push(aTime);
                    }
                }
            }

        }

        this.setState({
            focusedTimes: newFocusedTimes
        });

    }

    handleTimeCtrl(splitArr){

        var idNum = parseInt(splitArr[1]);
        var newFocusedTimes = this.state.focusedTimes;
        var times = this.state.times;
        var newTimePivot = -1;

        var aTime = document.getElementById("Text-Selected-" + idNum).textContent;

        if(newFocusedTimes.includes(aTime)){
            document.getElementById("Selected-" + idNum).style.background = "rgb(0, 0, 0)";
            document.getElementById("Text-Selected-" + idNum).style.color = "rgb(255, 255, 255)";
            var index = newFocusedTimes.indexOf(aTime);
            newFocusedTimes.splice(index, 1);

            newTimePivot = (newFocusedTimes.length > 0 ? times.indexOf(newFocusedTimes[newFocusedTimes.length - 1]) : -1);
        }else{
            document.getElementById("Selected-" + idNum).style.background = "rgb(97, 183, 226)";
            document.getElementById("Text-Selected-" + idNum).style.color = "rgb(0, 0, 0)";
            newFocusedTimes.push(aTime);
            newTimePivot = idNum;
        }

        this.setState({
            focusedTimes: newFocusedTimes,
            timePivot: newTimePivot
        });

    }

    handleTimeSingle(splitArr){
        var idNum = parseInt(splitArr[1]);
        var newFocusedTimes = this.state.focusedTimes;
        var times = this.state.times;
        var newTimePivot = -1;
        var oldID = -1;
        var count = 0;

        var aTime = document.getElementById("Text-Selected-" + idNum).textContent;

        if(newFocusedTimes.includes(aTime)){

            for(count = 0; count < newFocusedTimes.length; count++){
                oldID = times.indexOf(newFocusedTimes[count]);
                document.getElementById("Selected-" + oldID).style.background = "rgb(0, 0, 0)";
                document.getElementById("Text-Selected-" + oldID).style.color = "rgb(255, 255, 255)";
            }

            newFocusedTimes = [];
            newTimePivot = -1;
        }else{
            
            for(count = 0; count < newFocusedTimes.length; count++){
                oldID = times.indexOf(newFocusedTimes[count]);
                document.getElementById("Selected-" + oldID).style.background = "rgb(0, 0, 0)";
                document.getElementById("Text-Selected-" + oldID).style.color = "rgb(255, 255, 255)";
            }

            newFocusedTimes = [];
            newFocusedTimes.push(aTime);

            document.getElementById("Selected-" + idNum).style.background = "rgb(97, 183, 226)";
            document.getElementById("Text-Selected-" + idNum).style.color = "rgb(0, 0, 0)";
            newTimePivot = idNum;
        }

        this.setState({
            focusedTimes: newFocusedTimes,
            timePivot: newTimePivot
        });
    }

    removeTime(event){
        var count = 0;
        var focusedTimesArr = this.state.focusedTimes;
        var timesArr = this.state.times;

        for(count = 0; count < focusedTimesArr.length; count++){
            var index = timesArr.indexOf(focusedTimesArr[count]);
            timesArr.splice(index, 1);
        }

        focusedTimesArr = [];
        
        this.setState({
            times: timesArr,
            focusedTimes: focusedTimesArr
        });

        this.fillTimes();
    }

    hourClick(event){
        var id = event.target.id.replace("text-", "");

        if(id.localeCompare("") === 0){
            return;
        }

        var splitArr = id.split("-");

        var idNum = parseInt(splitArr[1]) + 1;

        if(this.state.hour === idNum){
            var hourWrapper = document.getElementById(id);
            hourWrapper.style.background = "rgb(0, 0, 0)";

            this.setState({
                hour: -1
            });
        }else{
            var hourWrapper = document.getElementById(id);
            hourWrapper.style.background = "rgb(65, 65, 65)";

            if(!(this.state.hour === -1)){
                document.getElementById("Hour-" + (this.state.hour - 1)).style.background = "rgb(0, 0, 0)";
            }

            this.setState({
                hour: idNum
            });
        }
    }

    minuteClick(event){
        var id = event.target.id.replace("text-", "");

        if(id.localeCompare("") === 0){
            return;
        }

        var splitArr = id.split("-");

        var idNum = parseInt(splitArr[1]);

        if(this.state.minute === idNum){
            var minuteWrapper = document.getElementById(id);
            minuteWrapper.style.background = "rgb(0, 0, 0)";
     
            this.setState({
                minute: -1
            });
        }else{
            var minuteWrapper = document.getElementById(id);
            minuteWrapper.style.background = "rgb(65, 65, 65)";

            if(!(this.state.minute === -1)){
                document.getElementById("Minute-" + this.state.minute).style.background = "rgb(0, 0, 0)";
            }

            this.setState({
                minute: idNum
            });
        }
    }

    secondClick(event){

        var id = event.target.id.replace("text-", "");

        if(id.localeCompare("") === 0){
            return;
        }

        var splitArr = id.split("-");

        if(this.state.ctrl){
            this.handleCtrl(splitArr);
        }else if(this.state.shift){
            this.handleShift(splitArr);
        }else{
            this.handleSingle(splitArr);
        }
    }

    handleCtrl(splitArr){
        
        var idNum = parseInt(splitArr[1]);
        var secondsArr = this.state.seconds;
        var newPivot = -1;

        if(secondsArr.includes(idNum)){
            document.getElementById("Second-" + idNum).style.background = "rgb(0, 0, 0)";
            var index = secondsArr.indexOf(idNum);
            secondsArr.splice(index, 1);
            
            newPivot = (secondsArr.length > 0 ? secondsArr[secondsArr.length - 1] : -1);
        }else{
            document.getElementById("Second-" + idNum).style.background = "rgb(65, 65, 65)";
            secondsArr.push(idNum);
            newPivot = idNum;
        }

        this.setState({
            seconds: secondsArr,
            pivot: newPivot
        });

    }

    handleShift(splitArr){

        var idNum = parseInt(splitArr[1]);
        var secondsArr = [];
        var pivot = this.state.pivot;

        var data = getUsedSeconds(this.state.ampm, this.state.hour, this.state.minute);

        var count = 0;

        if(pivot === -1){

            for(count = 0; count <= idNum; count++){
                document.getElementById("Second-" + count).style.background = "rgb(65, 65, 65)";
                secondsArr.push(count);
            }

            for(count = count; count < 60; count++){
                document.getElementById("Second-" + count).style.background = "rgb(0, 0, 0)";
            }

        }else if(pivot < idNum){

            for(count = 0; count < 60; count++){
                document.getElementById("Second-" + count).style.background = "rgb(0, 0, 0)";
                if(count === pivot){
                    for(count = count; count <= idNum; count++){
                        document.getElementById("Second-" + count).style.background = "rgb(65, 65, 65)";
                        secondsArr.push(count);
                    }
                }
            }

        }else{

            for(count = 0; count < 60; count++){
                document.getElementById("Second-" + count).style.background = "rgb(0, 0, 0)";
                if(count === idNum){
                    for(count = count; count <= pivot; count++){
                        document.getElementById("Second-" + count).style.background = "rgb(65, 65, 65)";
                        secondsArr.push(count);
                    }
                }
            }

        }

        this.setState({
            seconds: secondsArr
        });

    }

    handleSingle(splitArr){
        
        var idNum = parseInt(splitArr[1]);
        var secondsArr = this.state.seconds;
        var newPivot = -1;
        var oldID = -1;
        var count = 0;

        if(secondsArr.includes(idNum)){

            for(count = 0; count < secondsArr.length; count++){
                oldID = secondsArr[count];
                document.getElementById("Second-" + oldID).style.background = "rgb(0, 0, 0)";
            }

            secondsArr = [];
            newPivot = -1;
        }else{

            for(count = 0; count < secondsArr.length; count++){
                oldID = secondsArr[count];
                document.getElementById("Second-" + oldID).style.background = "rgb(0, 0, 0)";
            }

            secondsArr = [];
            secondsArr.push(idNum);
            
            document.getElementById("Second-" + idNum).style.background = "rgb(65, 65, 65)";
            newPivot = idNum;
        }

        this.setState({
            seconds: secondsArr,
            pivot: newPivot
        });

    }

    toggleAMPM(event){
        var newAMPM = this.state.ampm;
        var id = event.target.className.split("-")[2];

        if(id.localeCompare("AM") === 0){
            newAMPM = "AM"
            document.getElementsByClassName("Picktime-Button-AM")[0].style.background = "#61b7e2";
            document.getElementsByClassName("Picktime-Button-PM")[0].style.background = "#2d5468";
        }else{
            newAMPM = "PM";
            document.getElementsByClassName("Picktime-Button-AM")[0].style.background = "#2d5468";
            document.getElementsByClassName("Picktime-Button-PM")[0].style.background = "#61b7e2";
        }

        this.setState({
            ampm: newAMPM
        });
    }

    goToUpload(event){
        this.props.history.push({
            pathname: "/Upload",
            state: {times: this.state.times}
        });
    }

    render(){

        var secondsReady = (this.state.hour > -1 && this.state.minute > -1 ? true : false);

        return(
            <div className="picktimeContainer">
                <Popout hist={this.props.history}/>
                <section className="Picktime-Top-Section" style={{height: this.state.topSectionHeight}}>
                    <div className="Picktime-Header-Wrapper" style={{height: this.state.headerHeight}}>
                        <Header hist={this.props.history}/>
                    </div>
                </section>

                <div className="Picktime-Timeline-Wrapper">
                    <Timeline flag="1"/>
                </div>

                <section className="Picktime-Content-Section" style={{height: this.state.middleSectionHeight}}>
                    
                    <div className="Picktime-Select-Area">
                        <div className="Picktime-AMPM-Wrapper">
                            <button className="Picktime-Button-AM" onClick={e => this.toggleAMPM(e)}>AM</button>
                            <button className="Picktime-Button-PM" onClick={e => this.toggleAMPM(e)}>PM</button>
                        </div>
                        <div className="Picktime-Dropdown-Wrapper">
                            <div className="Picktime-Dropdown-Hour">
                                <Dropdown itemTitle={"Hour"} items={this.produceHourArray()} customClick={e => this.hourClick(e)}/>
                            </div>
                            <div className="Picktime-Dropdown-Minute">
                                <Dropdown itemTitle={"Minute"} items={this.produceMinuteArray()} customClick={e => this.minuteClick(e)}/>
                            </div>
                            <div className="Picktime-Dropdown-Second">
                                <Dropdown itemTitle={"Second"} items={this.getSeconds()} selectedItems={this.getSelected()} customClick={e => this.secondClick(e)} isReady={secondsReady} seconds={this.state.seconds}/>
                            </div>
                        </div>
                        <button className="Picktime-Button-Add" onClick={e => this.addTimes(e)}>Add</button>
                    </div>

                    <div className="Picktime-Selected-Wrapper">
                        <div className="Picktime-Selected-List">

                        </div>
                        <div className="Picktime-Selected-Buttons">
                            <button className="Picktime-Button-Remove" onClick={e => this.removeTime(e)}>Remove</button>
                            <button className="Picktime-Button-Continue" onClick={e => this.goToUpload(e)}>Continue</button>
                        </div>
                    </div>
                </section>
            </div>
        );
            
    }
}

export default Picktime;


//"react-router-dom": "^6.0.0-alpha.1",