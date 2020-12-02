import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from "./Home"
import FAQ from "./FAQ/FAQ"
import Testimonial from "./Testimonial/Testimonial"
import Picktime from "./Picktime/picktime"
import Upload from "./Upload/upload"
import Checkout from "./Checkout/checkout"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//The App component encapsulates the su components and handles routing between "pages"
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/FAQ" component={FAQ} />
        <Route exact path="/Testimonial" component={Testimonial} />
        <Route exact path="/Picktime" component={Picktime} />
        <Route exact path="/Upload" component={Upload} />
        <Route exact path="/Checkout" component={Checkout} />
      </Switch>
  </Router>
  );
}

export default App;
