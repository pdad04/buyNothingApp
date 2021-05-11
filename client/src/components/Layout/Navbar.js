import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

const NavigationBar = (props) => {
  const logout = () => {
    window.localStorage.removeItem("token");
  }

  return(
    <Navbar className="justify-content-end" bg="dark" variant="dark">
      <Nav>
        {props.isLoggedIn ? <Nav.Link href="/login" onSelect={logout}>Logout</Nav.Link> : <Nav.Link href="/login">Login</Nav.Link>}
        <Nav.Link href="#Home">Home</Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default NavigationBar;