import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from "./Home"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//The App component encapsulates the su components and handles routing between "pages"
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
  </Router>
  );
}

export default App;
