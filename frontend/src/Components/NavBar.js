import React from "react";
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

const NavBar = ({ event, username }) => {
  return (
    <Navbar className="navbar-bg" variant="dark" expand="lg">
      <Navbar.Brand className="navbrand">
        <img className="navbrand-img" alt="ReadME Logo" src={Logo} />
        ReadME
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav.Link>
          <container className="nav-main">
            <FontAwesomeIcon icon={faHome} size="3x" />
            home
          </container>
        </Nav.Link>
        <NavDropdown
          id="navdropdown"
          title={
            <container className="nav-sub">
              <FontAwesomeIcon icon={faUser} size="3x" />
              by me
            </container>
          }
        >
          <NavDropdown.Item className="item" onClick={() => event.props.history.push("/books-you-added")}>Books You Added</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item className="item" onClick={() => event.props.history.push("/reviews-you-added")}>Reviews By You</NavDropdown.Item>
        </NavDropdown>
        <Form inline className="ml-auto">
          <FormControl
            className="searchbar mr-sm-2"
            type="text"
            placeholder="&#xf002; search by author or title..."
          />
          <Button variant="outline-info">search</Button>
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
          <NavDropdown.Item className="item">Add Book</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item className="item">Add Review</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown
          id="navdropdown"
          className="ml-auto"
          title={
            <button className="user-bttn">
              <FontAwesomeIcon icon={faUserCircle} size="2x" />
              <text className="user-text">{username}</text>
            </button>
          }
        >
          <NavDropdown.Item className="item">Settings</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            className="item"
            onClick={() => event.props.history.push("/")}
          >
            Log Out
          </NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
