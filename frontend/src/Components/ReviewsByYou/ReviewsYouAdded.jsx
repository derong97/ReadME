import React, { Component } from "react";
import ReviewYouAdded from "./ReviewYouAdded.jsx";
import "../../Styles/reviewsyouadded.css";

class ReviewsYouAdded extends Component {
  render() {
    return (
      <div>
        {this.props.reviewsYouAdded.map((reviewYouAdded) => (
          <ReviewYouAdded
            token={this.props.token}
            key={reviewYouAdded.unixReviewTime} //used internally
            handleDelete={this.props.handleDelete}
            deleteReviewModalOpen={this.props.deleteReviewModalOpen}
            deleteReviewModalClose={this.props.deleteReviewModalClose}
            editReviewModalOpen={this.props.editReviewModalOpen}
            editReviewModalClose={this.props.editReviewModalClose}
            reviewYouAdded={reviewYouAdded}
          ></ReviewYouAdded>
        ))}
      </div>
    );
  }
}

export default ReviewsYouAdded;
