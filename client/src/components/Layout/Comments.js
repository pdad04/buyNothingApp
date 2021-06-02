import React, {Fragment} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

function Comments() {
  return (
    <>
      <Form.Row className="align-items-center">
        <Col xs="11">
          <Form.Group style={{"margin": "0"}}>
            <Form.Control className="mb-2" placeholder="Write a Comment"/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Button type="submit" size="sm" variant="outline-dark">Submit</Button>
        </Col>
      </Form.Row>
    </>
  )
}

export default Comments
