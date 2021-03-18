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
            username: this.props.userName,
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    

    render() {

        
        return(
        <Modal show={this.props.show} onHide={this.props.handleClose} centered>
            <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Settle up</Modal.Title>
        </Modal.Header>
            
        <Modal.Body>
            <ListGroup.Item>{this.state.username}</ListGroup.Item>
        </Modal.Body>
      </Modal.Dialog>
        </Modal>
    )
    }
}

export default allUserModal;