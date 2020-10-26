import React, { Component } from "react";
// import "././style_HomePage.css";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../Image/logo_white.png";
import BooksYouAdded from "./BooksYouAdded";
import "../style_BooksYouAddedPage.css";

class BooksYouAddedPage extends Component {
  state = {
    BooksYouAdded: [{ asin: "0001" }, { asin: "0002" }, { asin: "0003" }],
  };

  handleDelete = (asin) => {
    //create new array without given counter
    console.log("delete called", asin);
    // const counters = this.state.counters.filter((c) => c.id !== counterId);
    // this.setState({ counters });
  };

  render() {
    return (
      <React.Fragment>
        <Navbar bg="dark" expand="lg">
          <Navbar.Brand className="navbrand">
            <img alt="ReadME Logo" src={Logo} width="45" height="auto" />
            ReadME
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown.Divider />
              <Nav.Link href="#home">Home</Nav.Link>
              <NavDropdown title="By Me" id="basic-nav-dropdown">
                <NavDropdown.Item href="#books-you-added">
                  Books You Added
                </NavDropdown.Item>
                <NavDropdown.Item href="#Reviews by You">
                  Reviews By You
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="search by author or title..."
                className="mr-sm-2"
              />
              <Button variant="outline-success">let's go</Button>
            </Form>

            <Nav className="mr-auto">
              <NavDropdown.Divider />
              <Nav.Link href="#my-profile">My Profile</Nav.Link>
              <NavDropdown title="Add" id="basic-nav-dropdown">
                <NavDropdown.Item href="#add-review">
                  Add Review
                </NavDropdown.Item>
                <NavDropdown.Item href="#add-book">Add Book</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <h2>Books You Added</h2>
        <div className="row">
          <h5>
            Here lies the books you have contributed to the ReadME community.
          </h5>
          <button className="add-book-bttn">add book</button>
        </div>

        <div className="container">
          <BooksYouAdded
            BooksYouAdded={this.state.BooksYouAdded}
            onDelete={this.handleDelete}
          />
        </div>
        <h5>Thank you for your support!</h5>

        {/* <main className="container">
          <BooksYouAdded
            BooksYouAdded={this.state.BooksYouAdded}
            onDelete={this.handleDelete}
          />
        </main> */}

        {/* <footer>
          <Nav className="justify-content-end">
            <Nav.Item>
              <Nav.Link className="navlink">Contact Us</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="navlink">About Us</Nav.Link>
            </Nav.Item>
          </Nav>
        </footer> */}
      </React.Fragment>
    );
  }
}

export default BooksYouAddedPage;
