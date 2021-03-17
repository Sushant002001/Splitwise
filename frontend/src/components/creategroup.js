import React, { Component } from 'react';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import SplitwiseImage from '../images/logo.svg'
import InviteUser from './userinvite';
import apiHost from '../config.js';


import '../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Row, Col, Navbar, Nav, Dropdown, Image, Container, Form, FormGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import splitwiseLogo from "../images/splitwise.svg";
import userIcon from "../images/sp-ellie.svg";

import PropTypes from 'prop-types';
import { userLogin } from '../actions/loginUserAction'
import userinvite from './userinvite';


class creategroup extends Component {
    constructor(props){
        super(props);
        this.state = {  
            user_id: localStorage.getItem('user_id'),
            current_username: localStorage.getItem('username'),
            current_email_id:localStorage.getItem('email_id'),
            memberList:1,
        };
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    submitGroup = (e)=>{
        var headers = new Headers();
        e.preventDefault();
        
        const data ={ 
            user_id : this.state.user_id,
            groupname : this.state.groupname
        };
        console.log(data)
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${apiHost}/api/creategroup`,data)
            .then((response) => {
                console.log("Status Code : ",response.status)
                alert(response.data)
                }).catch((err) => {
                    alert(err.response.data);
            });
    }

    addUser =(e)=>{
        this.setState((prevState) => ({memberList: prevState.memberList+1}));
    }

    deleteUser =(e)=>{
        this.setState((prevState) => ({memberList: prevState.memberList-1}));
    }

  render() {
      const Userinvites = [];
      for (let i = 1; i <= this.state.memberList; i += 1) {
        Userinvites.push(<InviteUser groupname={this.state.groupname} />);
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
            <Col xs lg="2">{'\u00A0'}</Col>
            <Col sm={3}><img src={SplitwiseImage} class='img-fluid rounded float-right' style={{ height:200, width:200}} alt='Splitwise' /></Col>
            <Col sm={4}>
                <Row>
                    <Form>
                        <Form.Group>
                        <Form.Label>Start A New Group </Form.Label>
                        <br />
                        <div>
                            <h3>My group shall be called…</h3>
                        </div>
                        <Form.Control size="lg" type="text" placeholder="Groceries" onChange={this.onChange} name="groupname"/>
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{float: 'right'}} onClick={this.submitGroup}>
                            Save
                        </Button>
                    </Form>
                </Row>
                <Row>
                    <Col>
                        {'\u00A0'}
                    </Col>
                </Row>
                <Row>
                    <div>
                        <h5>
                            GROUP MEMBERS
                        </h5>
                        <p>
                            {this.state.current_username}({this.state.current_email_id})
                        </p>
                    </div>
                </Row>
                <div>
                    {Userinvites}
                </div>
                <Form.Row>
                  <Form.Group>
                    <Button size ="sm" onClick={this.addUser}>+ Add a Person</Button>{' '}
                    <Button size ="sm" onClick={this.deleteUser}> Delete a Person</Button>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                <Button href = '/home' variant="success" >Success</Button>
                </Form.Row>
            </Col>
        </Row>
      </div>
    </div>
    )
  }
}
export default creategroup