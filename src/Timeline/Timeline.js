import React, { Fragment } from 'react';
import './Timeline.css'; 

class Timeline extends React.Component{
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        this.setHighlight();
    }

    componentWillUnmount(){
        
    }

    setHighlight(){

        if(this.props.flag == "1"){
            document.getElementById("one").style.backgroundColor = "#61b7e2";
        }else if(this.props.flag == "2"){
            document.getElementById("two").style.backgroundColor = "#61b7e2";
        }else{
            document.getElementById("three").style.backgroundColor = "#61b7e2";
        }

    }

    render(){

        return(
            <div id="timeline-root">
                <div id="one"><h1>1</h1></div>
                <div id="line1"></div>
                <div id="two"><h1>2</h1></div>
                <div id="line2"></div>
                <div id="three"><h1>3</h1></div>
                <h2 id="label1">Picktime</h2>
                <h2 id="label2">Upload</h2>
                <h2 id="label3">Checkout</h2>
            </div>
        );
    }
}

export default Timeline;