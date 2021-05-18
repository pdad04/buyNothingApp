import React, {Fragment, useEffect, useState} from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import {register} from "../../actions/auth";

const CreateUser = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    }
  )
  const [verifyPass, setVerifyPass] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const {userName, email, password, zipCode} = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(formData);

    if(res.status !== 200){
      props.error(res.data.errors)
    }else{
      props.error([])
      window.localStorage.setItem("token", res.data.token);
    }
  }

  const onChange = (e) => {
    e.target.id === "verifyPassword" ? setVerifyPass(e.target.value) :  setFormData({ ...formData, [e.target.name]: e.target.value});
  }

  useEffect(() => {
    password !== verifyPass && verifyPass ? setPasswordMatch(false) : setPasswordMatch(true)
    props.error([])
  },[verifyPass, props.error, password])

  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text"
            name="name"
            placeholder="Full Name"
            value={userName}
            onChange={e => onChange(e)}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            type="email"
            name="email"
            placeholder="Enter email address" 
            value={email}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            required
            type="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={e => onChange(e)}
         />
        </Form.Group>

        <Form.Group controlId="verifyPassword">
          <Form.Label>Re-Enter Password</Form.Label>
            <InputGroup hasValidation>
              {!passwordMatch ?  <Fragment><Form.Control
              type="password"
              name="verifyPassword"
              placholder="Re-Enter Password"
              isInvalid
              value={verifyPass}
              onChange={e => onChange(e)}
            />
            <Form.Control.Feedback type="invalid">Password's do not match</Form.Control.Feedback></Fragment> : <Form.Control
            type="password"
            name="verifyPassword"
            placeholder="Re-Enter Password"
            value={verifyPass}
            onChange={e => onChange(e)}
          />}
            </InputGroup>
        </Form.Group>

        <Form.Group controlId="zipcode">
          <Form.Label>Zip/Postal Code</Form.Label>
          <Form.Control 
            type="text"
            name="location"
            placeholder="Enter Zip/Postal Code"
            value={zipCode}
            onChange={e => onChange(e)}
          />
        </Form.Group>
      <Button variant="outline-dark" type="submit">Register</Button>
      </Form>
    </Fragment>
  )
}

export default CreateUser
