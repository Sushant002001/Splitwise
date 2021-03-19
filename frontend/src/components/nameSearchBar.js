// import React, { Component } from 'react';
// import { Redirect } from 'react-router';
// // import { Link } from 'react-router-dom';
// import { Item } from 'semantic-ui-react';
// import Select from 'react-select';

// import { Row, Col, Button, Nav, ListGroup } from 'react-bootstrap';

// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import apiHost from '../config.js';
// import { select } from 'react-cookies';

// class nameSearchBar extends Component{
//     constructor(props){
//         super(props)
//         this.state={
//             user_name:null,
//         }
//     }


//     onChangeGroupSearch = (user_name) => {
//         if(user_name){
//             this.setState({
//                 user_name,
//             })
//             this.props.onSearch(user_name.value);
//         }else{
//             this.setState({
//                 user_name,
//             })
//         }
//     }
//     render(){
//         const searchList = this.props.displayGroupsnames.map((name) => ({
//             value: name,
//             label: name,
//           }));
//         console.log(this.state.groupname)
//         return (
//            <div>
//                <Select
//                 value = {this.state.groupname}
//                 options ={searchList}
//                 onChange={this.onChangeGroupSearch}
//                 placeholder="Search..."
//                 openMenuOnClick={false}
//                 classNamePrefix="select"
//                 isSearchable
//                  />
//            </div>

//         )
//     }
// }

// export default nameSearchBar;
