import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';
import 'moment-timezone';


class usertransaction extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }


  render() {
    const { usertransaction } = this.props;
    return (
      <Row>
        <Col>
          <Row>
            {usertransaction.paid_by_name!=localStorage.getItem('username')? <b>{usertransaction.paid_by_name}</b>: <b>You</b> }
            
            &nbsp;added&nbsp;
            <b>
              "
              {usertransaction.bill_name}
              "
            </b>
            &nbsp;in&nbsp;
            <b>
              "
              {usertransaction.group_name}
              "
            </b>
            .
          </Row>
          <Row
            className={usertransaction.user_paid_id === usertransaction.user_id ? 'paid' : 'owe'}
          >
            {usertransaction.user_paid_id === usertransaction.user_id ? <font color="#5bc5a7">You paid  &nbsp;
            {usertransaction.split_amount} </font>: <font color="#ff652f">You owe &nbsp;
            {usertransaction.split_amount} </font> }
          </Row>
          <Row>
            <Moment tz={localStorage.getItem('timezone')} className="billdate" format="dddd">{usertransaction.time_added}</Moment>
          </Row>
        </Col>
      </Row>
    );
  }
}
export default usertransaction;