import React, { Component } from 'react';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { Row, Col } from 'react-bootstrap';
import SplitwiseImage from '../images/logo.svg'

class Home extends Component {
  render() {
    let redirectVar=null;
    // let message="";
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
                  <h1>Home</h1>
                  </div> 
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
export default Home