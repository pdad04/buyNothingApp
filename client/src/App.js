import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Navbar from "./components/Layout/Navbar";
import Login from "./components/auth/Login";
import Posts from "./components/Layout/Posts";
import { Landing } from "./components/Layout/Landing";
import "./App.css";
import Alerts from "./components/Layout/Alerts";
import CreateUser from "./components/Layout/CreateUser";

function App() {
  const [errors, setErrors] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(window.localStorage.getItem("token"));
  })

  return (
    <Fragment>
      <Router>
        <Navbar isLoggedIn={token}/>
        <Route exact path="/" component={Landing} />
        <Container>
          {!errors.length ? <></> : <Alerts errors={errors} handleError={setErrors}/> }
          <Switch>
            <Route 
              exact path="/login" 
              render={ token ? (props) => <Redirect push to="/posts" {...props} /> : (props) => (<Login error={setErrors} isLoggedIn={setToken} {...props} />)}
            />
            <Route 
              exact path="/posts" 
              render={(props) => (<Posts token={token} error={setErrors} {...props} />)} 
            />
            <Route 
              exact path="/register"
              render={ token ? (props) => <Redirect to="/posts" {...props} /> : (props) => (<CreateUser error={setErrors} isLoggedIn={setToken} {...props} />)}
            />
          </Switch>
        </Container>
      </Router>
    </Fragment>
    
  );
}

export default App;
