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
import AllUserModal from './allUserModal';

import PropTypes from 'prop-types';
import { userLogin } from '../actions/loginUserAction'
import { Component } from 'react';

class settleUpButton extends Component{
    constructor(props){
        super(props);
        this.state={
            user_id: localStorage.getItem('user_id'),
            username: localStorage.getItem('username'),
            balances : this.props.balances,
            userShow : false,
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    settleupSubmit= (e)=>{
        e.preventDefault()

        const data = {
            user_id: this.state.user_id,
            owed_user_id: this.state.owed_user_id,
            amount:this.state.amount
          };

        axios.post(`${apiHost}/api/settleup`,data)
            .then((response) => {
                console.log("Status Code : ",response.status)
                alert(response.data)
                this.props.handleClose();
                }).catch((err) => {
                    alert(err.response.data);
                  });
    }

    showmodal = () =>{
        this.setState({
            userShow: true,
        })
      }
    
      hidemodal = () =>{
        this.setState({
            userShow: false,
        })
      }

    render() {

        let allUser = [];
        if(this.state && this.state.balances && this.state.balances.length>0){
            this.state.balances.map((balance)=>{
                const bal=(<AllUserModal
                    show={this.state.userShow}
                    handleClose={this.hidemodal}
                    userName={balance.user_name2}
                  />);
                  allUser.push(bal);
            })
          }
        return(
        <Modal show={this.props.show} onHide={this.props.handleClose} centered>
            <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Settle up</Modal.Title>
        </Modal.Header>
      
        <Modal.Body>
            <Row>
                <Button variant="link">{this.state.username}</Button>
                &nbsp;
                {"->"}
                <ListGroup>
                    {allUser}
                </ListGroup>
                
                {this.state.balances && this.state.balances.length>0 ? <Button  variant ="link" onClick={this.showmodal}> {this.state.balances[0].user_name2} </Button> : <Form.Control></Form.Control>} 
                

            </Row>
            <Form>
                <Form.Row> 
                    <Col>
                        <Form.Control type="text" placeholder="$" onChange={this.onChange} name="amount" />
                    </Col>
                </Form.Row>
            </Form>
        </Modal.Body>
      
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>Cancel</Button>
          <Button variant="success" onClick={this.settleupSubmit}>Save</Button>
        </Modal.Footer>
      </Modal.Dialog>
        </Modal>
    )
    }
}

export default settleUpButton;