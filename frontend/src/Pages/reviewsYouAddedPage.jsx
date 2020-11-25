import React from "react";
import axios from "axios";
import "../Styles/reviewsyouadded.css";
import ReviewsYouAdded from "../Components/ReviewsByYou/ReviewsYouAdded.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Components/Footer.jsx";
import NavBar from "../Components/NavBar.jsx";
import LoadingOverlay from "react-loading-overlay";
import AddReviewModal from "../Components/AddModals/AddReviewModal.jsx";

class ReviewsYouAddedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.location.state.token,
      searching: true,
      id: props.location.state.id,
      username: props.location.state.username,
      reviewsYouAdded: [
        {
          asin: "B0080H1C0W",
          dislikes: 0,
          likes: 0,
          overall: 2,
          reviewText:
            "After Book One, which is mandatory reading to make this book understandable, this read speeds along for about fifty percent of the journey, then preaches the ultimate end of science and personal freedom.  Unfortunately, the &#34;hero&#34; is American and the author isn't aware of just how anti-government at least half the nation is at any given time, so the &#34;conclusion&#34; of Book Two doesn't ring true.  Since the love story is unbelievable, the conclusion is contrived. Read Book Two if your power is out, it's raining or everyone you know is busy.",
          reviewTime: "Thu, 19 Jun 2014 00:00:00 GMT",
          reviewerID: "A10K0YDFH11D3W",
          reviewerName: "PR Diva",
          summary:
            "Don't Preach to Me Ian Irvine! (Sing to 'Don't Cry for Me. . .' You get the idea",
          unixReviewTime: 1403136000,
        },
        {
          asin: "B000F83SZQ",
          dislikes: 0,
          likes: 0,
          overall: 5,
          reviewText:
            "I enjoy vintage books and movies so I enjoyed reading this book.  The plot was unusual.  Don't think killing someone in self-defense but leaving the scene and the body without notifying the police or hitting someone in the jaw to knock them out would wash today.Still it was a good read for me.",
          reviewTime: "Mon, 05 May 2014 00:00:00 GMT",
          reviewerID: "A1F6404F1VG29J",
          reviewerName: "Avidreader",
          summary: "Nice vintage story",
          unixReviewTime: 1399248000,
        },
      ],
      addReviewModalShow: false,
    };
  }

  componentDidMount() {
    this.getReviews();
  }

  getReviews = () => {
    const url = "/reviews/user";
    const body = {
      headers: { "x-access-tokens": this.state.token },
    };
    axios
      .get(url, body)
      .then((res) => {
        console.log(res);
        // const review = res.data.reviews;
        if (res.status === 200) {
          // this.setState({ reviewsYouAdded: review == null ? [] : review });
          this.setState({ searching: false });
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.request);
      });
  };

  handleDelete = (asin) => {
    console.log(this.state.reviewsYouAdded);
    var review = this.state.reviewsYouAdded;

    this.setState({ searching: true });
    const url = "/book/" + asin;
    const body = {
      headers: { "x-access-tokens": this.state.token },
    };
    console.log(body);
    axios
      .delete(url, body)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          var index;
          for (var i = 0; i < review.length; i++) {
            if (review[i].asin === asin) {
              index = i;
            }
          }
          review.splice(index, 1);
          this.setState({ reviewsYouAdded: review });
          this.setState({ searching: false });
          console.log(this.state.reviewsYouAdded);
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.request);
      });
  };

  handleEdit = (asin, overall, reviewText, summary) => {
    console.log(this.state.reviewsYouAdded);
    var review = this.state.reviewsYouAdded;
    console.log(review);

    this.setState({ searching: true });
    const url = "/book/" + asin;
    const headers = {
      headers: { "x-access-tokens": this.state.token },
    };
    const params = {
      overall: overall,
      reviewText: reviewText,
      summary: summary,
    };
    axios
      .put(url, params, headers)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.request);
      });
  };

  addReviewModalClose = () => this.setState({ addReviewModalShow: false });
  addReviewModalOpen = () => {
    this.setState({ addReviewModalShow: true });
    console.log("add book show?", this.state.addReviewModalShow);
  };

  render() {
    return (
      <LoadingOverlay
        active={this.state.searching}
        spinner
        text="searching ..."
      >
        {/* <React.Fragment>
          <div className="content-body">
            <NavBar
              event={this}
              id={this.state.id}
              token={this.state.token}
              username={this.state.username}
              home="nav-sub"
              byme="nav-main"
            ></NavBar>
            <div className="review-body">
              <h2>Reviews You Added</h2>
              <div className="row">
                <h5>
                  Here lies the reviews you have contributed to the ReadME
                  community.
                </h5>
                <br></br>
                <br></br>
                <button
                  className="add-review-bttn"
                  id="add-review-bttn"
                  onClick={this.addModalOpen}
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                >
                  <FontAwesomeIcon icon={faEdit} size="2x" />
                  <div className="add-book-bttn-text">add review</div>
                </button>
              </div>

              <div>
                <AddReviewModal
                  show={this.state.addReviewModalShow}
                  onHide={this.addModalClose}
                />
              </div>

              <div className="container">
                <ReviewsYouAdded
                  token={this.state.token}
                  reviewsYouAdded={this.state.reviewsYouAdded}
                  onDelete={this.handleDelete}
                />
              </div>

              <br></br>
              <br></br>
              <br></br>
              <br></br>

              <h5>Thank you for your support!</h5>

              <br></br>
              <br></br>
            </div>
          </div>

          <Footer></Footer>
        </React.Fragment> */}
        <React.Fragment>
          <div className="content-body">
            <NavBar
              event={this}
              id={this.state.id}
              token={this.state.token}
              username={this.state.username}
              home="nav-sub"
              byme="nav-main"
            ></NavBar>
            <div className="review-body">
              <h2>Reviews You Added</h2>
              <div className="row">
                <h5>
                  Here lies the reviews you have contributed to the ReadME
                  community.
                </h5>
                <br></br>
                <br></br>
                <button
                  className="add-review-bttn"
                  id="add-review-bttn"
                  onClick={this.addReviewModalOpen}
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                >
                  <FontAwesomeIcon icon={faEdit} size="2x" />
                  <div className="add-book-bttn-text">add review</div>
                </button>
              </div>

              <div>
                <AddReviewModal
                  event={this}
                  token={this.props.token}
                  show={this.state.addReviewModalShow}
                  onHide={this.addReviewModalClose}
                  asin=""
                />
              </div>

              <div className="container">
                <ReviewsYouAdded
                  token={this.state.token}
                  reviewsYouAdded={this.state.reviewsYouAdded}
                  onDelete={this.handleDelete}
                />
              </div>

              <br></br>
              <br></br>
              <br></br>
              <br></br>

              <h5>Thank you for your support!</h5>

              <br></br>
              <br></br>
            </div>
          </div>

          <Footer></Footer>
        </React.Fragment>
      </LoadingOverlay>
    );
  }
}

export default ReviewsYouAddedPage;
