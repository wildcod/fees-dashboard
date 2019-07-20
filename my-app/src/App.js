import React from 'react';
import './App.css';
import Login from './container/login/login'
import Signup from './container/signup/signup'
import Home from './container/home/home'
import NotFound from './container/not-found/not-found'
import AllClass from './container/all-class/all-class'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Students from './container/students/students';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/classes" component={AllClass} />
          <Route path="/students/:classId" component={Students}/>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
