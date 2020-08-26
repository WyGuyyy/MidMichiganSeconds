import React from 'react';
import './Clock.css';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {date: new Date()};
    }
    
    componentDidMount(){
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    tick(){
        this.setState({
            date: new Date()
        });
    }

    //Render the Clock component to the DOM/Screen
    render(){

        return(
            <div className="clockContainer">
                <div className="clockWrapper">
                    <h1 className="clockText" >{this.state.date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'})}</h1>
                </div>
            </div>
        );
            
    }
}

export default Clock;


//"react-router-dom": "^6.0.0-alpha.1",