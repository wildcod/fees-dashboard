import React from 'react';
import './App.css';
import Login from './container/login/login'
import Signup from './container/signup/signup'
import Home from './container/home/home'
import NotFound from './container/not-found/not-found'
import { Link, Router } from "@reach/router"

function App() {
  return (
    <div className="App">
      <Router>
          <Home path="/" />
          <Signup path="/signup" />
          <Login path="/login" />
          <NotFound default />
      </Router>
    </div>
  );
}

export default App;
