import React from 'react';
import "../../App.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export const Landing = () => {
  return (
    <Container fluid>
      <Row className="landing align-items-center">
        <Col className="text-center">
          <h1 className="text-uppercase display-1">
            Buy Nothing
          </h1>
        </Col>
    </Row>
    </Container>
    
  )
}
