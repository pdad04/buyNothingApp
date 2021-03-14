import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

const NavigationBar = () => {
  return(
    <Navbar className="justify-content-end" bg="dark" variant="dark">
      <Nav>
        <Nav.Link href="#Login">Login</Nav.Link>
        <Nav.Link href="#Home">Home</Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default NavigationBar;