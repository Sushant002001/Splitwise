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

    onAvatarChange = (e) => {
        this.setState({
          file: e.target.files[0],
          filename: e.target.files[0].name,
        });
    }

    onUpload = (e) => {
        e.preventDefault();
        console.log(this.state.file)
        const formData = new FormData();
        formData.append('group_image', this.state.file);
        const uploadConfig = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
       axios.post(`${apiHost}/api/imageupload/group/${this.state.groupname}`, formData, uploadConfig)
      .then((response) => {
        // alert('Image uploaded successfully!');
        this.setState({
          filename: 'Choose your avatar',
          group_image: response.data.message,
        });
        console.log(this.state.group_image);
        // this.getUser();
      })
      .catch((err) => {
        console.log(err.response);
      });
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
      const filename= this.state.filename || 'Choose you Profile';
      const Userinvites = [];
      for (let i = 1; i <= this.state.memberList; i += 1) {
        Userinvites.push(<InviteUser groupname={this.state.groupname} />);
      }

      let group_image =null;
      if (this.state) {
          console.log(this.state.group_image)
          group_image = `${apiHost}/api/imageupload/group/${this.state.group_image}`;
          console.log(group_image);
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
          <Col md={{ offset: 1, span: 3}}>
            <Form onSubmit={this.onUpload}>
              <Form.Group as={Col} className="lg-3">
                <Image style={{ width: '17rem' }} src={group_image} />
              </Form.Group>
              <Form.Group as={Col} className="lg-3">
                <Form.File
                  className="mt-3"
                  name="group_image"
                  id="group_image"
                  style={{ width: '17rem' }}
                  accept="image/*"
                  label={filename}
                  onChange={this.onAvatarChange}
                  custom
                />
              </Form.Group>
              <FormGroup as={Col} className="lg-3"><Button type="submit">Upload</Button></FormGroup>
            </Form>
          </Col>
          <Col md={{ span: 8}}>
            <Row>
              <Form>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Start A New Group </Form.Label>
                      <h3>My group shall be called…</h3>
                    <Form.Control size="lg" type="text" placeholder="Groceries" onChange={this.onChange} name="groupname"/>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Button variant="primary" type="submit" style={{float: 'right'}} onClick={this.submitGroup}>
                        Save
                    </Button>
                  </Form.Group>
                </Form.Row>
              </Form>
            </Row>
            <Row>
              <Col md={{ span:6}}>
                <h5>
                  GROUP MEMBERS
                </h5>
                {this.state.current_username}({this.state.current_email_id})
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
          </Col>
        </Row>
      </div>
    </div>
    )
  }
}
export default creategroup