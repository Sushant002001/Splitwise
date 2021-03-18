import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import login from './login';
import SignUp from './SignUp';
import home from './home';
import LandingPage from './LandingPage';
import profile from './profile';
import creategroup from './creategroup';
import mygroups from './mygroups';
import groupdetails from './groupdetails';
import recentactivity from './recentactivity';

class Main extends Component {
  render() {
    return (
      <div>
        <Route path='/' exact component={LandingPage} />
        <Route path='/login' component={login} />
        <Route path='/signup' component={SignUp} />
        <Route path='/home' component={home} />
        <Route path='/profile' component={profile} />
        <Route path='/creategroup' component={creategroup} />
        <Route path='/mygroups' component={mygroups} />
        <Route path='/groupdetails' component={groupdetails} />
        <Route path='/recentactivity' component={recentactivity} />
      </div>
    )
  }
}

export default Main;