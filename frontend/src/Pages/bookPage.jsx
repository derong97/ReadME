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
      username: "GlendiBear",
      genres: "Genres",
      bookImg: BookImg,
      bookImg1: BookImg,
      bookImg2: BookImg,
      bookImg3: BookImg,
      booktitle1: "Book 1 Title",
      booktitle2: "Book 2 Title",
      booktitle3: "Book 3 Title",
      rating: 5,
      rating1: 2,
      rating2: 2,
      rating3: 2,
      open: false,
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
    };
  }

  toggle = () => {
    this.setState((prevState) => ({ open: !prevState.open }));
  };

  render() {
    return (
      <body>
        <NavBar event={this} username={this.state.username}></NavBar>

        <div id="book-body" class="container">
          <div id="book-n-relatedbooks" class="row">
            <div id="book-n-review" class="col">
              <div id="book-content" class="row">
                <img id="book-img" alt="book" src={this.state.bookImg}></img>
                <div id="book-info">
                  <h4 id="book-title">Book Title</h4>
                  <text>{this.state.genres}</text>
                  <StarRatings
                    name="rating"
                    rating={this.state.rating}
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
                      Asin: {this.state.asin}
                    </div>
                    <div id="details" className="col">
                      Brand: {this.state.brand}
                    </div>
                    <div id="details" className="col">
                      Sales Rank: {this.state.salesRank}
                    </div>
                  </Expand>
                </div>
              </div>
              <div id="review">
                <div id="review-header">
                  <h4>REVIEW</h4>
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
            <div id="relatedbooks">
              <div class="row">
                <h4 id="relatedbooks-title">RELATED BOOKS</h4>
              </div>
              <RelatedBook
                event={this}
                link={this.state.bookImg1}
                book={this.state.booktitle1}
                rating={this.state.rating1}
              ></RelatedBook>
              <hr className="divider"></hr>
              <RelatedBook
                event={this}
                link={this.state.bookImg2}
                book={this.state.booktitle2}
                rating={this.state.rating2}
              ></RelatedBook>
              <hr className="divider"></hr>
              <RelatedBook
                event={this}
                link={this.state.bookImg3}
                book={this.state.booktitle3}
                rating={this.state.rating3}
              ></RelatedBook>
            </div>
          </div>
        </div>

        <Footer></Footer>
      </body>
    );
  }
}
export default BookPage;
