import React from "react";
import "../Styles/login.css";
import { Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

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
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log(email);
    console.log(password);
  };

  render() {
    return (
      <body id="body-bg">
        <div id="image-bg"></div>
        <div id="form-bg">
          <h3 id="form-header">Welcome back!</h3>
          <Form id="form" onSubmit={this.checklogin}>
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
                  placeholder="Enter your password"
                />
              </Col>
            </Form.Group>

            <div id="form-bttn">
              <Link exact to="/main">
                <button type="submit" id="confirm-bttn">
                  Login
                </button>
              </Link>
              <text id="forgotpw-bttn">
                <u>forgot password?</u>
              </text>
              <div id="alt-bg">
                <text>Don't have an account?</text>
                <Link exact to="/signup">
                  <button id="alt-bttn">Create new account</button>
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </body>
    );
  }
}

export default LoginPage;
