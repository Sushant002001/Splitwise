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
            displayName : this.props.balances[0].user_name2,
            showBalance: Math.abs(this.props.balances[0].amount),
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
            user_name2: this.state.displayName,
            amount:Math.abs(this.state.showBalance),
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

      setName =(target)=>{
          console.log(target)
          const bal= this.props.balances.find((balance=> balance.user_name2===target))
          console.log(bal)
          if(bal){
            this.setState({
                displayName:target,
                showBalance: bal.amount
            })
          }
      }
    render() {
        // console.log(this.state.balances)
        let allUser = [];
        console.log(this.state.displayName)
        if(this.state && this.props.balances && this.props.balances.length>0){
            const bal=(<AllUserModal
                show={this.state.userShow}
                handleClose={this.hidemodal}
                balances={this.props.balances}
                setName={this.setName}
                />
            )
                  allUser.push(bal);
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
                
                {this.props.balances && this.props.balances.length>0 ? <Button name="user_name2" value={this.state.displayName} variant ="link" onClick={this.showmodal}> {this.state.displayName}</Button> : <Form.Control></Form.Control>} 
                

            </Row>
            <Form>
                <Form.Row> 
                    <Col>
                        <Form.Control type="text" onChange={this.onChange} value={this.state.showBalance} name="amount" />
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