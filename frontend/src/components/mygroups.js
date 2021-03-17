import React, { Component } from 'react';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import SplitwiseImage from '../images/logo.svg'
import InviteUser from './userinvite';
import Displaygroup from './displaygroup';
import Displayinvitegroup from './displayinvitegroup';
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
import userinvite from './userinvite';


class mygroups extends Component {
    constructor(props){
        super(props);
        this.state = {  
            user_id: localStorage.getItem('user_id'),
            Usergroups: [],
            Userinvitegroups:[],
        };
    }

    // onChange = (e) => {
    //     this.setState({
    //         [e.target.name] : e.target.value
    //     })
    // }

    
    componentDidMount(){
        axios.get(`${apiHost}/api/mygroups/${this.state.user_id}`).then((response) => {
                //update the state with the response data
                response.data.map((res) => {
                    if( res.is_member=='Y'){
                        const group = {
                            groupname: res.group_name,
                            // group_image: res.group_image,
                            is_member: res.is_member,
                            }
                        const grplist = [...this.state.Usergroups, group];
                        this.setState({ Usergroups: grplist });
                    }
                    else if( res.is_member=='N'){
                        const invitegroup = {
                            groupname: res.group_name,
                            // group_image: res.group_image,
                            is_member: res.is_member,
                            }
                        const invitegrplist = [...this.state.Userinvitegroups, invitegroup];
                        this.setState({ Userinvitegroups: invitegrplist });

                    }
                })
            })
    }

    onUpdateInvitation = (incomingGroupAccept) => {

        let newUserInvitationGroup = this.state.Userinvitegroups;

        console.log(incomingGroupAccept.groupname);
       
        newUserInvitationGroup = newUserInvitationGroup.filter((ng) => ng.groupname !== incomingGroupAccept.groupname);
        console.log(newUserInvitationGroup)
        incomingGroupAccept.is_member='Y'
        const Groupmem = [...this.state.Usergroups, incomingGroupAccept];

        
        this.setState({
            Usergroups: Groupmem,
            Userinvitegroups: newUserInvitationGroup,
        });
        
        console.log(`After deleting member state: ${JSON.stringify(this.state.Usergroups)}`);
        console.log(`After deleting invite state: ${JSON.stringify(this.state.Userinvitegroups)}`);
      }

    // submitGroup = (e)=>{
    //     var headers = new Headers();
    //     e.preventDefault();
        
    //     const data ={ 
    //         user_id : this.state.user_id,
    //         groupname : this.state.groupname
    //     };
    //     console.log(data)
    //     //set the with credentials to true
    //     axios.defaults.withCredentials = true;
    //     //make a post request with the user data
    //     axios.post('http://localhost:3001/api/creategroup',data)
    //         .then((response) => {
    //             console.log("Status Code : ",response.status)
    //             alert(response.data)
    //             }).catch((err) => {
    //                 alert(err.response.data);
    //         });
    // }

    // addUser =(e)=>{
    //     this.setState((prevState) => ({memberList: prevState.memberList+1}));
    // }

    // deleteUser =(e)=>{
    //     this.setState((prevState) => ({memberList: prevState.memberList-1}));
    // }

  render() {
    //   const userGroups = [];
    //   for (let i = 1; i <= this.state.Usergroups.length; i += 1) {
    //     userGroups.push(<Displaygroup groupname={this.state.Usergroups[i-1].groupname} />);
    //   }
    //   const userinviteGroups = [];
    //   for (let i = 1; i <= this.state.Userinvitegroups.length; i += 1) {
    //     userinviteGroups.push(<Displayinvitegroup groupname={this.state.Userinvitegroups[i-1].groupname} onUpdateInvitation={this.onUpdateInvitation}/>);
    //   }

    return (
      <div>
      <NavBar/>
        <Row>
            <Col xs lg="3">{'\u00A0'}</Col>
            <Col sm={3} className ="mt-5">
                <h4>
                    My Groups
                </h4>
                <div className=" d-flex flex-column">
                    {this.state.Usergroups.map((userGroups) => (
                    <Displaygroup
                      key={userGroups}
                      userGroups={userGroups}
                    />
                  ))}
                </div>
            </Col>
            <Col sm={1}></Col>
            <Col sm={3} className ="mt-5">
                <h4>
                    Pending Invites
                </h4>
                <div className=" d-flex flex-column">
                    {this.state.Userinvitegroups.map((userinviteGroups) => (
                        <Displayinvitegroup
                        
                        userinviteGroups={userinviteGroups}
                        onUpdateInvitation={this.onUpdateInvitation}
                        />
                    ))}
                </div>
            </Col>
        </Row>
    </div>
    )
  }
}
export default mygroups