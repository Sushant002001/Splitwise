import React, { Component } from 'react';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { Item } from 'semantic-ui-react';
import Select from 'react-select';

import { Row, Col, Button, Nav, ListGroup } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import axios from 'axios';
import apiHost from '../config.js';
import { select } from 'react-cookies';

class groupsearchbar extends Component{
    constructor(props){
        super(props)
        this.state={
            groupname:null,
        }
    }


    onChangeGroupSearch = (groupname) => {
        if(groupname){
            this.setState({
                groupname,
            })
            this.props.onSearch(groupname.value);
        }else{
            this.setState({
                groupname,
            })
        }
    }
    render(){
        console.log(this.props.displayGroupsnames)
        const searchList = this.props.displayGroupsnames.map((name) => ({
            value: name,
            label: name,
          }));
        console.log(this.state.groupname)
        return (
           <div>
               <Select
                value = {this.state.groupname}
                options ={searchList}
                onChange={this.onChangeGroupSearch}
                placeholder="Search..."
                openMenuOnClick={false}
                classNamePrefix="select"
                isSearchable
                 />
           </div>

        )
    }
}

export default groupsearchbar
