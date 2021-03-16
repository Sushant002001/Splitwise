import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import login from './login';
import SignUp from './SignUp';
import home from './home';
import LandingPage from './LandingPage';
import profile from './profile';
import creategroup from './creategroup';

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
      </div>
    )
  }
}

export default Main;