import axios from "axios";
import React, {useEffect, useState, Fragment} from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import {allPosts} from "../../actions/posts";

function Posts(props) {
  const [posts, setPosts] = useState([])

  useEffect(() => {

    async function getPosts() {
      const res = await allPosts();
      setPosts([...posts, ...res.data]);
    };

    getPosts();
    
  },[]);

  return (
    props.token ? 
      <Container>
        {posts.map( (post,idx)=>
        <Row className="justify-content-sm-center" style={{"margin-top": "2rem"}}>
          <Col lg="12" key={idx}>
            <Card border="dark">
              <Card.Header>
                <Row>
                  <Col xs="6" lg="5">{post.userName}</Col>
                  <Col><h6>{post.title}</h6></Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Card.Text>{post.text}</Card.Text>
                <Row className="justify-content-sm-center">
                  <Col xs="6">
                    {post.photo ? <Image src={post.photo.url} fluid /> : <></>}
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <Button variant="outline-dark" size="sm">Comment</Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>)}
      </Container> 
      : 
      <div></div>
  )
}

export default Posts
