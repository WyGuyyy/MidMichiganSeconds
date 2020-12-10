import React from 'react';
import ReactDOM from "react-dom"
import './Picktime.css';
import Header from "../Header/Header"
import Popout from '../Popout/Popout';
import Dropdown from './Dropdown';
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

    /*createOrder(data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: "0.01",
              },
            },
          ],
        });
      }
    
      onApprove(data, actions) {
          
        fetch()
          //Call backend here
      }*/

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
        var secondArr = [];
        var count = 0;

        var ampm = this.state.ampm;
        var hour = this.state.hour;
        var minute = this.state.minute;

        var data = getUsedSeconds(ampm, hour, minute);

        return data;
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
            secondsArr.splice(index);
            
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
        var secondsArr = this.state.seconds;
        var pivot = this.state.pivot;

        var count = 0;

        if(pivot === -1){
            return;
        }

        if(pivot > idNum){

            for(count = 0; count < 60; count++){
                if(count === idNum){
                    for(count = count; count <= pivot; count++){
                        document.getElementById("Second-" + count).style.background = "rgb(65, 65, 65)";
                    }
                }

                document.getElementById("Second-" + count).style.background = "rgb(0, 0, 0)";
            }

        }else if(pivot < idNum){

            for(count = 0; count < 60; count++){
                if(count === pivot){
                    for(count = count; count <= idNum; count++){
                        document.getElementById("Second-" + count).style.background = "rgb(65, 65, 65)";
                    }
                }

                document.getElementById("Second-" + count).style.background = "rgb(0, 0, 0)";
            }

        }else{

            for(count = 0; count < 60; count++){
                if(count === pivot){
                    document.getElementById("Second-" + count).style.background = "rgb(65, 65, 65)";
                    count++;
                }

                document.getElementById("Second-" + count).style.background = "rgb(0, 0, 0)";
            }

        }

    }

    handleSingle(splitArr){
        
        var idNum = parseInt(splitArr[1]);
        var secondsArr = this.state.seconds;
        var newPivot = -1;

        if(secondsArr.includes(idNum)){
            document.getElementById("Second-" + idNum).style.background = "rgb(0, 0, 0)";
            secondsArr.splice(0);
            
            newPivot = -1;
        }else{
            document.getElementById("Second-" + idNum).style.background = "rgb(65, 65, 65)";
            var oldID = secondsArr.pop();
            secondsArr.push(idNum);
            newPivot = idNum;

            document.getElementById("Second-" + oldID).style.background = "rgb(0, 0, 0)";
        }

        this.setState({
            seconds: secondsArr,
            pivot: newPivot
        });

    }

    render(){

        var secondsReady = (this.state.hour > -1 && this.state.minute > -1 ? true : false);

        return(
            <div className="picktimeContainer">
                <Popout hist={this.props.history}/>
                <section className="Picktime-Top-Section" style={{height: this.state.topSectionHeight}}>
                    <div className="Picktime-Header-Wrapper" style={{height: this.state.headerHeight}}>
                        <Header />
                    </div>
                </section>
                <section className="Picktime-Content-Section" style={{height: this.state.middleSectionHeight}}>
                    <div className="Picktime-Dropdown-Wrapper">
                        <div className="Picktime-Dropdown-Hour">
                            <Dropdown itemTitle={"Hour"} items={this.produceHourArray()} customClick={e => this.hourClick(e)}/>
                        </div>
                        <div className="Picktime-Dropdown-Minute">
                            <Dropdown itemTitle={"Minute"} items={this.produceMinuteArray()} customClick={e => this.minuteClick(e)}/>
                        </div>
                        <div className="Picktime-Dropdown-Second">
                            <Dropdown itemTitle={"Second"} items={this.getSeconds()} customClick={e => this.secondClick(e)} isReady={secondsReady}/>
                        </div>
                    </div>
                </section>
            </div>
        );
            
    }
}

export default Picktime;


//"react-router-dom": "^6.0.0-alpha.1",