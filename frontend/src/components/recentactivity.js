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
import { Row, Col, DropdownButton, Dropdown, ListGroup, Button, Card, Jumbotron } from 'react-bootstrap';
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
            allusertransactions:[],
            usertransaction:[],
            order:"DESC",
            groups:[]
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    componentDidMount(){
      this.getTransactions()
      this.getGroups();
    }

    getTransactions = async()=>{
      await axios.get(`${apiHost}/api/recent/${localStorage.getItem('user_id')}`).then((response) =>{
        if(response.data[0]){
          this.setState({
            allusertransactions: response.data,
            usertransactions: response.data,
          })
        }
        }).catch((err) =>{
              console.log(err)
        });
    }

    getGroups = async()=>{
      await axios.get(`${apiHost}/api/mygroups/${this.state.user_id}`).then((response) => {
        //update the state with the response data
      response.data.map((res) => {
          if( res.is_member=='Y'){
              const group = {
                  groupname: res.group_name,
                  // group_image: res.group_image,
                  is_member: res.is_member,
                  }
              const grplist = [...this.state.groups, group];
              this.setState({ groups: grplist });
          }
        });
      });
    }
   
    sortSubmit=(e) =>{
      e.preventDefault();
  
      if(this.state.order==="DESC" && e.target.value ==="ASCE"){
        this.setState({
          usertransactions: this.state.usertransactions.reverse(),
          order:"ASCE"
        })
      }
      else if(this.state.order==="ASCE" && e.target.value ==="DESC"){
        this.setState({
          usertransactions: this.state.usertransactions.reverse(),
          order:"DESC"
        })
      }

    }
    filterSubmit=(e) =>{
      e.preventDefault();
      const filtertransactions = this.state.allusertransactions.filter((transaction)=> transaction.group_name===e.target.value)
      console.log(filtertransactions)
      this.setState({
        usertransactions: filtertransactions
      })

    }
    
  render() {
    
    const groupNames= new Set();
    const userDetails = [];
    if (this.state && this.state.usertransactions && this.state.usertransactions.length > 0) {
      this.state.usertransactions.map((usertransaction) => {
        const userDetail = (
          <ListGroup.Item><UserTransaction usertransaction={usertransaction} /></ListGroup.Item>
        );
        userDetails.push(userDetail);
      });
    }

    if(this.state && this.state.groups && this.state.groups.length>0){
      this.state.groups.map((group) =>{
        const groupName =(
          <Dropdown.Item as="button" value={group.groupname} onClick={this.filterSubmit}>{group.groupname}</Dropdown.Item>
        )
        groupNames.add(groupName);
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
          <Col xs lg="2">{'\u00A0'}</Col>
          <DropdownButton id="dropdown-item-button" title="SORT">
            <Dropdown.Item as="button" value="DESC" onClick={this.sortSubmit}>Recent</Dropdown.Item>
            <Dropdown.Item as="button" value="ASCE" onClick={this.sortSubmit}>Oldest</Dropdown.Item>
  
          </DropdownButton>
          &nbsp;
          <DropdownButton id="dropdown-item-button" title="FILTER">
            {groupNames}
          </DropdownButton>
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