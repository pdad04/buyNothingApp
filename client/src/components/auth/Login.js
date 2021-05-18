import React, { Fragment, useState } from "react";
import { login } from "../../actions/auth";
import alerts from "../Layout/Alerts";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

const Login = (props) => {
  const [formData, setFormDate] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = e => {
    setFormDate({ ...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);

    if(res.status !== 200){
      props.error(res.data.errors);
    }else{
      props.error([])
      window.localStorage.setItem("token", res.data.token);
    }

  }

  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            type="email"
            name="email"
            placeholder="Enter email address" 
            value={email}
            onChange={e => onChange(e)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={e => onChange(e)}
         />
        </Form.Group>
      
      <Button variant="outline-dark" type="submit">Login</Button>
      <p>Don't have an account? <NavLink to="/register">Register Here</NavLink></p>
      </Form>
    </Fragment>
  )
}

export default Login
