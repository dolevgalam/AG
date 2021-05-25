import React, { Component } from 'react'
import { Form, Button, Container, } from 'react-bootstrap'
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
/*"id": "123456789",
"firstname": "Dolev",
"lastname": "Galam",
"dateofbirth": "01/01/1991",
"email": "dolev@gmail.com",
"city": "aaaaa",
"address": "bbbbbb",
"phone": "0500500505",
"password": "2345345435"*/
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      firstname: '',
      lastname: '',
      dateofbirth: '',
      city: '',
      address: '',
      phone: '',
      email: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  handleSubmit(event) {
    axios.post('http://localhost:3001/auth/register', {
      id: this.state.id,
      dateofbirth: this.state.dateofbirth,
      city: this.state.city,
      address: this.state.address,
      phone: this.state.phone,
      email: this.state.email,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname
    }).then(function (res) {
      console.log(res);
      alert("success");
      return <Redirect to='login' />
      //localStorage.setItem('token', res.data.access);
      //localStorage.setItem('user', res.config.data);
    }).catch(function (err) {
      console.log(err)
    })
    event.preventDefault();
  }
  render() {
    return (
      <Container style={{ marginTop: '50px' }}>
        <Form>
          <Form.Group controlId="formBasicId" style={{ width: '300px' }}>
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" placeholder="Enter ID" name="id" value={this.state.id} onChange={this.onChange} />
          </Form.Group>
          <Form.Group controlId="formBasicFirstName" style={{ width: '300px' }}>
            <Form.Label>First name</Form.Label>
            <Form.Control type="text" placeholder="Enter First Name" name="firstname" value={this.state.firstname} onChange={this.onChange} />
          </Form.Group>
          <Form.Group controlId="formBasicLastName" style={{ width: '300px' }}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Last Name" name="lastname" value={this.state.lastname} onChange={this.onChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail" style={{ width: '300px' }}>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="text" placeholder="Enter email" name="email" value={this.state.email} onChange={this.onChange} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" style={{ width: '300px' }}>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
          </Form.Group>
          <Form.Group controlId="formBasicCity" style={{ width: '300px' }}>
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" name="city" value={this.state.city} onChange={this.onChange} />
          </Form.Group>
          <Form.Group controlId="formBasicAddress" style={{ width: '300px' }}>
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Address" name="address" value={this.state.address} onChange={this.onChange} />
          </Form.Group>
          <Form.Group controlId="formBasicPhone" style={{ width: '300px' }}>
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" placeholder="Phone" name="phone" value={this.state.phone} onChange={this.onChange} />
          </Form.Group>
          <Form.Group controlId="formBasicDateofbirth" style={{ width: '300px' }}>
            <Form.Label>Dateofbirth</Form.Label>
            <Form.Control type="date" placeholder="Dateofbirth" name="dateofbirth" value={this.state.dateofbirth} onChange={this.onChange} />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Register
            </Button>
        </Form>



      </Container>


    )
  }
}