import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';
import 'moment-timezone';


class Youowe extends Component {
    render() {
        const { balance } = this.props;
        return (
            <div>
                <Row>
               <b>{balance.user_name2}</b>
            </Row>
            <Row>
                <p>you owe </p> &nbsp; {Math.abs(balance.amount)}
            </Row>
            </div>
            
        );
      }
}
export default Youowe;