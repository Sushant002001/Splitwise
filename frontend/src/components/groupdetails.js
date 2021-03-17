import React, { Component } from 'react';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import SplitwiseImage from '../images/logo.svg'



import '../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Row, Col, Navbar, Nav, Table, Image, Container, Form, FormGroup, Button, Card, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import splitwiseLogo from "../images/splitwise.svg";
import userIcon from "../images/sp-ellie.svg";

import PropTypes from 'prop-types';
import { userLogin } from '../actions/loginUserAction'


class groupdetails extends Component {
    constructor(props){
        super(props);
        this.state =  this.props.location.state
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    // acceptSubmit = (e)=>{
    //     e.preventDefault();
        
    //     const data = {
    //         groupname: this.state.groupname,
    //         user_id: this.state.user_id,
    //       };

    //     axios.post('http://localhost:3001/api/acceptinvite',data)
    //         .then((response) => {
    //             console.log("Status Code : ",response.status)
    //             alert(response.data)
    //             }).catch((err) => {
    //                 alert(err.response.data);
    //               });
    // }
    
  render() {
    return (
      <div>
      <NavBar/>
      <div className="mt-5">
        <Row>
            <Col>
            {'\u00A0'}
            </Col>
        </Row>
          <Row>
          <Col xs lg="4">{'\u00A0'}</Col>
          <h5>{this.state.groupname}</h5>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
              
          </Row> 
      </div>
      </div>
    )
  }
}
export default groupdetails;