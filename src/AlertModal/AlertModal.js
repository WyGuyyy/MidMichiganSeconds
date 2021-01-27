import React from 'react';
import './AlertModal.css';
import { Link } from 'react-router-dom';

class AlertModal extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            text: props.text,
            buttonConfirmText: props.confirmText,
            id: props.id
        };

    }
    
    //Lifecycle method for after Header component has mounted to the DOM
    componentDidMount(){ 
    
    }

    //Lifecycle event preparing Header component to unmount from DOM
    componentWillUnmount(){
        
    }

    hideModal(event){
        document.getElementById("alertModalContainer").style.display = "none";
    }

    //Render the Header component to the DOM/Screen
    render(){

        return(
            <div className="alertModalContainer" id="alertModalContainer" onClick={this.props.tileClickEvent}>
                <div className="alertModalContent">
                    <p className="alertModalText" id="alertModalText">{this.props.text}</p>
                    <div className="AlertModal-Button-Wrapper">
                        <button className="alertModalConfirmText" onClick={e => this.hideModal(e)}>{this.props.btnText}</button>
                    </div>
                </div>
            </div>
        );
            
    }s
}

export default AlertModal;

//<Hamburger />
//
//"react-router-dom": "^6.0.0-alpha.1",