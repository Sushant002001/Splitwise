import NavBar from './NavBar';
import SplitwiseImage from '../images/logo.svg'
import UserTransaction from './usertransaction';
import apiHost from '../config.js'
//import { ArrowRight } from 'react-bootstrap-icons';


import '../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Row, Col, Modal , Button, Card, Form, ListGroup} from 'react-bootstrap';
import { connect } from 'react-redux';
import splitwiseLogo from "../images/splitwise.svg";
import userIcon from "../images/sp-ellie.svg";

import PropTypes from 'prop-types';
import { userLogin } from '../actions/loginUserAction'
import { Component } from 'react';

class allUserModal extends Component{
    constructor(props){
        super(props);
        this.state={
            user_id: localStorage.getItem('user_id'),
            balances: this.props.balances,
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    setName = async(e) =>{
        console.log(e.target.value)
        await this.props.setName(e.target.value)
        this.props.handleClose()
    }    

    render() {
        let allUserName=[]

        // console.log(this.state.balances)
        if(this.state && this.state.balances && this.state.balances.length>0){
            this.state.balances.map((balance)=>{
                const name= (
                <ListGroup.Item><Button variant="link" onClick={this.setName} value={balance.user_name2}>{balance.user_name2}</Button></ListGroup.Item>
                )
                allUserName.push(name)
            })
        }
        // console.log(allUserName)

        
        return(
        <Modal show={this.props.show} onHide={this.props.handleClose} centered>
            <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Settle up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           {allUserName}
        </Modal.Body>
      </Modal.Dialog>
        </Modal>
    )
    }
}

export default allUserModal;