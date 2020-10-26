import React from "react";
import { Nav } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Nav className="justify-content-end">
        <Nav.Link className="navlink">Contact Us</Nav.Link>
        <Nav.Link className="navlink">About Us</Nav.Link>
      </Nav>
    </footer>
  );
};

export default Footer;
