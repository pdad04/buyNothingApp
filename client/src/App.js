import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { Fragment } from "react";
import Navbar from "./components/Layout/Navbar";
import Login from "./components/auth/Login";
import { Landing } from "./components/Layout/Landing";
import "./App.css";
import Alerts from "./components/Layout/Alerts";

function App() {
  return (
    <Fragment>
      <Router>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Container>
          <Alerts error="false"/>
          <Switch>
            <Route exact path="/login" component={Login} />
          </Switch>
        </Container>
      </Router>
    </Fragment>
    
  );
}

export default App;
