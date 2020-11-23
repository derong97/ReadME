import React from "react";
import axios from "axios";
import "../Styles/login.css";
import { Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";

class SignupPage extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
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

  checklogin = (evt) => {
    const isValid = this.validate();
    if (isValid) {
      this.setState({ loading: true });
      const url = "/user/signup"; //"http://localhost:5000/user/signup";
      var username = document.getElementById("username").value;
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;

      console.log(username);
      console.log(password);
      console.log(email);

      const body = {
        name: username,
        email: email,
        password: password,
      };
      console.log(body);

      evt.preventDefault();
      axios
        .post(url, body)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.setState({ loading: false });
            this.props.history.push({
              pathname: "/main",
            });
          }
        })
        .catch((err) => {
          this.setState({ loading: false });
          console.log(err.response);
          console.log(err.request);
        });
    } else {
      evt.preventDefault();
    }
  };

  validate = () => {
    let userError = "";
    let emailError = "";
    let passwordError = "";

    if (!this.state.username) userError = "* Username cannot be empty";
    if (!this.state.email) emailError = "* Email cannot be empty";
    if (!this.state.password) passwordError = "* Password cannot be empty";

    if (userError || emailError || passwordError) {
      this.setState({ userError, emailError, passwordError });
      return false;
    }
    return true;
  };

  render() {
    return (
      <LoadingOverlay active={this.state.loading} spinner text="signing up ...">
        <body id="body-bg">
          <div id="image-bg"></div>
          <div id="form-bg">
            <h3 id="form-header">Sign up for free!</h3>
            <Form id="form" onSubmit={this.checklogin}>
              <div id="signup-error">{this.state.userError}</div>
              <Form.Group as={Row} id="form-group">
                <Form.Label column sm="2">
                  Username
                </Form.Label>
                <Col sm="6">
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
              <div id="signup-error">{this.state.emailError}</div>
              <Form.Group as={Row} id="form-group">
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="6">
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
              <div id="signup-error">{this.state.passwordError}</div>
              <Form.Group as={Row} id="form-group">
                <Form.Label column sm="2">
                  Password
                </Form.Label>
                <Col sm="6">
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
                <button type="submit" id="confirm-bttn">
                  Sign up
                </button>
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
      </LoadingOverlay>
    );
  }
}

export default SignupPage;
