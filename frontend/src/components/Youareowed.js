import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';


class Youareowed extends Component {
  render() {
    const { balance } = this.props;
    return (
        <div>
            <Row>
            <b>{balance.user_name2}</b>
        </Row>
        <Row>
            <p>owes you </p> &nbsp; {balance.amount}
        </Row>
        </div>
        
    );
  }
}
export default Youareowed;