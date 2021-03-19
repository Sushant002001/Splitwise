import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import SplitwiseImage from '../images/logo.svg'
import Groupdetails from './groupdetails';
import apiHost from '../config.js'


import '../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Row, Col, Navbar, Nav, Dropdown, Image, Container, Form, Alert, Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import splitwiseLogo from "../images/splitwise.svg";
import userIcon from "../images/sp-ellie.svg";

import PropTypes from 'prop-types';
import { userLogin } from '../actions/loginUserAction'


class displaygroup extends Component {
    constructor(props){
        super(props);
        this.state = {  
            groupname: this.props.userGroups.groupname,
            user_id: localStorage.getItem('user_id'),
            message:""
        }
    }


    detailsSubmit = (e)=>{
        e.preventDefault();
        console.log(this.state.groupname);
        this.setState({
            
        })
    }

    exitGroup = (e)=>{
      e.preventDefault();
      const data={
          groupname:this.state.groupname,
          user_id: this.state.user_id,
      }
      axios.post(`${apiHost}/api/leavegroup`, data).then((response)=>{
        if(response.data=="ALL_BALANCE_SETTLED"){
          this.props.onLeaveGroup();
        }else if(response.data=="NOT_SETTLED"){
          this.setState({
            message: response.data
          })
        }
      }).catch((err)=>{
        console.log(err.response.data);
        this.setState({
          message: err.response.data
        })
      });
  }
  render() {
    // Groupdetails groupname=this.state.groupname
    return (
      <div className="m-2">
        {this.state.message=="" ? <div> </div>: <Alert variant="danger">
          Please settle all balances before leaving group
        </Alert>}
          <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{this.state.groupname}</Card.Title>
                <Link to={{ pathname: '/groupdetails', state: { groupname: this.props.userGroups.groupname } }}>
                <Button variant="link">View Details</Button>
                </Link>
                <Button variant="link" onClick={this.exitGroup}> Leave</Button>
            </Card.Body>
        </Card>
    </div>
    )
  }
}
export default displaygroup;