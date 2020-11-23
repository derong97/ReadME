import React from "react";
import axios from "axios";
import "../Styles/book.css";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../Components/NavBar.jsx";
import ReviewItem from "../Components/ReviewItem";
import LoadingOverlay from "react-loading-overlay";
import Footer from "../Components/Footer.jsx";
import StarRatings from "react-star-ratings";
import Expand from "react-expand-animated";

class BookPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.location.state.token,
      username: props.location.state.username,
      searching: true,
      book: props.location.state.book,
      reviews: props.location.state.reviews,
      relatedBooks: [],
      open: false,
    };
  }

  componentDidMount() {
    console.log(this.state.relatedBooks);
    const bought = this.state.book.related.also_bought;
    console.log(bought);
    const relatedBooks = this.getRelatedBooks(bought);
    console.log(relatedBooks);
    this.setState({ relatedBooks: relatedBooks });
    this.setState({ searching: false });
    console.log(this.state.relatedBooks);
  }

  getRelatedBooks = (bought) => {
    const relatedBooks = [];
    for (var i = 0; i < 3; i++) {
      console.log(bought[i]);
      relatedBooks.push(this.getBook(bought[i]));
    }
    console.log(relatedBooks);
    return relatedBooks;
  };

  getBook = (asin) => {
    console.log(asin);
    const url = "http://localhost:5000/book/" + asin;
    const body = {
      headers: { "x-access-tokens": this.state.token },
    };
    console.log(body);
    axios
      .get(url, body)
      .then((res) => {
        console.log(res);
        const book = res.data.metadata;
        const reviews = res.data.reviews;
        console.log(book);
        console.log(reviews);
        if (res.status === 200) {
          return { book: book, reviews: reviews == null ? [] : reviews };
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.request);
      });
  };

  toggle = () => {
    this.setState((prevState) => ({ open: !prevState.open }));
  };

  render() {
    return (
      <LoadingOverlay
        active={this.state.searching}
        spinner
        text="searching ..."
      >
        <body>
          <NavBar
            event={this}
            username={this.state.username}
            home="nav-main"
            byme="nav-sub"
          ></NavBar>

          <div id="book-body" class="container">
            <div id="book-n-relatedbooks" class="row">
              <div id="book-n-review" class="col">
                <div id="book-content" class="row">
                  <img
                    id="book-img"
                    alt="book"
                    src={this.state.book.imUrl}
                  ></img>
                  <div id="book-info">
                    <h4 id="book-title">Book Title</h4>
                    <text>{this.state.book.categories}</text>
                    <StarRatings
                      name="rating"
                      rating={this.state.book.avg_rating}
                      starRatedColor="orange"
                      starDimension="20px"
                      starSpacing="2.5px"
                      numberOfStars={5}
                    />
                    <h4 id="book-price">${this.state.book.price}</h4>
                    <text id="book-details" onClick={this.toggle}>
                      + Additional Details
                    </text>
                    <Expand open={this.state.open}>
                      <div id="details" className="col">
                        Asin: {this.state.book.asin}
                      </div>
                      <div id="details" className="col">
                        Brand: {this.state.book.brand}
                      </div>
                      <div id="details" className="col">
                        Sales Rank: {this.state.book.salesRank}
                      </div>
                    </Expand>
                  </div>
                </div>
                <div id="review">
                  <div id="review-header">
                    <h4 id="review-title">REVIEW</h4>
                    <button id="review-bttn">
                      <FontAwesomeIcon icon={faEdit} size="2x" />
                      add review
                    </button>
                  </div>
                  <div id="review-info">
                    {this.state.reviews.map((review) => (
                      <ReviewItem review={review} />
                    ))}
                  </div>
                </div>
              </div>
              <div id="relatedbooks" class="col">
                <div class="row">
                  <h4 id="relatedbooks-title">RELATED BOOKS</h4>
                </div>
                {/* {this.state.relatedBooks.map((book) => (
                <div>
                  <RelatedBook
                    event={this}
                    token={this.state.token}
                    username={this.state.username}
                    book={book.book}
                    reviews={book.reviews}
                  />
                  <hr className="divider"></hr>
                </div>
              ))} */}
              </div>
            </div>
          </div>

          <Footer></Footer>
        </body>
      </LoadingOverlay>
    );
  }
}
export default BookPage;
