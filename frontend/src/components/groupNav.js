import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';




class groupNav extends Component {
    render() {
        const { group } = this.props;
        return (
                <Link className="nav-link" to={{ pathname: '/groupdetails', state: { groupname: this.props.group.groupname } }}>
                {this.props.group.groupname}
                </Link>
            
        );
      }
}
export default groupNav;