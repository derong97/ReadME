import React, { Component } from "react";
import axios from "axios";
import "../Styles/components.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faUserCircle,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

import Logo from "../Image/logo_white.png";
import AddBookModal from "../Components/AddModals/AddBookModal.jsx";
import AddReviewModal from "../Components/AddModals/AddReviewModal.jsx";

class NavBar extends Component {
  static filtered = "";

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      addBookModalShow: false,
      addReviewModalShow: false,
    };
  }

  handleChange = (evt) => {
    this.setState({
      search: evt.target.value,
    });
  };

  handleOnSubmit = (evt) => {
    this.props.event.setState({ searching: true });
    const url = "/books";
    const search = this.state.search;
    const body = {
      headers: { "x-access-tokens": this.props.token },
      params: { title: search, pageNum: 1 },
    };
    evt.preventDefault();
    axios
      .get(url, body)
      .then((res) => {
        const metadata = res.data.metadata;
        const count = res.data.total_counts;
        if (res.status === 200) {
          this.props.event.setState({ searching: false });
          this.props.event.props.history.push({
            pathname: "/search",
            state: {
              token: this.props.token,
              id: this.props.id,
              username: this.props.username,
              title: search,
              books: metadata == null ? [] : metadata,
              count: count,
              activePage: 1,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.request);
      });
  };

  addBookModalClose = () => this.setState({ addBookModalShow: false });
  addBookModalOpen = () => {
    this.setState({ addBookModalShow: true });
  };

  addReviewModalClose = () => this.setState({ addReviewModalShow: false });
  addReviewModalOpen = () => {
    this.setState({ addReviewModalShow: true });
  };

  render() {
    return (
      <React.Fragment>
        <Navbar className="navbar-bg" variant="dark" expand="lg">
          <Navbar.Brand className="navbrand">
            <img className="navbrand-img" alt="ReadME Logo" src={Logo} />
            ReadME
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav.Link
              onClick={() =>
                this.props.event.props.history.push({
                  pathname: "/main",
                  state: {
                    token: this.props.token,
                    id: this.props.id,
                    username: this.props.username,
                    books: [],
                    count: 0,
                    category: ["Kindle eBooks"],
                    activePage: 1,
                  },
                })
              }
            >
              <container className={this.props.home}>
                <FontAwesomeIcon icon={faHome} size="3x" />
                home
              </container>
            </Nav.Link>
            <Nav.Link
              onClick={() =>
                this.props.event.props.history.push({
                  pathname: "/reviews-you-added",
                  state: {
                    token: this.props.token,
                    id: this.props.id,
                    username: this.props.username,
                    reviewsYouAdded: [],
                  },
                })
              }
            >
              <container className={this.props.byme}>
                <FontAwesomeIcon icon={faUser} size="3x" />
                by me
              </container>
            </Nav.Link>
            <Form
              inline
              className="align-items-center"
              onSubmit={this.handleOnSubmit}
            >
              <FormControl
                className="searchbar mr-sm-2"
                type="text"
                value={this.state.search}
                onChange={this.handleChange}
                placeholder="&#xf002; search for book title..."
              />
              <Button type="submit" variant="outline-info">
                search
              </Button>
            </Form>
            <NavDropdown
              id="navdropdown"
              className="ml-auto"
              title={
                <container className="nav-sub">
                  <FontAwesomeIcon icon={faPlusCircle} size="4x" />
                </container>
              }
            >
              <NavDropdown.Item
                className="item"
                onClick={this.addBookModalOpen}
              >
                Add Book
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                className="item"
                onClick={this.addReviewModalOpen}
              >
                Add Review
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              id="navdropdown"
              className="ml-auto"
              title={
                <button className="user-bttn">
                  <FontAwesomeIcon icon={faUserCircle} size="2x" />
                  <text className="user-text">{this.props.username}</text>
                </button>
              }
            >
              <NavDropdown.Item className="item">Settings</NavDropdown.Item>
              <NavDropdown.Item
                className="item"
                onClick={() => this.props.event.props.history.push("/")}
              >
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Navbar>

        <div>
          <AddBookModal
            show={this.state.addBookModalShow}
            onHide={this.addBookModalClose}
            token={this.props.token}
          />
        </div>

        <div>
          <AddReviewModal
            event={this.props.event}
            token={this.props.token}
            id={this.props.id}
            username={this.props.username}
            show={this.state.addReviewModalShow}
            onHide={this.addReviewModalClose}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default NavBar;
