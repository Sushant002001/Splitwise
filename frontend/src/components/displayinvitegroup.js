import React, { Component } from 'react';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import SplitwiseImage from '../images/logo.svg'
import apiHost from '../config.js';


import '../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Row, Col, Navbar, Nav, Dropdown, Image, Container, Form, FormGroup, Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import splitwiseLogo from "../images/splitwise.svg";
import userIcon from "../images/sp-ellie.svg";

import PropTypes from 'prop-types';
import { userLogin } from '../actions/loginUserAction'


class displayinvitegroup extends Component {
    constructor(props){
        super(props);
        this.state = {  
            groupname: this.props.userinviteGroups.groupname,
            user_id: localStorage.getItem('user_id'),
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    acceptSubmit = (e)=>{
        e.preventDefault();
        
        const data = {
            groupname: this.state.groupname,
            user_id: this.state.user_id,
          };

        axios.post(`${apiHost}/api/acceptinvite`,data)
            .then((response) => {
                console.log("Status Code : ",response.status)
                // alert(response.data)
                // this.setState({
                //     message: response.data.message,
                //     // acceptedGroupName: this.state.group_ame,
                // });
                this.props.onUpdateInvitation(this.props.userinviteGroups);
                // window.location.reload(false);
                }).catch((err) => {
                    alert(err.response.data);
                  });
    }
  render() {
      console.log("here")
    return (
      <div className="m-2">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{this.state.groupname}</Card.Title>
                <Button onClick={this.acceptSubmit}>Accept</Button>
            </Card.Body>
        </Card>
    </div>
    )
  }
}
export default displayinvitegroup;