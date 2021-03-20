import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';
var numeral = require('numeral');


class Youareowed extends Component {
  render() {
    const { balance } = this.props;
    return (
        <div>
            <Row>
            <b>{balance.user_name2}</b>
        </Row>
        <Row>
        <p>owes you </p> &nbsp; <font color="#5bc5a7">{numeral(balance.amount).format('$0.00')}</font>
        </Row>
        </div>
        
    );
  }
}
export default Youareowed;