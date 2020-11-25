import React, { Component } from "react";
import axios from "axios";
import "../Styles/reviewsyouadded.css";
import ReviewsYouAdded from "../Components/ReviewsByYou/ReviewsYouAdded.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Components/Footer.jsx";
import NavBar from "../Components/NavBar.jsx";
import LoadingOverlay from "react-loading-overlay";
import AddReviewModal from "../Components/AddModals/AddReviewModal.jsx";
import DeleteReviewModal from "../Components/AddModals/DeleteReviewModal.jsx";

class ReviewsYouAddedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.location.state.token,
      searching: true,
      id: props.location.state.id,
      username: props.location.state.username,

      reviewsYouAdded: [

      ],

      addReviewModalShow: false,
      deleteReviewModalShow: false,
      deleteAsin: 0,
    };
  }

  handleDelete = () => {
    console.log("delete called", this.state.deleteAsin);
    console.log(this.state.reviewsYouAdded);
    var review = this.state.reviewsYouAdded;
    var asin = this.state.deleteAsin;

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

  deleteReviewModalClose = () =>
    this.setState({ deleteReviewModalShow: false });

  deleteReviewModalOpen = (asin) => {
    this.setState({ deleteReviewModalShow: true });
    this.setState({ deleteAsin: asin });
    console.log(this.state.deleteReviewModalShow);
    console.log(this.state.deleteReviewID);
  };

  addReviewModalClose = () => this.setState({ addReviewModalShow: false });
  addReviewModalOpen = () => {
    this.setState({ addReviewModalShow: true });
  };

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
        const review = res.data.reviews;
        console.log(review);
        if (res.status === 200) {
          this.setState({ reviewsYouAdded: review == null ? [] : review });
          this.setState({ searching: false });
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.request);
      });
  };

  render() {
    return (
      // <React.Fragment>
      //   <NavBar
      //     event={this}
      //     username={this.state.username}
      //     home="nav-sub"
      //     byme="nav-main"
      //   ></NavBar>
      //   <h2>Reviews You Added</h2>
      //   <div className="row">
      //     <h5>
      //       Here lies the reviews you have contributed to the ReadME community.
      //     </h5>
      //     <br></br>
      //     <br></br>
      //     <button
      //       className="add-review-bttn"
      //       id="add-review-bttn"
      //       onClick={this.addReviewModalOpen}
      //       data-toggle="modal"
      //       data-target="#exampleModalCenter"
      //     >
      //       <FontAwesomeIcon icon={faEdit} size="2x" />
      //       <div className="add-book-bttn-text">add review</div>
      //     </button>
      //   </div>

      //   <div>
      //     <AddReviewModal
      //       event={this}
      //       token={this.props.token}
      //       show={this.state.addReviewModalShow}
      //       onHide={this.addReviewModalClose}
      //     />
      //   </div>

      //   <div>
      //     <DeleteReviewModal
      //       event={this}
      //       show={this.state.deleteReviewModalShow}
      //       onHide={this.deleteReviewModalClose}
      //       title={this.state.title}
      //       handleDelete={this.handleDelete}
      //     />
      //   </div>

      //   <div className="container">
      //     <ReviewsYouAdded
      //       ReviewsYouAdded={this.state.ReviewsYouAdded}
      //       handleDelete={this.handleDelete}
      //       deleteReviewModalOpen={this.deleteReviewModalOpen}
      //     />
      //   </div>

      //   <br></br>
      //   <br></br>
      //   <br></br>
      //   <br></br>

      //   <h5>Thank you for your support!</h5>

      //   <br></br>
      //   <br></br>

      //   <Footer></Footer>
      // </React.Fragment>
      <LoadingOverlay
        active={this.state.searching}
        spinner
        text="searching ..."
      >
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
                />
              </div>

              <div>
                <DeleteReviewModal
                  event={this}
                  show={this.state.deleteReviewModalShow}
                  onHide={this.deleteReviewModalClose}
                  title={this.state.title}
                  handleDelete={this.handleDelete}
                />
              </div>

              <div className="container">
                <ReviewsYouAdded
                  token={this.state.token}
                  reviewsYouAdded={this.state.reviewsYouAdded}
                  handleDelete={this.handleDelete}
                  deleteReviewModalOpen = {this.deleteReviewModalOpen}
                  deleteReviewModalClose = {this.deleteReviewModalClose}
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

