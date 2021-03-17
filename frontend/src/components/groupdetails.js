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


class groupdetails extends Component {
    constructor(props){
        super(props);
        console.log(this.props.location.state)
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
      <div className="m-2">
          {this.state.groupname}
    </div>
    )
  }
}
export default groupdetails;