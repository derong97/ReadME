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
import Logo from "../Image/logo_white.png";
import BooksYouAdded from "../Components/BooksYouAdded/BooksYouAdded";
import Footer from "../Components/Footer.js";
import NavBar from "../Components/NavBar.js";
import "../Styles/booksyouadded.css";

class BooksYouAddedPage extends Component {
  state = {
    BooksYouAdded: [{ asin: "0001" }, { asin: "0002" }, { asin: "0003" }],
    username: "GlendiBear",
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
        <NavBar event={this} username={this.state.username}></NavBar>
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

        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default BooksYouAddedPage;
