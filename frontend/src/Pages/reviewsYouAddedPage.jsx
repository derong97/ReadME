import React, { Component } from "react";
// import "././style_HomePage.css";
import ReviewsYouAdded from "../Components/ReviewsByYou/ReviewsYouAdded.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Components/Footer.jsx";
import NavBar from "../Components/NavBar.jsx";
import "../Styles/reviewsyouadded.css";
import AddReviewModal from "../Components/AddModals/AddReviewModal.jsx";

class ReviewsYouAddedPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      ReviewsYouAdded: [
        { reviewID: "0001" },
        { reviewID: "0002" },
        { reviewID: "0003" },
      ],
      addReviewModalShow: false,
      token: this.props.token,
      username: this.props.username,
      // id: this.props
      // username: props.location.state.username,
    }
  }

  
  

  handleDelete = (reviewID) => {
    //create new array without given counter
    console.log("delete called", reviewID);
    // const counters = this.state.counters.filter((c) => c.id !== counterId);
    // this.setState({ counters });
  };

  addModalClose = () => this.setState({ addReviewModalShow: false });
  addModalOpen = () => {
    this.setState({ addReviewModalShow: true });
    console.log("add book show?", this.state.addReviewModalShow);
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
        <h2>Reviews You Added</h2>
        <div className="row">
          <h5>
            Here lies the reviews you have contributed to the ReadME community.
          </h5>
          <br></br>
          <br></br>
          <button
            className="add-review-bttn"
            id="add-review-bttn"
            onClick={this.addModalOpen}
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            <FontAwesomeIcon icon={faEdit} size="2x" />
            <div className="add-book-bttn-text">add review</div>
          </button>
        </div>

        <div>
          <AddReviewModal
            show={this.state.addReviewModalShow}
            onHide={this.addModalClose}
          />
        </div>

        <div className="container">
          <ReviewsYouAdded
            ReviewsYouAdded={this.state.ReviewsYouAdded}
            onDelete={this.handleDelete}
          />
        </div>

        <br></br>
        <br></br>
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

export default ReviewsYouAddedPage;
