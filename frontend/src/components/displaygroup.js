import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import SplitwiseImage from '../images/logo.svg'
import Groupdetails from './groupdetails';


import '../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Row, Col, Navbar, Nav, Dropdown, Image, Container, Form, FormGroup, Button, Card } from 'react-bootstrap';
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
        }
    }


    detailsSubmit = (e)=>{
        e.preventDefault();
        console.log(this.state.groupname);
        this.setState({
            
        })
    }

  render() {
    // Groupdetails groupname=this.state.groupname
    return (
      <div className="m-2">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{this.state.groupname}</Card.Title>
                <Link to={{ pathname: '/groupdetails', state: { groupname: this.props.userGroups.groupname } }}>
                <Button variant="link">View Details</Button>
                </Link>
                {/* <Card.Link href="./groupdetails" onClick={this.detailsSubmit}>View Details</Card.Link> */}
            </Card.Body>
        </Card>
    </div>
    )
  }
}
export default displaygroup;