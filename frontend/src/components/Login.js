import React, { Component } from 'react';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from './NavBar';
import { connect } from 'react-redux';
import { userLogin } from '../actions/loginUserAction'
import { Row, Col } from 'react-bootstrap';
import SplitwiseImage from '../images/logo.svg'
class Login extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {};
    // this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    })
  }
  //submit Login handler to send a request to the node backend
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.userLogin(data);

    this.setState({
      login: true
    });
  }

  render() {
    console.log(this.props);
    let redirectVar = null;
    let message = ''
    if (this.props.user && this.props.user.user_id) {
      localStorage.setItem('name', this.props.user.name);
      localStorage.setItem('email', this.props.user.email);
      localStorage.setItem('user_id', this.props.user.user_id);
      redirectVar = <Redirect to='/home' />
    }
    else if (this.props.user === 'USER_DOES_NOT_EXISTS' && this.state.login) {
      message = 'User Does Not Exists';
    }
    else if (this.props.user === 'INCORRECT_PASSWORD' && this.state.login) {
      message = 'Incorrect Password';
    }
    return (
      <div>
        {redirectVar}
        <NavBar/>
        <div>
          <Row>
            <Col xs lg="2">{'\u00A0'}</Col>
            <Col>
              <img src={SplitwiseImage} class='img-fluid rounded float-right' style={{ height:200, width:200}} alt='Splitwise' />
            </Col>
            <Col>
              <div>
                <div class='login-form'>
                  <div class='main-div'>
                    <div class='panel'>
                      <h2>WELCOME TO SPLITWISE</h2>
                    </div><br />
                    <form onSubmit={this.handleSubmit}>
                      <div style={{ color: '#ff0000' }}>{message}</div><br />
                      <div class='form-group'>
                        <input type='email' class='form-control' onChange={this.handleEmailChange} name='email' placeholder='Email Id' title='Enter valid email address' required />
                      </div>
                      <div class='form-group'>
                        <input type='password' class='form-control' onChange={this.handlePasswordChange} name='password' placeholder='Password' required />
                      </div>
                      <button type='submit' class='btn btn-orange btn-large btn-primary'>Login</button><br /><br />
                      {/* <div><center><Link to='/signup'>Create new account</Link></center></div> */}
                    </form>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs lg="2">{'\u00A0'}</Col>
          </Row>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const mapState = state => {
  console.log(state)
  return ({
    user: state.login.user
  })
};

export default connect(mapState, { userLogin })(Login);