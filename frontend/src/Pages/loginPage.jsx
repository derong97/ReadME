import React from "react";
import axios from "axios";
import "../Styles/login.css";
import { Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
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

  checkLogin = (evt) => {
    this.setState({ loading: true });
    const url = "http://localhost:5000/user/login";
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log(email);
    console.log(password);

    const body = {
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
        this.validate();
        console.log(err.response);
        console.log(err.request);
      });
  };

  validate = () => {
    let error = "* Invalid email or password";
    this.setState({ error });
  };

  render() {
    return (
      <LoadingOverlay active={this.state.loading} spinner text="signing in ...">
        <body id="body-bg">
          <div id="image-bg"></div>
          <div id="form-bg">
            <h3 id="form-header">Welcome back!</h3>
            <Form id="form" onSubmit={this.checkLogin}>
              <div id="error">{this.state.error}</div>
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
                    placeholder="Enter your password"
                  />
                </Col>
              </Form.Group>

              <div id="form-bttn">
                <button type="submit" id="confirm-bttn">
                  Login
                </button>
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
      </LoadingOverlay>
    );
  }
}

export default LoginPage;
