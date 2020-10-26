import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPenSquare } from "@fortawesome/free-solid-svg-icons";
import "../../Styles/reviewsyouadded.css";

class ReviewYouAdded extends Component {
  state = {
    // to call the data of the book here?
    imageUrl: "http://ecx.images-amazon.com/images/I/51fAmVkTbyL._SY300_.jpg",
    title: "Girls Ballet Tutu Zebra Hot Pink",
    category: "Sports & Outdoors, Other Sports, Dance",
    author: "Riley Sager",
    your_rating: 3,
    review_title: "Amazing Read",
    review_time: "09 13, 2009",
  };

  styles = {
    //if you wanted to have a standard style to call
    bookCoverImage: {
      width: 287,
      height: 419,
    },
  };

  render() {
    return (
      <div className="container">
        <table id="review">
          <tbody>
            <tr key={this.state.title}>
              {/* <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>Review</th>
              <th>Rating</th> */}

              {this.props.children}
              <td className="column-bookImage">
                <img
                  src={this.state.imageUrl}
                  alt=""
                  style={this.styles.bookCoverImage}
                />
              </td>
              {/* <td className="column-title">
                <h4> {this.state.title}</h4>
              </td> */}
              <td className="column-review">
                <h4> {this.state.title}</h4>
                <p className="review-small">{this.state.category}</p>
                <p>by {this.state.author}</p>
                <h6>"{this.state.review_title}"</h6>
                <p className="review-small">
                  <i> added {this.state.review_time}</i>
                </p>
                <p style={this.styles.reviewText}>
                  "I bought this for my husband who plays the piano. He is
                  having a wonderful time playing these old hymns. The music is
                  at times hard to read because we think the book was published
                  for singing from more than playing from. Great purchase
                  though!"
                </p>
                <p className = "review-rating-heading">Your Rating: </p>
                <StarRatings
                  name="rating"
                  rating={this.state.your_rating}
                  starRatedColor="orange"
                  starDimension="20px"
                  starSpacing="2.5px"
                  numberOfStars={5}
                />
              </td>

              <td className="column-action">
                <button
                  onClick={() =>
                    this.props.onDelete(this.props.ReviewYouAdded.reviewID)
                  } //raise event to Counters
                  className="btn btn-danger btn-sm m-2"
                >
                  <FontAwesomeIcon icon={faTrashAlt} size="1x" />
                </button>

                <button
                  onClick={() =>
                    this.props.onDelete(this.props.ReviewYouAdded.asin)
                  } //raise event to Counters
                  className="btn btn-primary btn-sm m-2"
                >
                  <FontAwesomeIcon icon={faPenSquare} size="1x" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ReviewYouAdded;
