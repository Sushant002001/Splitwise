import React, { Component } from 'react';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import SplitwiseImage from '../images/logo.svg'
import apiHost from '../config.js';
import GroupSearchBar from './groupsearchbar';


import '../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Row, Col, Navbar, Nav, Dropdown, Image, Container, Form, FormGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import splitwiseLogo from "../images/splitwise.svg";
import userIcon from "../images/sp-ellie.svg";

import PropTypes from 'prop-types';
import { userLogin } from '../actions/loginUserAction'


class userinvite extends Component {
    constructor(props){
        super(props);
        this.state = {  
            user_id: localStorage.getItem('user_id'),
            displayName:'',
            displayEmail:'',
            allUsers:[]
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    componentDidMount(){
      this.getNameandEmail();
    }

    getNameandEmail=()=>{
      axios.get(`${apiHost}/api/nameandemails/${this.state.user_id}`).then((response)=>{
        if(response.data){
          console.log(response.data)
          this.setState({
            allUsers: response.data,
          })
        }
      })
    }

    inviteSubmit = (e)=>{
        e.preventDefault();
        
        const data = {
            groupname: this.props.groupname,
            email_id: this.state.email_id,
            userame: this.state.username,
          };

        axios.post(`${apiHost}/api/invitegroup`,data)
            .then((response) => {
                console.log("Status Code : ",response.status)
                alert(response.data)
                }).catch((err) => {
                    alert(err.response.data);
                  });
    }
    onNameSearch = async (name) => {
      console.log(typeof(name))
      await this.setState({
          username: name
      });
      //console.log(this.state.displayName)
    }
    onEmailSearch = async (email_id) => {
      await this.setState({
          email_id: email_id
      });
      //console.log(this.state.displayName)
    }

  render() {
    return (
      <div>
            <Form.Row>
            <Form.Group as={Col} xs={5}>
            <GroupSearchBar
              onSearch={this.onEmailSearch}
              displayGroupsnames={this.state.allUsers.map((alluser) => alluser.email_id)}
              />
            </Form.Group>

            <Form.Group as={Col} xs={3}>
            {/* <Form.Control size="sm" type="text" placeholder="Name" onChange={this.onChange} name="username" /> */}
            <GroupSearchBar
              onSearch={this.onNameSearch}
              displayGroupsnames={this.state.allUsers.map((alluser) => alluser.user_name)}
              />
            </Form.Group>
            <Form.Group as={Col} xs={2}>
            <Button size="sm" variant="primary" type="submit" onClick={this.inviteSubmit}>
                    Invite
            </Button>
            </Form.Group>
            </Form.Row>
    </div>
    )
  }
}
export default userinvite;