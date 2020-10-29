import React from "react";
import "../Styles/book.css";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../Components/NavBar.jsx";
import ReviewItem from "../Components/ReviewItem";
import RelatedBook from "../Components/RelatedBook";
import Footer from "../Components/Footer.jsx";
import StarRatings from "react-star-ratings";
import Expand from "react-expand-animated";
import BookImg from "../Image/login_bg.png";

class BookPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // bookDeets: JSON.parse(this.props.location.state.bookDeets),
      bookDeets: {
        username: "GlendiBear",
        genres: "Genres",
        bookImg: BookImg,
        rating: 5,
        relatedbooks: [
          {
            bookImg: BookImg,
            booktitle: "Book 1 Title",
            rating: 2,
          },
          {
            bookImg: BookImg,
            booktitle: "Book 1 Title",
            rating: 2,
          },
          {
            bookImg: BookImg,
            booktitle: "Book 1 Title",
            rating: 2,
          },
        ],
        asin: "asin",
        brand: "brand",
        salesRank: "sales rank",
        reviews: [
          {
            title: "Top Read",
            user: "megan_trainor",
            review: "A brilliant thriller.",
          },
          {
            title: "Top Read",
            user: "megan_trainor",
            review: "A brilliant thriller.",
          },
          {
            title: "Top Read",
            user: "megan_trainor",
            review: "A brilliant thriller.",
          },
          {
            title: "Top Read",
            user: "megan_trainor",
            review: "A brilliant thriller.",
          },
          {
            title: "Top Read",
            user: "megan_trainor",
            review: "A brilliant thriller.",
          },
        ],
      },
      open: false,
    };
  }

  toggle = () => {
    this.setState((prevState) => ({ open: !prevState.open }));
  };

  render() {
    return (
      <body>
        <NavBar
          event={this}
          username={this.state.bookDeets.username}
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
                  src={this.state.bookDeets.bookImg}
                ></img>
                <div id="book-info">
                  <h4 id="book-title">Book Title</h4>
                  <text>{this.state.bookDeets.genres}</text>
                  <StarRatings
                    name="rating"
                    rating={this.state.bookDeets.rating}
                    starRatedColor="orange"
                    starDimension="20px"
                    starSpacing="2.5px"
                    numberOfStars={5}
                  />
                  <h4 id="book-price">$3.17</h4>
                  <text id="book-details" onClick={this.toggle}>
                    + Additional Details
                  </text>
                  <Expand open={this.state.open}>
                    <div id="details" className="col">
                      Asin: {this.state.bookDeets.asin}
                    </div>
                    <div id="details" className="col">
                      Brand: {this.state.bookDeets.brand}
                    </div>
                    <div id="details" className="col">
                      Sales Rank: {this.state.bookDeets.salesRank}
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
                  {this.state.bookDeets.reviews.map((review) => (
                    <ReviewItem review={review} />
                  ))}
                </div>
              </div>
            </div>
            <div id="relatedbooks">
              <div class="row">
                <h4 id="relatedbooks-title">RELATED BOOKS</h4>
              </div>
              {this.state.bookDeets.relatedbooks.map((book) => (
                <div>
                  <RelatedBook event={this} book={book} />
                  <hr className="divider"></hr>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer></Footer>
      </body>
    );
  }
}
export default BookPage;
