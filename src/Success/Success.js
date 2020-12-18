import React, { Fragment } from 'react';
import './Success.css'; 
import { Link } from 'react-router-dom';

class Success extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            processed: (props.location.state != undefined ? props.location.state.processed : false)
          };

          this.isProcessed();

        //console.log(this.props.location.pathname.indexOf('SuccessPage'));

        /*window.onpopstate = ()=> { //START HERE NEXT TIME.. STILL NEED TO FIGURE OUT HOW TO HANDLE BACK BUTTON FROM THIS PAGE
            if(this.props.location.pathname.indexOf('SuccessPage')>0){
                props.history.go(1);
            }
          }*/
    }

    componentDidMount(){
        
    }

    componentWillUnmount(){
        
    }

    componentDidUpdate(){
        
    }

    isProcessed(){
        if(!this.state.processed){
            this.props.history.replace("/picktime");
        }
    }

    render(){

        var flag = '2';

        return(

            <Fragment>

                <div id="success-area">
                    <h1 id="success-message">Your order has been processed!</h1>
                    <Link to="/">
                        <button id="home-button-success">Home Page</button>  
                    </Link>
                </div>

            </Fragment>
        );
    }
}

export default Success;


//"react-router-dom": "^6.0.0-alpha.1",
//<Link to={{pathname: this.state.meetsConditions == 1 ? "/checkout" : "javascript:void(0)", state: {times: this.state.times, url: this.state.url, selectedFiles: this.state.selectedFiles}}} onClick={this.checkConditions.bind(this)}>
//<button id="checkout-button-upload" onClick={this.collectURLS}>Checkout</button>
//</Link>

/*{ 
                            this.state.meetsConditions == 0
                            ? <Link to={{pathname: "/", state: {times: this.state.times, url: this.state.url, selectedFiles: this.state.selectedFiles}}} onClick={this.checkConditions.bind(this)}><button id="checkout-button-upload" onClick={this.collectURLS}>Checkout</button></Link>
                            : <Link to={{pathname: "/checkout", state: {times: this.state.times, url: this.state.url, selectedFiles: this.state.selectedFiles}}} className="notDisabled"><button id="checkout-button-upload" onClick={this.collectURLS}>Checkout</button></Link>
                        }*/