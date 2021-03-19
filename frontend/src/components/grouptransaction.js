import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';
var numeral = require('numeral');


class grouptransaction extends Component {
  render() {
    const { transaction } = this.props;
    return (
      <Row>
        <Col md={2}><Moment format="MMM DD">{transaction.time_added}</Moment></Col>
        <Col md={6}>{transaction.bill_name}</Col>
        <Col md={2}>
          <Row>
            <Col>
              <Row style={{ fontSize: '12px', color: 'grey' }}>
                {transaction.paid_by_name}
                {' '}
                paid
              </Row>
              <Row>{numeral(transaction.amount).format('$0.00')}</Row>
            </Col>
          </Row>
        </Col>
        <Col md={2}>
          <Row>
            <Col>
              <Row style={{ fontSize: '12px', color: 'grey' }}>
                { transaction.user_paid_id === transaction.user_id ? (
                  <p>
                    you lent
                  </p>
                ) : (
                  <p>
                    {transaction.paid_by_name}
                    {' '}
                    lent you
                  </p>
                ) }
              </Row>
              <Row>{numeral(transaction.split_amount).format('$0.00')}</Row>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
export default grouptransaction;