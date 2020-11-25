import React, { Component } from "react";
import ReviewYouAdded from "./ReviewYouAdded.jsx";
import "../../Styles/reviewsyouadded.css";

class ReviewsYouAdded extends Component {
  render() {
    return (
      <div>
        {this.props.ReviewsYouAdded.map((reviewYouAdded) => (
          <ReviewYouAdded
            key={reviewYouAdded.reviewerID} //used internally
            onDelete={this.props.onDelete}
            deleteReviewModalOpen = {this.props.deleteReviewModalOpen}
            ReviewYouAdded={reviewYouAdded}
          ></ReviewYouAdded>
        ))}
      </div>
    );
  }
}

export default ReviewsYouAdded;
