import React, { Component } from "react";
import axios from "axios";
import "../../Styles/reviewsyouadded.css";

import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPenSquare } from "@fortawesome/free-solid-svg-icons";
import ReadMoreReact from "read-more-react";

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
    bookCoverImage: {
      width: 370,
      height: 419,
    },

    reviewContainer: {
      width: 1000,
    },
    textWrap:{flex: 1, flexWrap: 'wrap'},
  };

  componentDidMount() {
    this.getBook();
    var convertedUnix = this.convertTimestamp(this.state.unixReviewTime);
    this.setState({ unixReviewTime: convertedUnix });
  }

  convertTimestamp(timestamp) {
    var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
      yyyy = d.getFullYear(),
      mm = ("0" + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
      dd = ("0" + d.getDate()).slice(-2), // Add leading 0.
      hh = d.getHours(),
      h = hh,
      min = ("0" + d.getMinutes()).slice(-2), // Add leading 0.
      ampm = "AM",
      time;

    if (hh > 12) {
      h = hh - 12;
      ampm = "PM";
    } else if (hh === 12) {
      h = 12;
      ampm = "PM";
    } else if (hh == 0) {
      h = 12;
    }

    // ie: 2013-02-18, 8:35 AM
    time = yyyy + "-" + mm + "-" + dd + ", " + h + ":" + min + " " + ampm;

    return time;
  }

  getBook = () => {
    const url = "/book/" + this.state.asin;
    const body = {
      headers: { "x-access-tokens": this.state.token },
    };
    axios
      .get(url, body)
      .then((res) => {
        const book = res.data.metadata;

        if (res.status === 200) {
          this.setState({ book: book });
          // this.setState({ book: book.imUrl == null ? "[no image]" : book.imUrl });
          // this.setState({ book: book.title == null ? "[no title]" : book.title });
          // this.setState({ book: book.categories == null ? "[no categories]" : book.categories });

        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.request);
      });
  };

  getCategories = (cats) => {
    var categories = "";
    if (typeof cats !== "undefined") {
      for (var i = 0; i < cats.length; i++) {
        if (i === cats.length) categories += cats[i];
        else categories += cats[i] + ", ";
      }
    }
    return categories;
  };

  


  render() {
    return (
      <div className="container" style={this.styles.reviewContainer}>
        <table id="review">
          <tbody>
            <td className="column-bookImage">
              <img
                src={this.state.book.imUrl}
                alt=""
                style={this.styles.bookCoverImage}
              />
            </td>
            <td className="column-review">
              <h4> {this.state.book.title}</h4>
              <p className="review-small">
                {this.getCategories(this.state.book.categories)}
              </p>
              <h6>"{this.state.summary}"</h6>
              <p className="review-small">
                <i> added {this.state.unixReviewTime}</i>
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
                  this.props.editReviewModalOpen(
                    this.state.asin,
                    this.state.overall,
                    this.state.reviewText,
                    this.state.summary
                  )
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
