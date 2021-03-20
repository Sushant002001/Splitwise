import NavBar from './NavBar';
import SplitwiseImage from '../images/logo.svg'
import UserTransaction from './usertransaction';
import apiHost from '../config.js'


import '../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Row, Col, Modal , Button, Card, Form} from 'react-bootstrap';
import { connect } from 'react-redux';
import splitwiseLogo from "../images/splitwise.svg";
import userIcon from "../images/sp-ellie.svg";

import PropTypes from 'prop-types';
import { userLogin } from '../actions/loginUserAction'
import { Component } from 'react';

class expenseButton extends Component{
    constructor(props){
        super(props);
        this.state={
            user_id: localStorage.getItem('user_id'),
            groupname: localStorage.getItem('groupname'),
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    expenseSubmit= (e)=>{
        e.preventDefault()

        const data = {
            groupname: this.state.groupname,
            user_id: this.state.user_id,
            bill_name: this.state.bill_name,
            amount:this.state.amount
          };

        axios.post(`${apiHost}/api/addexpense`,data)
            .then((response) => {
                console.log("Status Code : ",response.status)
                alert(response.data)
                this.props.handleClose();
                }).catch((err) => {
                    alert(err.response.data);
                  });
    }

    render() {
        return(
        <Modal show={this.props.show} onHide={this.props.handleClose} centered>
            <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Add an Expense</Modal.Title>
        </Modal.Header>
      
        <Modal.Body>
            <Row>{this.state.groupname}</Row>
            <Form>
                <Form.Row> 
                    <Col>
                        <Form.Control type="text" placeholder="Enter Description" onChange={this.onChange} name= "bill_name"/>
                    </Col>
                    <Col>
                        <Form.Control type="text" placeholder="Amount" onChange={this.onChange} name="amount" />
                    </Col>
                </Form.Row>
            </Form>
        </Modal.Body>
      
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>Cancel</Button>
          <Button variant="success" onClick={this.expenseSubmit}>Save</Button>
        </Modal.Footer>
      </Modal.Dialog>
        </Modal>
    )
    }
}

export default expenseButton;