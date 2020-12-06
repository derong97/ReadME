import React from "react";
import axios from "axios";
import "../Styles/book.css";
import "font-awesome/css/font-awesome.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import StarRatings from "react-star-ratings";
import Expand from "react-expand-animated";
import LoadingOverlay from "react-loading-overlay";

import NavBar from "../Components/NavBar.jsx";
import ReviewItem from "../Components/ReviewItem";
import RelatedBook from "../Components/RelatedBook";
import AddReviewModal from "../Components/AddModals/AddReviewModal.jsx";

class BookPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      token: props.location.state.token,
      id: props.location.state.id,
      username: props.location.state.username,
      book: props.location.state.book,
      reviews: props.location.state.reviews,
      relatedBooks: [],
      open: false,
      addReviewModalShow: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      this.setState({
        token: this.props.location.state.token,
        id: this.props.location.state.id,
        username: this.props.location.state.username,
        book: this.props.location.state.book,
        reviews: this.props.location.state.reviews,
      });
      if (
        prevProps.location.state.book.asin !==
        this.props.location.state.book.asin
      ) {
        this.setRelatedBooks(this.props.location.state.book);
      }
    }
  }

  componentDidMount() {
    this.setRelatedBooks(this.state.book);
  }

  setRelatedBooks = async (book) => {
    var relatedBooks = [];
    if (typeof book.related !== "undefined") {
      const bought = book.related.also_bought;
      if (typeof bought !== "undefined")
        relatedBooks = await new Promise((resolve) =>
          this.getRelatedBooks(bought, resolve)
        );
    }
    this.setState({ relatedBooks: relatedBooks });
  };

  getRelatedBooks = async (bought, resolve) => {
    const relatedBooks = [];
    var length;
    var i;

    if (bought.length < 3) length = bought.length;
    else length = 3;

    var check = 0;
    i = 0;
    var data;
    while (check < length) {
      data = await new Promise((resolve) => this.getBook(bought[i], resolve));
      if (typeof data.book !== "undefined") {
        relatedBooks.push(data);
        check++;
      }
      i++;
    }
    return resolve(relatedBooks);
  };

  getBook = (asin, resolve) => {
    const url = "/book/" + asin;
    const body = {
      headers: { "x-access-tokens": this.state.token },
    };

    axios
      .get(url, body)
      .then((res) => {
        const book = res.data.metadata;
        const reviews = res.data.reviews;
        if (res.status === 200) {
          return resolve({
            book: book,
            reviews: reviews == null ? [] : reviews,
          });
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

  toggle = () => {
    this.setState((prevState) => ({ open: !prevState.open }));
  };

  addReviewModalClose = () => this.setState({ addReviewModalShow: false });
  addReviewModalOpen = () => {
    this.setState({ addReviewModalShow: true });
  };

  render() {
    return (
      <LoadingOverlay
        active={this.state.searching}
        spinner
        text="searching ..."
      >
        <body id="content-body">
          <NavBar
            event={this}
            id={this.state.id}
            token={this.state.token}
            username={this.state.username}
            home="nav-main"
            byme="nav-sub"
          ></NavBar>

          <div id="book-body" className="container">
            <div id="book-n-relatedbooks" className="row">
              <div id="book-n-review" className="col">
                <div id="book-content" className="row">
                  <div>
                    <img
                      id="book-img"
                      alt="book"
                      src={this.state.book.imUrl}
                    ></img>
                  </div>
                  <div id="book-info">
                    <h4 id="book-title">{this.state.book.title}</h4>
                    <text>
                      {this.getCategories(this.state.book.categories)}
                    </text>
                    <StarRatings
                      name="rating"
                      rating={
                        this.state.book.avg_rating == null
                          ? 0
                          : this.state.book.avg_rating
                      }
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
                        ASIN: {this.state.book.asin}
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
                    <button
                      id="review-bttn"
                      onClick={this.addReviewModalOpen}
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      <FontAwesomeIcon icon={faEdit} size="2x" />
                      <div className="add-book-bttn-text">add review</div>
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
                {this.state.relatedBooks.map((book) => (
                  <div>
                    <RelatedBook
                      event={this}
                      token={this.state.token}
                      id={this.state.id}
                      username={this.state.username}
                      book={book.book}
                      reviews={book.reviews}
                    />
                    <hr className="divider"></hr>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <AddReviewModal
              event={this}
              token={this.state.token}
              id={this.state.id}
              username={this.state.username}
              show={this.state.addReviewModalShow}
              onHide={this.addReviewModalClose}
            />
          </div>
        </body>
      </LoadingOverlay>
    );
  }
}
export default BookPage;
