import React from 'react';
import './App.css';
import Login from './container/login/login'
import Signup from './container/signup/signup'
import Home from './container/home/home'
import NotFound from './container/not-found/not-found'
import AllClass from './container/all-class/all-class'
import { Router } from "@reach/router"
import Students from './container/students/students';

function App() {
  return (
    <div className="App">
      <Router>
          <Home path="/" />
          <AllClass path="/classes" />
          <Students path="/students"/>
          <Signup path="/signup" />
          <Login path="/login" />
          <NotFound default />
      </Router>
    </div>
  );
}

export default App;
