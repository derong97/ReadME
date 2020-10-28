import React from "react";
import axios from "axios";
import "../Styles/login.css";
import { Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

class SignupPage extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  handleUsernameChange = (evt) => {
    this.setState({
      username: evt.target.value,
    });
  };

  handleEmailChange = (evt) => {
    this.setState({
      email: evt.target.value,
    });
  };

  handlePasswordChange = (evt) => {
    this.setState({
      password: evt.target.value,
    });
  };

  checklogin = () => {
    const url = "/user/signup";
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    console.log(username);
    console.log(password);
    console.log(email);

    const body = {
      name: username,
      password: password,
    };
    axios
      .post(url, body)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <body id="body-bg">
        <div id="image-bg"></div>
        <div id="form-bg">
          <h3 id="form-header">Sign up for free!</h3>
          <Form id="form" onSubmit={this.checklogin}>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Username
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  id="username"
                  type="text"
                  autoComplete="username"
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                  placeholder="Enter a username"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  placeholder="Enter your email"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  placeholder="Create a password"
                />
              </Col>
            </Form.Group>

            <div id="form-bttn">
              <Link exact to="/main">
                <button type="submit" id="confirm-bttn">
                  Sign up
                </button>
              </Link>
              <div id="alt-bg">
                <Link exact to="/login">
                  <button id="alt-bttn">
                    Have an account? <u>Log in</u>
                  </button>
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </body>
    );
  }
}

export default SignupPage;
