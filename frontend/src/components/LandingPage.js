import React, { Component } from 'react';
import '../App.css';
import { Redirect } from 'react-router';
import NavBar from './NavBar';
import background from "../images/Landingpage1.png";
import { Jumbotron, Container, Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";


class LandingPage extends Component {
	render() {
		let redirectVar = null;
		if (localStorage.getItem("user_id")) {
			redirectVar = <Redirect to="/home" />
		}
		return (
			<div>
				{redirectVar}
				
				<NavBar />
				<div >

					<Row>
						<Col sm={1}>&nbsp;</Col>
						<Col sm={4}>
							<Jumbotron style={{ zIndex: 10, background: 'none' }} fluid>
								<Container>
									<h1>Splitwise</h1>
									<h3 className="text-center text-lg-left text-xl-left text-muted font-weight-bold">Less stress when sharing expenses with housemates.</h3>
									<p className='text'>
										Keep track of your shared expenses and balances <br />with housemates, trips, groups, friends, and family.
								</p>
									<Link to="/signup" className="btn btn-info">Sign up</Link>
								</Container>
							</Jumbotron>
						</Col>
						<Col sm={7}>
							{/* <div style={{
								backgroundImage: `url(${background})`,
								backgroundPosition: 'left',
								backgroundSize: '40%',
								backgroundRepeat: 'no-repeat',
								width: '100vw',
								height: '100vh'
							}} /> */}
							<Image src={background} style={{ width:'95%', height:'90%', }}rounded />
						</Col>
					</Row>
				</div >
			</div>
		)
	}
}

export default LandingPage;