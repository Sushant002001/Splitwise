import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';




class groupNav extends Component {
    render() {
        const { group } = this.props;
        return (
            <div>
            <Row>
                <Link to={{ pathname: '/groupdetails', state: { groupname: this.props.group.groupname } }}>
                <Button variant="link">{this.props.group.groupname}</Button>
                </Link>
            </Row>
            </div>
            
        );
      }
}
export default groupNav;