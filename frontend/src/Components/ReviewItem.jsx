import React from "react";
import UserLogo from "../Image/user.png";

const ReviewItem = ({ review }) => {
  return (
    <div class="container">
      <div className="row">
        <img className="user" alt="user" src={UserLogo}></img>
        <div className="review-section">
          <h6 className="review-section-title">"{review.summary}"</h6>
          <text className="review-section-user">
            <i>by {review.reviewerName}</i>
          </text>
          <p className="review-section-text">{review.reviewText}</p>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

export default ReviewItem;
