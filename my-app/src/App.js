import React from 'react';
import './App.css';
import Login from './container/login/login'
import Signup from './container/signup/signup'
import Home from './container/home/home'
import NotFound from './container/not-found/not-found'
import AllClass from './container/all-class/all-class'
import Profile from './container/profile/profile'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Students from './container/students/students';
import  ProtectedRoutes from './protectedRoutes/protectedRoutes'
import { connect } from 'react-redux'

const App = props => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <ProtectedRoutes path="/classes" component={AllClass} loggedIn={props.loggedIn} />
          <ProtectedRoutes path="/students/:classId" component={Students} loggedIn={props.loggedIn} />
          <ProtectedRoutes path="/profile/:classAndStudentId" component={Profile} loggedIn={props.loggedIn} />
          <Route component={NotFound} />
          </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = state => ({
  loggedIn: state.authStore.loggedIn,
});


export default connect(mapStateToProps)(App);
