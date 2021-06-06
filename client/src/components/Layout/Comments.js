import React, {Fragment, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import {createComment} from "../../actions/comments";

function Comments(props) {
  const [formData, setFormData] = useState({text: ""})

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createComment(formData, props.token, props.postId);
    setFormData({text: ""})
    props.setIsLoading(!props.isLoading);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  }

  const {text} = formData;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row className="align-items-center" >
        <Col xs="11">
          <Form.Group style={{"margin": "0"}}>
            <Form.Control 
              className="mb-2" 
              placeholder="Write a Comment"
              value={text}
              onChange={onChange}
              name="text"
              />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Button type="submit" size="sm" variant="outline-dark" disabled={text ? false : true}>Submit</Button>
        </Col>
      </Form.Row>
    </Form>
  )
}

export default Comments
