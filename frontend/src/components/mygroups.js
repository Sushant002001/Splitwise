import React, { Component } from 'react';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import SplitwiseImage from '../images/logo.svg'
import InviteUser from './userinvite';
import Displaygroup from './displaygroup';
import Displayinvitegroup from './displayinvitegroup';
import apiHost from '../config.js';
import GroupSearchBar from './groupsearchbar';
import { Link } from 'react-router-dom';




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
            searchName:'',
        };
    }

    componentDidMount(){
        this.getmygroups();
    }
    
    getmygroups =async()=>{
        await axios.get(`${apiHost}/api/mygroups/${this.state.user_id}`).then((response) => {
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

    onUpdateInvitation = () => {
        this.setState({
            Usergroups: [],
            Userinvitegroups:[],
        })
        this.getmygroups()
    }

    onLeaveGroup = () => {
        this.setState({
            Usergroups: [],
            Userinvitegroups:[],
        })
        this.getmygroups()
    }

    onSearch = async (name) => {
        console.log(typeof(name))
        await this.setState({
            searchName: name
        });
        console.log(this.state.searchName)
    }
  render() {
    console.log(this.state.searchName)
    return (
        <div>
        <NavBar/>
            <Row>
                <Col xs md={2}>{'\u00A0'}</Col>
                <div >
                <Col>
                    <Row>
                        <Col md={6}>
                        <GroupSearchBar 
                            onSearch={this.onSearch} 
                            displayGroupsnames={this.state.Usergroups.map((userGroups) => userGroups.groupname)}
                        />
                        <Link to={{ pathname: '/groupdetails', state: { groupname: this.state.searchName } }}>
                        <Button variant="link">view details</Button>
                        </Link>
                        
                        </Col>
                    </Row>
                
            
                    <Col sm={3} className ="mt-5">
                        <h4>
                            My Groups
                        </h4>
                        <div className=" d-flex flex-column">
                            {this.state.Usergroups.map((userGroups) => (
                            <Displaygroup
                            key={userGroups}
                            userGroups={userGroups}
                            onLeaveGroup={this.onLeaveGroup}
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
                </Col>
                </div>
            </Row>
        </div>
    )
  }
}
export default mygroups