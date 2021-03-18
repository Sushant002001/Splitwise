import React, { Component } from 'react';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import SplitwiseImage from '../images/logo.svg'
import UserTransaction from './usertransaction';
import apiHost from '../config.js'


import '../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Row, Col, Navbar, Nav, ListGroup, Button, Card, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import splitwiseLogo from "../images/splitwise.svg";
import userIcon from "../images/sp-ellie.svg";

import PropTypes from 'prop-types';
import { userLogin } from '../actions/loginUserAction'


class recentactivity extends Component {
    constructor(props){
        super(props);
        this.state={
            user_id: localStorage.getItem('user_id'),
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    componentDidMount(){
      axios.get(`${apiHost}/api/recent/${localStorage.getItem('user_id')}`).then((response) =>{
          if(response.data[0]){
            this.setState({
              usertransactions: response.data,
            })
          }
      }).catch((err) =>{
            console.log(err)
      });
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
    
    const userDetails = []
    if (this.state && this.state.usertransactions && this.state.usertransactions.length > 0) {
      this.state.usertransactions.map((usertransaction) => {
        const userDetail = (
          <ListGroup.Item><UserTransaction usertransaction={usertransaction} /></ListGroup.Item>
        );
        userDetails.push(userDetail);
      });
    }



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
          <Col xs lg="3">{'\u00A0'}</Col>
          <h5>RECENT ACTIVITY</h5>  
          </Row> 
        <Row>
        <Col xs lg="3">{'\u00A0'}</Col>
          <ListGroup variant="flush" style={{width:'40%'}}>
              {userDetails}
          </ListGroup>
        </Row>
      </div>
      </div>
    )
  }
}
export default recentactivity;