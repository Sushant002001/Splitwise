import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';
import 'moment-timezone';


class usertransaction extends Component {
  render() {
    const { usertransaction } = this.props;
    return (
      <Row>
        <Col>
          <Row>
            <b>{usertransaction.paid_by_name}</b>
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
            {usertransaction.user_paid_id === usertransaction.user_id ? 'You paid' : 'You owe' }
            &nbsp;
            {usertransaction.split_amount}
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