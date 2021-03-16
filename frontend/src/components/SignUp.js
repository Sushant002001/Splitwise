import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSignUp } from '../actions/signUpUserAction'
import { Redirect } from 'react-router';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import NavBar from './NavBar';
import SplitwiseImage from '../images/logo.svg'
// import { Link } from 'react-router-dom';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  nameChangeHandler = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  emailChangeHandler = (e) => {
    this.setState({
      email_id: e.target.value
    })
  }

  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      username: this.state.username,
      email_id: this.state.email_id,
      password: this.state.password,
    }

    this.props.userSignUp(data);

    this.setState({
      signUp: true
    });
  }

  handleClear = (e) => {
    this.setState({
      username: '',
      email_id: '',
      password: ''
    })
  }
  render() {
    //redirect based on successful signup
    let redirectVar = null;
    let message = '';
    console.log(this.props.user, this.state.signUp)
    if (localStorage.getItem('email_id')) {
      redirectVar = <Redirect to='/home' />
    }
    
    else if (this.props.user === 'NEW_USER_CREATED' && this.state.signUp) {
      alert('You have registered successfully');
      redirectVar = <Redirect to='/login' />
    }
    else if (this.props.user === 'USER_ALREADY_EXISTS' && this.state.signUp) {
      message = 'User with email id is already registered'
    }
    return (
      <div>
        {redirectVar}
        <NavBar />
        {message}
        <Container>
          <Row>
            <Col>&nbsp;</Col>
          </Row>
          <Row>
            <Col xs lg="2">{'\u00A0'}</Col>
            <Col>
              <img src={SplitwiseImage} class='img-fluid rounded float-right' style={{ height: 200, width: 200 }} alt='Splitwise' />
            </Col>
            <Col>
            <Form>
            <Form.Group controlId='formBasicName'>
                <Form.Label>Full Name</Form.Label>
                <Form.Control type='email' name='username' value={this.state.username} placeholder='Enter Name' onChange={this.nameChangeHandler} required />
              </Form.Group>

              <Form.Group controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type='email' name='email_id' value={this.state.email_id} placeholder='Enter email' onChange={this.emailChangeHandler} required />
              </Form.Group>

              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' name='password' value={this.state.password} placeholder='Password' onChange={this.passwordChangeHandler} required />
              </Form.Group>

              <Button variant="success" onClick={this.handleSubmit}>
                Submit
              </Button>
              &nbsp;&nbsp;
              <Button variant="secondary" onClick={this.handleClear}>
                Clear
              </Button>      
            </Form>
            </Col>
            <Col xs lg="2">{'\u00A0'}</Col>
          </Row>

        </Container>
      </div>
    )
  }
};


SignUp.propTypes = {
  userSignUp: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapState = state => ({
  user: state.signup.user
});

export default connect(mapState, { userSignUp })(SignUp);