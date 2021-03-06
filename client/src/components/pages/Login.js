import React, { useState, useEffect, Component } from "react";
import { Form, Button, Container } from 'react-bootstrap'
import axios from "axios";
import { useHistory } from "react-router-dom";


//import jwt from 'jwt-decode';



function Login({setAlert}) {
    var jwt = require("jsonwebtoken");
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        console.log(email);
        console.log(password);
        axios.post('http://localhost:3001/auth/login/', {
            email: email,
            password: password,
        }).then(function (res) {
            console.log("123")
            console.log(res.data);
            // save res.data to send with http
            var jwtd = jwt.decode(res.data)._id;
            // send to ui 
            // http://localhost:3001/user/jwtd
            // res.email
            console.log(jwtd._id);
            localStorage.setItem('token', res.data);
            localStorage.setItem('user', res.config.data);
            localStorage.setItem('mail', email);
            setAlert({severity:"success",message:"התחברות בוצעה בהצלחה! ברוך הבא למערכת",status:1})
            setTimeout(() => {
                var x = axios.get("http://localhost:3001/auth/login/prem/" + localStorage.user)
                setAlert({status:0})
                history.push("/");
              }, 2000);
        }).catch(function (err) {
            console.log("456");
            console.log(err.response.data);
            setAlert({severity:"error",message:err.response.data,status:1})
            setTimeout(() => {
                setAlert({status:0})
              }, 2000);
            // console.log(err);
        })
        event.preventDefault();
    }
    function handleInputChangeEmail(event) {
        setEmail(event.target.value);
    }
    function handleInputChangePass(event) {
        setPassword(event.target.value);
    }

    return (
        <Container style={{ marginTop: '100px' }}>
            <Form>
                <Form.Group controlId="formBasicEmail" style={{ width: '300px' }}> <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={handleInputChangeEmail} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" style={{ width: '300px' }}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={handleInputChangePass} />
                </Form.Group>

                {/* <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
           </Form.Group> */}

                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Sign In
            </Button>

            </Form>
        </Container>
    );
}





export default Login;