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
    const url = "http://localhost:5000/book/" + this.props.book.asin;
    const body = {
      headers: { "x-access-tokens": this.props.token },
    };
    console.log(body);
    evt.preventDefault();
    axios
      .get(url, body)
      .then((res) => {
        console.log(res);
        const book = res.data.metadata;
        const reviews = res.data.reviews;
        console.log(book);
        console.log(reviews);
        if (res.status === 200) {
          this.setState({ searching: false });
          this.props.event.props.history.push({
            pathname: "/book",
            state: {
              token: this.props.token,
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

  checkNull = () => {
    if (this.props.book.avg_rating === null) return true;
    return false;
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
            rating={this.checkNull ? 0 : this.props.book.avg_rating}
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
