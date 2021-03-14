import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { Fragment } from "react";
import Navbar from "./components/Layout/Navbar"
import "./App.css";
import { Landing } from "./components/Layout/Landing";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Landing />
      <Container>
      </Container>
    </Fragment>
    
  );
}

export default App;
