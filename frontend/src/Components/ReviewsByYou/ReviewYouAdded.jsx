import React, { Component } from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPenSquare, faAirFreshener } from "@fortawesome/free-solid-svg-icons";
import ReadMoreReact from "read-more-react";
import "../../Styles/reviewsyouadded.css";

class ReviewYouAdded extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token,
      book: [],
      asin: this.props.reviewYouAdded.asin,
      dislikes: this.props.reviewYouAdded.dislikes,
      likes: this.props.reviewYouAdded.likes,
      overall: this.props.reviewYouAdded.overall,
      reviewText: this.props.reviewYouAdded.reviewText,
      reviewTime: this.props.reviewYouAdded.reviewTime,
      reviewerID: this.props.reviewYouAdded.reviewerID,
      reviewerName: this.props.reviewYouAdded.reviewerName,
      summary: this.props.reviewYouAdded.summary,
      unixReviewTime: this.props.reviewYouAdded.unixReviewTime,
    };
  }

  styles = {
    //if you wanted to have a standard style to call
    bookCoverImage: {
      width: 370,
      height: 419,
    },
  };

  componentDidMount() {
    this.getBook();
  }

  getBook = () => {
    const url = "/book/" + this.state.asin;
    const body = {
      headers: { "x-access-tokens": this.state.token },
    };
    console.log(body);
    axios
      .get(url, body)
      .then((res) => {
        console.log(res);
        const book = res.data.metadata;
        console.log(book);
        if (res.status === 200) {
          this.setState({ book: book });
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.request);
      });
  };

  printStates = () => {
    console.log(this.state.asin);
    console.log(this.state.overall);
    console.log(this.state.reviewText);
  }

  render() {
    return (
      <div className="container">
        <table id="review">
          <tbody>
            {/* <tr key={this.state.asin}> */}
            {/* <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>Review</th>
              <th>Rating</th> */}

            {/* {this.props.children} */}
            <td className="column-bookImage">
              <img
                src={this.state.book.imUrl}
                alt=""
                style={this.styles.bookCoverImage}
              />
            </td>
            {/* <td className="column-title">
                <h4> {this.state.title}</h4>
              </td> */}
            <td className="column-review">
              <h4> {this.state.book.title}</h4>
              <p className="review-small">{this.state.book.categories}</p>
              {/* <p>by {this.state.author}</p> */}
              <h6>"{this.state.summary}"</h6>
              <p className="review-small">
                <i> added {this.state.reviewTime}</i>
              </p>
              <ReadMoreReact
                className="review-rating-heading"
                text={this.state.reviewText}
                min={120}
                ideal={150}
                max={200}
                readMoreText=" ...read more"
              />
              <br></br>
              <p className="review-rating-heading">Your Rating: </p>
              <StarRatings
                name="rating"
                rating={this.state.overall}
                starRatedColor="orange"
                starDimension="20px"
                starSpacing="2.5px"
                numberOfStars={5}
              />
            </td>

            <td className="column-action">
              <button
                onClick={() =>
                  this.props.deleteReviewModalOpen(this.state.asin)
                } //raise event to Counters
                className="btn btn-danger btn-sm m-2"
              >
                <FontAwesomeIcon icon={faTrashAlt} size="1x" />
              </button>

              <button
                onClick={() =>
                  this.props.editReviewModalOpen(this.state.asin, this.state.overall, this.state.reviewText, this.state.summary)
                } //raise event to Counters
                className="btn btn-primary btn-sm m-2"
              >
                <FontAwesomeIcon icon={faPenSquare} size="1x" />
              </button>

            </td>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ReviewYouAdded;
