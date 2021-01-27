import React from 'react';
import './Slideshow.css';
import Clock from "./Clock"
import {retrieveSlideshowData} from '../Services/ContentService';
import {retrieveBlob} from '../Services/BlobService';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

class Slideshow extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            date: new Date(),
            index: 0,
            path: "/assets/default3.jpg",
            defaultCount: 0,
            arrayBuffer: "",
            link: "",
            imageType: "",
            usingDefault: true
        };

    }
    
    //Lifecycle method for after Sldieshow component has mounted to the DOM
    componentDidMount(){ 
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    //Lifecycle event preparing Slideshow component to unmount from DOM
    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    goToLink(event){
        if(this.state.link.localeCompare("") != 0){
            window.location.href = this.state.link;
        }
    }

    async tick(){

        var currIndex = this.state.index;
        var newPath = '';

        var ampm;
        var hour;
        var minute;
        var second;

        var contentID;
        var newLink;
        var fileResult;

        var token = this.state.token;

        this.setState({
            date: new Date(),
            index: (currIndex == 3 ? 0 : currIndex + 1)
        });

        /*if(this.state.index > 1){
            this.setState({
                index: 0
            });
        };*/

        ampm = this.state.date.toLocaleTimeString().split(":")[2].split(" ")[1];
        hour = this.state.date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'}).split(":")[0];
        minute = this.state.date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'}).split(":")[1];
        second = this.state.date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'}).split(":")[2].split(" ")[0];

        //await fetch("https://localhost:8443/api/content/" + ampm + "/" + hour + "/" + minute + "/" + second  , {
        /*await fetch("http://localhost:8080/api/content/" + ampm + "/" + hour + "/" + minute + "/" + second  , {  
            method: "GET",                          
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token}
            })
            .then(res => res.text())
            .then(
                (text) => {

                    var result = (text.length ? JSON.parse(text) : {});

                    contentID = result[0].content_id;
                    newLink = result[0].url;

                }
            )
            .catch(console.log);*/

            var slideshowDataArr = await retrieveSlideshowData(ampm, hour, minute, second);
            var contentID = slideshowDataArr[0];
            var newLink = slideshowDataArr[1];
                
            if(!contentID){

                var count = (this.state.defaultCount == 6 ? 1 : this.state.defaultCount + 1);
                var newPath = "/assets/default" + count + ".JPG";

                this.setState({
                    usingDefault: true,
                    defaultCount: count,
                    path: newPath,
                    link: ""
                });

            }else{
                //await fetch("https://localhost:8443/api/file/" + contentID  , { 
                var fileResult = await retrieveBlob(contentID);

                this.setState({
                    usingDefault: false,
                    path: "",
                    arrayBuffer: "data:" + fileResult.contentType + ";base64," + fileResult.data,
                    imageType: fileResult.contentType,
                    link: newLink
                });

    }

    }

    //Render the Slideshow component to the DOM/Screen
    render(){

        var imgPath;

        if(this.state.usingDefault){
            imgPath = process.env.PUBLIC_URL + this.state.path;
        }else{
            imgPath = this.state.arrayBuffer; 
        }

        return(
            <div className="slideshowContainer">
                <div className="slideshowImage" style={{backgroundImage: "url(" + imgPath + ")"}} onClick={e => this.goToLink(e)}/>
                <Clock />
            </div>
        );
            
    }
}

export default Slideshow;


//"react-router-dom": "^6.0.0-alpha.1",
//<div className="slideshowImage" />