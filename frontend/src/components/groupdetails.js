import React, { Component } from 'react';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import SplitwiseImage from '../images/logo.svg'
import GroupTransaction from './grouptransaction';
import apiHost from '../config.js'
import RightBarDetails from './rightBarDetails';


import '../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Row, Col, Navbar, Nav, ListGroup, Button, Card, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import splitwiseLogo from "../images/splitwise.svg";
import userIcon from "../images/sp-ellie.svg";
import ExpenseButton from "./expenseButton";

import PropTypes from 'prop-types';
import { userLogin } from '../actions/loginUserAction'


class groupdetails extends Component {
    constructor(props){
        super(props);
        this.state =  {
          groupname: this.props.location.state.groupname,
          user_id: localStorage.getItem('user_id'),
          transactions:[],
          currentState:true,
          showExpense: false

        }
        localStorage.setItem('groupname', this.state.groupname)
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    componentDidMount() {
      this.getgroupdetails();
    }

    getgroupdetails = async () =>{ 
      await axios.get(`${apiHost}/api/groupbalance/${localStorage.getItem('user_id')}/${this.state.groupname}`).then((response) =>{
          if(response.data[0]){
            this.setState({
              transactions: response.data,
            })
          }
      }).catch((err) =>{
            console.log(err)
      });
    }

    showmodal = () =>{
      this.setState({
        showExpense: true,
      })
    }

    hidemodal = () =>{
      this.setState({
        showExpense: false,
        currentState: !this.state.currentState
      })
      this.getgroupdetails();
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
    console.log(this.state.showExpense)
    const groupDetails = []
    if (this.state && this.state.transactions && this.state.transactions.length > 0) {
      this.state.transactions.map((transaction) => {
        const groupDetail = (
          <ListGroup.Item><GroupTransaction transaction={transaction} /></ListGroup.Item>
        );
        groupDetails.push(groupDetail);
      });
    }



    return (
      <div>
      <NavBar/>
      <div className="mt-5">
        <Row>
          <Col>
            <Row>
              <Col md={{ span: 5 }} className="mx-2">
              {'\u00A0'}
              </Col>
              <h5>{this.state.groupname}</h5>
            </Row>
            <Row>
            <Col md={{ span: 8 }} className="mx-2" style={{ display: 'flex', justifyContent: 'flex-end ' }}>
              <ExpenseButton
                show={this.state.showExpense}
                handleClose={this.hidemodal}
              />
              <Button variant="success" onClick={this.showmodal}>Add an Expense</Button>
              </Col>
            </Row>

            <Row>
              <Col xs lg="3">{'\u00A0'}</Col>
                <ListGroup variant="flush" style={{width: '40%'}}> 
                  {groupDetails}
                </ListGroup>
                  
            </Row> 
          </Col>
          <Col md={{ span: 2 }}>
            <RightBarDetails 
              key={this.state.groupname}
              groupname={this.state.groupname}
              //currentState={this.state.currentState}
            />
          </Col>

        </Row>
      </div>
      </div>
    )
  }
}
export default groupdetails;