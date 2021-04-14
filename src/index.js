import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

if(window.location.href.includes("www.")){
    var newURL = window.location.href.replace("www.", "");
    window.location.replace(newURL);
}

//Encapsulate application within the 'root' div of the index file
//Application rendering is linked to the root div and all rendered DOM 
//elements created in React components will reside within the 'root' div
ReactDOM.render(<App />, document.getElementById('root'));  

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.register();
serviceWorker.register();
