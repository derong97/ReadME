import React from "react";
import axios from "axios";

import StarRatings from "react-star-ratings";
import LoadingOverlay from "react-loading-overlay";

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
    };
  }

  bookDeets = async (evt) => {
    this.setState({ searching: true });
    const url = "/book/" + this.props.book.asin;
    const body = {
      headers: { "x-access-tokens": this.props.token },
    };
    evt.preventDefault();
    axios
      .get(url, body)
      .then((res) => {
        const book = res.data.metadata;
        const reviews = res.data.reviews;
        if (res.status === 200) {
          this.setState({ searching: false });
          this.props.event.props.history.push({
            pathname: "/book",
            state: {
              token: this.props.token,
              id: this.props.id,
              username: this.props.username,
              book: book,
              reviews: reviews == null ? [] : reviews,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.request);
      });
  };

  render() {
    return (
      <LoadingOverlay
        active={this.state.searching}
        spinner
        text="searching ..."
      >
        <div className="book-content" onClick={this.bookDeets}>
          <img className="book" alt="book" src={this.props.book.imUrl}></img>
          <text className="book-title">{this.props.book.title}</text>
          <StarRatings
            name="rating"
            rating={
              this.props.book.avg_rating == null
                ? 0
                : this.props.book.avg_rating
            }
            starRatedColor="orange"
            starDimension="20px"
            starSpacing="2.5px"
            numberOfStars={5}
          />
        </div>
      </LoadingOverlay>
    );
  }
}

export default Book;
