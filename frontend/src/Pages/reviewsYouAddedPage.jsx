import React, { Component } from "react";
// import "././style_HomePage.css";
import ReviewsYouAdded from "../Components/ReviewsByYou/ReviewsYouAdded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../Components/Footer.js";
import NavBar from "../Components/NavBar.js";
import "../Styles/reviewsyouadded.css";

class ReviewsYouAddedPage extends Component {
  state = {
    ReviewsYouAdded: [{ reviewID: "0001" }, { reviewID: "0002" }, { reviewID: "0003" }],
    username: "GlendiBear",
  };

  handleDelete = (reviewID) => {
    //create new array without given counter
    console.log("delete called", reviewID);
    // const counters = this.state.counters.filter((c) => c.id !== counterId);
    // this.setState({ counters });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar event={this} username={this.state.username}></NavBar>
        <h2>Reviews You Added</h2>
        <div className="row">
          <h5>
            Here lies the reviews you have contributed to the ReadME community.
          </h5>
          <button className="add-book-bttn" id="add-book-bttn">
            <FontAwesomeIcon icon={faEdit} size="2x" /> 
            <div className="add-book-bttn-text">add review</div>
          </button>
        </div>

        <div className="container">
          <ReviewsYouAdded
            ReviewsYouAdded={this.state.ReviewsYouAdded}
            onDelete={this.handleDelete}
          />
        </div>
        <h5>Thank you for your support!</h5>

        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default ReviewsYouAddedPage;
