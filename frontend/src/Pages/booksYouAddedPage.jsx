import React, { Component } from "react";
import BooksYouAdded from "../Components/BooksYouAdded/BooksYouAdded.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookMedical } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Components/Footer.jsx";
import NavBar from "../Components/NavBar.jsx";
import AddBookModal from "../Components/AddModals/AddBookModal.jsx";
import "../Styles/booksyouadded.css";

class BooksYouAddedPage extends Component {
  state = {
    BooksYouAdded: [
      { asin: "0001" },
      { asin: "0002" },
      { asin: "0003" },
      { asin: "0004" },
    ],
    username: "GlendiBear",
    addBookModalShow: false,
  };

  handleDelete = (asin) => {
    //create new array without given counter
    console.log("delete called", asin);
    // const counters = this.state.counters.filter((c) => c.id !== counterId);
    // this.setState({ counters });
  };

  addModalClose = () => this.setState({ addBookModalShow: false });
  addModalOpen = () => {
    this.setState({ addBookModalShow: true });
    console.log("add book show?", this.state.addBookModalShow);
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          event={this}
          username={this.state.username}
          home="nav-sub"
          byme="nav-main"
        ></NavBar>
        <h2>Books You Added</h2>
        <div className="row">
          <h5>
            Here are the books you have contributed to the ReadME community.
          </h5>

          <button
            className="add-book-bttn"
            id="add-book-bttn"
            onClick={this.addModalOpen}
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            <FontAwesomeIcon icon={faBookMedical} size="2x" />
            <div className="add-book-bttn-text">add book</div>
          </button>
        </div>

        <br></br>
        <br></br>

        <div>
          <AddBookModal
            show={this.state.addBookModalShow}
            onHide={this.addModalClose}
          />
        </div>

        <div className="container">
          <BooksYouAdded
            BooksYouAdded={this.state.BooksYouAdded}
            onDelete={this.handleDelete}
          />
        </div>

        <br></br>
        <br></br>

        <h5>Thank you for your support!</h5>

        <br></br>
        <br></br>

        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default BooksYouAddedPage;
