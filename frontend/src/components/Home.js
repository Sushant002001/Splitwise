import React, { Component } from 'react';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { Row, Col, Button, Nav } from 'react-bootstrap';
import SplitwiseImage from '../images/logo.svg'
import { Link } from 'react-router-dom';
// import { Text} from 'react-native';

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
            
            <div>
              <Nav defaultActiveKey="/home" className="flex-column">
                  <Nav.Link href="/home"> 
                    {/* <img src={SplitwiseImage} class='img-fluid rounded' style={{ height:20, width:20}} alt='Splitwise' />  */}
                    <text >Dashboard</text> 
                  </Nav.Link>
                  <Nav.Link href="/recentactivity"> 
                    <text>Recent Activity</text>  
                  </Nav.Link>
              </Nav>
            </div>
            <Col xs lg="1">{'\u00A0'}</Col>
            <Col sm={1}>
              <h3>Dashboard</h3>
            </Col>

          <Col xs lg="2">{'\u00A0'}</Col>
        </Row>
      </div>
    </div>




    )
  }
}
export default Home