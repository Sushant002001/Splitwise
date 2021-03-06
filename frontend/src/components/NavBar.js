import React, { Component } from "react";
import { Navbar, Nav, Dropdown, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import splitwiseLogo from "../images/splitwise.svg";
import userIcon from "../images/sp-ellie.svg";
import { userLogout } from '../actions/loginUserAction';
import { Link } from "react-router-dom";

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      username: localStorage.getItem("username")
    }
  }

  //handle logout to destroy the cookie
  handleLogout = () => {
    window.localStorage.clear();
    this.props.userLogout();
  };

  render() {
    let navUser = null;
    let nameDropDown = "USER";

    nameDropDown = (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          <Image src={userIcon} style={{width:20, height:'auto'}} /> &nbsp; &nbsp; Hi, {this.state.username}!
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item><Link to="/profile" className="nav-link">Your Account</Link></Dropdown.Item>
          <Dropdown.Item><Link to="/creategroup" className="nav-link">Create a Group</Link></Dropdown.Item>
          <Dropdown.Item><Link to="/mygroups" className="nav-link">My Groups</Link></Dropdown.Item>
          <Dropdown.Item><Link to="/" className="nav-link" onClick={this.handleLogout}>Log out</Link></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    if (sessionStorage.getItem("username")) {
      navUser = (
        <div class="collapse navbar-collapse navbar-right" id="navbarNav">
          <Nav className="mr-auto">
          </Nav>
          <Nav.Item><Link to="/home">Home</Link></Nav.Item>
          <Nav.Item><Nav.Link>{nameDropDown}</Nav.Link></Nav.Item>
        </div>
      );
    } else {
      navUser = (
        <div class="collapse navbar-collapse navbar-right" id="navbarNav">
          <Nav className="mr-auto">
          </Nav>
          <Nav.Item><Nav.Link href="/signup" >&nbsp;Sign Up</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/login" >&nbsp;Login</Nav.Link></Nav.Item>
        </div>
      );
    }
    return (
      <div>
        <Navbar bg="light" variant="light">
          <Navbar.Brand>
            <Nav.Link href="/">
              <img src={splitwiseLogo} width="100" height="auto" class="d-inline-block align-top" alt="Splitwise" />
            </Nav.Link>
          </Navbar.Brand>
          {navUser}
        </Navbar>
      </div>
    );
  }
}
export default connect(null, { userLogout })(NavBar);