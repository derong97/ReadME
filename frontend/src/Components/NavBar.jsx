import React, { Component } from "react";
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
import "../Styles/components.css";

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

  // handleChange = (evt) => {
  //   // pass the list of book titles
  //   let currentList = ["dog", "cat"];
  //   let newList = [];

  //   if (event.target.value !== "") {
  //     currentList = this.props.items;
  //     newList = currentList.filter((item) => {
  //       const lc = item.toLowerCase();
  //       const filter = event.target.value.toLowerCase();
  //       return lc.includes(filter);
  //     });
  //   } else {
  //     newList = this.props.items;
  //   }
  //   this.setState({
  //     filtered: newList,
  //   });
  // };

  // handleOnSubmit = (evt, title) => {
  //   const url = "";
  //   const body = {
  //     params: { title: title },
  //   };
  //   console.log(body);
  //   evt.preventDefault();
  //   axios
  //     .get(url, body)
  //     .then((res) => {
  //       console.log(res);
  //       // retrieve top 30 books
  //       const books = JSON.stringify(res.data);
  //       if (res.status === 200) {
  //         event.props.history.push({
  //           pathname: "/book",
  //           state: { books: { books } },
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //       console.log(err.request);
  //     });
  // };

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
              onClick={() => this.props.event.props.history.push("/main")}
            >
              <container className={this.props.home}>
                <FontAwesomeIcon icon={faHome} size="3x" />
                home
              </container>
            </Nav.Link>
            <Nav.Link
              onClick={() =>
                this.props.event.props.history.push("/reviews-you-added")
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
              // onSubmit={handleOnSubmit()}
            >
              <FormControl
                className="searchbar mr-sm-2"
                type="text"
                // onChange={this.handleChange}
                value={NavBar.filtered}
                placeholder="&#xf002; search by author or title..."
              />
              <Button
                variant="outline-info"
                onClick={() => this.props.event.props.history.push("/search")}
                // onClick={() => handleOnSubmit(filtered)}
              >
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
              <NavDropdown.Divider />
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
          />
        </div>

        <div>
          <AddReviewModal
            show={this.state.addReviewModalShow}
            onHide={this.addReviewModalClose}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default NavBar;
