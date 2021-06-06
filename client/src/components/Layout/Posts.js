import axios from "axios";
import React, {useEffect, useState, Fragment} from "react";
import DayJS from "react-dayjs";
import jwtDecode from "jwt-decode";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import {allPosts} from "../../actions/posts";
import {deleteComment} from "../../actions/comments";
import Comments from "./Comments";

function Posts(props) {
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [targetComment, setTargetComment] = useState(null)
  const decoded = props.token ? jwtDecode(props.token) : null;
  const currentUser = decoded?._id;

  useEffect(() => {
    const getPosts = async () => {
      const res = await allPosts();
      setPosts([...res.data])
    }
 
    getPosts();
    setIsLoading(false)
    
  },[isLoading]);

  const onClick = (id) => {
    setTargetComment(id)
    setOpen(!open)
  }

  const removeComment =  async (commentId) => {
    setIsLoading(!isLoading);
    const res = await deleteComment(commentId, props.token)

  }

  return (
    props.token ? 
      <Container>
        {posts.map( (post,idx)=>
        <Row className="justify-content-sm-center" style={{"marginTop": "2rem"}} key={idx}>
          <Col lg="12">
            <Card border="dark">
              <Card.Header>
                <Row>
                  <Col xs="6" lg="5">{post.userName}</Col>
                  <Col><h6>{post.title}</h6></Col>
                  <Col xs="6" lg="2"><small>Posted:
                    <DayJS format=" MMM DD, YYYY">{post.createdAt}</DayJS></small>
                  </Col>
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
                 <Button variant="outline-dark" size="sm" onClick={() => onClick(idx)} aria-expanded={open} aria-controls={idx}>Comment <i className="far fa-comment-alt"></i></Button>
              </Card.Footer>
              <Collapse in={targetComment === idx ? open : false}>
                <div id={idx} style={{"marginTop": "0.5rem", "marginLeft":"0.5rem"}}>
                  <Comments 
                    token={props.token}
                    postId={post._id}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading} 
                  />
                </div>
              </Collapse>
              {post.comments ? post.comments.map((comment,idx) => 
                <Row key={comment._id} style={{marginTop:"0.5rem", marginBottom:"0.5rem"}} noGutters>
                  <Card bg="dark" text="light" style={{marginLeft:"0.5rem", marginRight: "0.5rem"}}>
                    <Row className="align-items-center" style={{padding:"0.5rem"}}>
                      <Col xs="auto">
                          <Card.Text className="lead"><small>{comment.text}</small></Card.Text>
                      </Col>
                      <Col xs="auto">
                        <small><DayJS format="MMM DD, YYYY">{Comment.createdAt}</DayJS></small>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{marginLeft:"0.5rem", marginBottom:"0.25rem"}}>
                        {comment.userId === currentUser ? <Button variant="danger" size="sm" onClick={() => removeComment(comment._id)}><i className="far fa-trash-alt"></i></Button> : <></>}
                      </Col>
                    </Row>
                  </Card>
                </Row>
              ) : <></>}
            </Card>
          </Col>
        </Row>)}
      </Container> 
      : 
      <div></div>
  )
}

export default Posts
