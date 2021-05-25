import React, { Component } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import axios from "axios";
//import jwt from 'jwt-decode';
var jwt = require("jsonwebtoken");

export default class Login extends Component {
constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
onChange = (e) => this.setState({ [e.target.name]: e.target.value });
handleSubmit(event) {
    console.log(this.state.email);
    console.log(this.state.password);
    axios.post('http://localhost:3001/auth/login/',{
        email: this.state.email,
        password: this.state.password,
    }).then(function (res){
        console.log(res.data);
        // save res.data to send with http
        var jwtd = jwt.decode(res.data)._id;
        // send to ui 
        // http://localhost:3001/user/jwtd
        // res.email
        console.log(jwtd._id);
        localStorage.setItem('token', res.data.access);
        localStorage.setItem('user', res.config.data);
    }).catch(function (err){
        console.log(err);
    })
    event.preventDefault();
}
render() {
  return (
    <Container style={{ marginTop: '100px' }}>
      <Form>
        <Form.Group controlId="formBasicEmail" style={{ width: '300px' }}> <Form.Label>Email address</Form.Label>
            <Form.Control type="text" placeholder="Enter email" name="email" value={this.state.email} onChange={this.onChange}/>           
        </Form.Group>
        
        <Form.Group controlId="formBasicPassword" style={{ width: '300px' }}>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange}/>
        </Form.Group>
        
       {/* <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
       </Form.Group> */}
        
       <Button variant="primary" type="submit" onClick={this.handleSubmit}>
Sign In
        </Button>
      </Form>
    </Container>
   )
 }
}