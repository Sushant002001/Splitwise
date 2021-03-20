import React, { Component } from 'react';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';

// import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { Row, Col, Button, Nav, ListGroup } from 'react-bootstrap';
import SplitwiseImage from '../images/logo.svg'
import { Link } from 'react-router-dom';
import axios from 'axios';
import apiHost from '../config.js';
import YouOwe from './Youowe';
import YouareOwed from './Youareowed';
import GroupNav from './groupNav';
import SettleUpButton from './settleUpButton';
var numeral = require('numeral');
// import { Text} from 'react-native';

class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      user_id: localStorage.getItem('user_id'),
      groups:[],
      balances:[],
      showSettle: false
    }
  }

  async componentDidMount(){
    await this.getGroups();
    await this.getBalances();
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

  getBalances = async()=>{
    await axios.get(`${apiHost}/api/dashboard/${this.state.user_id}`).then((response) => {
      //update the state with the response data
    response.data.message.map((res) => {
          const balance = {
              amount: res.net_amt,
              user_name2: res.user2_name,
              user_id2:res.user2,
              pay_or_collect: res.collect_or_pay
              }
          const balanceList = [...this.state.balances, balance];
          this.setState({ balances: balanceList });
      });
    });
  }

  showmodal = () =>{
    this.setState({
      showSettle: true,
    })
  }

  hidemodal = () =>{
    this.setState({
      showSettle: false,
      balances:[]
    })
    this.getBalances();
  }

  render() {
    if(!cookie.load('cookie')){
      return <Redirect to= "/login"/>
  }
    // this.getBalances();
    let oweBalance=[]
    let owedBalance=[]
    let usergroups=[]
    var youOwe=0;
    var youareOwed=0;
    let settleup=[];
    console.log(this.state.balances)
    if(this.state && this.state.balances && this.state.balances.length>0){
      const settle=(<SettleUpButton
        show={this.state.showSettle}
        handleClose={this.hidemodal}
        balances={this.state.balances}
      />);
      settleup.push(settle);
    }
    console.log(settleup)
    if(this.state && this.state.balances && this.state.balances.length>0){
      this.state.balances.map((balance)=>{
        if(balance.pay_or_collect=="COLLECT"){
          const bal = (
            <ListGroup.Item><YouareOwed balance={balance} /></ListGroup.Item>
          );
          owedBalance.push(bal)
          youareOwed+=Math.abs(balance.amount)
        }
        else if(balance.pay_or_collect=="PAY"){
          const bal = (
            <ListGroup.Item><YouOwe balance={balance} /></ListGroup.Item>
          );
          oweBalance.push(bal)
          youOwe+= Math.abs(balance.amount)
        }
      })
    }

    if(this.state && this.state.groups && this.state.groups.length > 0){
      this.state.groups.map((group)=>{
        const grp = (
          <GroupNav group={group}/>
        );
        usergroups.push(grp)
      })
    }
    
    let totalBalance =  youareOwed - youOwe
    
    return (
      <div>
      <NavBar/>
      <div>
        <Row>
          <Col xs lg="2">{'\u00A0'}</Col>
            <Col sm={2} className="mt-3" > 
            <Row>
            <div>
              <Nav defaultActiveKey="/home" className="flex-column">
                  <Nav.Link href="/home"> 
                    {/* <img src={SplitwiseImage} class='img-fluid rounded' style={{ height:20, width:20}} alt='Splitwise' />  */}
                    <text>Dashboard</text> 
                  </Nav.Link>
                  <Nav.Link href="/recentactivity"> 
                    <text>Recent Activity</text>  
                  </Nav.Link>
                  <Nav.Link href="/mygroups"> 
                    <text>My Groups</text>  
                  </Nav.Link>
                  <div className=" px-3 pt-3 text-muted">Groups </div>
                  {usergroups}
              </Nav>
            </div>
            </Row>
          
            </Col>
            
           
            
            
            {/* <Col xs lg="1">{'\u00A0'}</Col> */}
            <Col md={4} className="mt-3">
              <h3>Dashboard</h3>
              {settleup}
            <Button variant="success" onClick={this.showmodal}>Settle Up</Button>
              <Row>
              <ListGroup horizontal style={{minWidth:'100%'}}>
                <ListGroup.Item as={Col}>Total Balance
                  <Row>
                    <Col>
                      {numeral(totalBalance).format('$0.00')}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item as={Col}>You Owe
                  <Row>
                      <Col>
                        {numeral(youOwe).format('$0.00')}
                      </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item as= {Col}>You are Owed
                  <Row>
                      <Col>
                        {numeral(youareOwed).format('$0,00')}
                      </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              </Row>
              <Row>
                <Col>
                  <text>You Owe</text>
                  <ListGroup variant="flush">
                    {oweBalance}
                  </ListGroup>
                  
                </Col>
                <Col>{'\u00A0'}</Col>
                <Col>
                  <text style={{float: 'right'}}>You Are Owed</text>
                  <ListGroup variant="flush" style={{width:'100%'}}>
                    {owedBalance}
                  </ListGroup>
                </Col>
              </Row>
            </Col>

          {/* <Col xs lg="2">{'\u00A0'}</Col> */}
        </Row>
      </div>
    </div>




    )
  }
}
export default Home