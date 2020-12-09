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
            shift: false
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
        var id = event.target.id;

        if(this.state.hour === parseInt(id.split("-")[1])){
            var hourWrapper = document.getElementById(id);
            hourWrapper.style.background = "rgb(0, 0, 0)";

            this.setState({
                hour: -1
            });
        }else{
            var hourWrapper = document.getElementById(id);
            hourWrapper.style.background = "rgb(65, 65, 65)";

            this.setState({
                hour: id.split("-")[1]
            });
        }
    }

    minuteClick(event){
        var id = event.target.id;

        if(this.state.minute === parseInt(id.split("-")[1])){
            var minuteWrapper = document.getElementById(id);
            minuteWrapper.style.background = "rgb(0, 0, 0)";
     
            this.setState({
                minute: -1
            });
        }else{
            var minuteWrapper = document.getElementById(id);
            minuteWrapper.style.background = "rgb(65, 65, 65)";

            this.setState({
                minute: id.split("-")[1]
            });
        }
    }

    secondClick(){

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