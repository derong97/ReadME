import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
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
import EditReviewModal from "../Components/AddModals/EditReviewModal.jsx";

class ReviewsYouAddedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.location.state.token,
      searching: true,
      id: props.location.state.id,
      username: props.location.state.username,

      reviewsYouAdded: props.location.state.reviewsYouAdded,

      addReviewModalShow: false,
      deleteReviewModalShow: false,
      editReviewModalShow: false,

      deleteAsin: 0,

      editAsin: "",
      editOverall: 0,
      editReviewText: "",
      editSummary: "",

      showEditSuccess: false,
      showDeleteSuccess: false, 
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      this.getReviews();
      this.setState({});
    }
  }

  componentDidMount() {
    this.getReviews();
    this.setState({});
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

  handleDelete = () => {
    var review = this.state.reviewsYouAdded;
    var asin = this.state.deleteAsin;

    this.setState({ deleteReviewModalShow: false, searching: true });
    const url = "/book/" + asin;
    const body = {
      headers: { "x-access-tokens": this.state.token },
    };
    console.log(body);
    this.deleteReviewModalClose();
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
          console.log(index);
          console.log(review);
          review.splice(index, 1);
          console.log(review);
          this.setState({ reviewsYouAdded: review });
          this.setState({ searching: false });
          console.log(this.state.reviewsYouAdded);
          this.validateDelete("uploaded", asin);
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.request);
      });
  };

  validateDelete = (check, asin) => {
    if (check == "error") {
      let error = "* Asin " + asin + " is already taken up";
      this.setState({ error });
    } else {
      this.handleDeleteClose();
      this.handleDeleteOpenSuccess();
      console.log("i tried to open the DELETE success modal");
    }
  };

  handleDeleteClose = () => {
    let error = "";
    this.setState({ error });
    this.deleteReviewModalClose();
  };


  handleEdit = (asin, overall, reviewText, summary) => {
    this.setState(
      {
        editAsin: asin,
        editOverall: overall,
        editReviewText: reviewText,
        editSummary: summary,
      },
      this.handleEditSubmit
    );
  };

  handleEditSubmit = () => {
    console.log(this.state.editAsin);
    console.log(this.state.editOverall);
    console.log(this.state.editReviewText);
    console.log(this.state.editSummary);

    var review = this.state.reviewsYouAdded;
    console.log(review);

    var asin = this.state.editAsin;
    var overall = this.state.editOverall;
    var reviewText = this.state.editReviewText;
    var summary = this.state.editSummary;

    this.editReviewModalClose();
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
        if (res.status === 200) {
          console.log(res.data.message);
          this.getReviews();
          this.validateEdit("uploaded", asin);
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.request);
      });
  };

  validateEdit = (check, asin) => {
    if (check == "error") {
      let error = "* Asin " + asin + " is already taken up";
      this.setState({ error });
    } else {
      this.handleEditClose();
      this.handleEditOpenSuccess();
      console.log("i tried to open the success modal");
    }
  };

  handleEditClose = () => {
    let error = "";
    this.setState({ error });
    this.editReviewModalClose();
  };

  deleteReviewModalClose = () =>
    this.setState({ deleteReviewModalShow: false });

  deleteReviewModalOpen = (asin) => {
    this.setState({ deleteReviewModalShow: true });
    this.setState({ deleteAsin: asin });
    console.log(this.state.deleteReviewModalShow);
    console.log(this.state.deleteAsin);
  };

  addReviewModalClose = () => {
    this.setState({ addReviewModalShow: false });
  };
  addReviewModalOpen = () => {
    this.setState({ addReviewModalShow: true });
  };

  // this.myFunc = event => (param1, param2) => { ... do stuff };
  editReviewModalClose = () => this.setState({ editReviewModalShow: false });
  editReviewModalOpen = (asin, overall, reviewText, summary) => {
    this.setState(
      {
        editAsin: asin,
        editOverall: overall,
        editReviewText: reviewText,
        editSummary: summary,
      },
      this.openModal
    );
  };

  openModal = () => {
    console.log(this.state.editAsin);
    console.log(this.state.editOverall);
    console.log(this.state.editReviewText);
    console.log(this.state.editSummary);
    this.forceUpdate();
    this.setState({ editReviewModalShow: true });
  };

  handleEditOpenSuccess = () => {
    this.setState({ showEditSuccess: true });
  };

  handleEditCloseSuccess = () => {
    this.setState({ showEditSuccess: false });
  };

  handleDeleteOpenSuccess = () => {
    this.setState({ showDeleteSuccess: true });
  };

  handleDeleteCloseSuccess = () => {
    this.setState({ showDeleteSuccess: false });
  };

  render() {
    return (
      <LoadingOverlay
        // className="loader"
        active={this.state.searching}
        spinner
        text="loading ..."
      >
        <body id="review-body">
          <NavBar
            event={this}
            id={this.state.id}
            token={this.state.token}
            username={this.state.username}
            home="nav-sub"
            byme="nav-main"
          ></NavBar>
          {/* <div className="review-body"> */}
          <h2 id="review-body-title">Reviews You Added</h2>
          <div className="row">
            <h5 id="review-body-text">
              Here lies the reviews you have contributed to the ReadME
              community.
            </h5>
            <br></br>
            <br></br>
            <button
              className="add-review-bttn"
              id="add-review-bttn"
              onClick={() => this.addReviewModalOpen()}
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
              token={this.state.token}
              id={this.state.id}
              username={this.state.username}
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

          <div>
            <EditReviewModal
              event={this}
              show={this.state.editReviewModalShow}
              onHide={this.editReviewModalClose}
              handleEdit={this.handleEdit}
              editAsin={this.state.editAsin}
              editSummary={this.state.editSummary}
              editOverall={this.state.editOverall}
              editReviewText={this.state.editReviewText}
            />
          </div>

          <div id="reviews">
            <ReviewsYouAdded
              token={this.state.token}
              reviewsYouAdded={this.state.reviewsYouAdded}
              handleDelete={this.handleDelete}
              deleteReviewModalOpen={this.deleteReviewModalOpen}
              deleteReviewModalClose={this.deleteReviewModalClose}
              editReviewModalOpen={this.editReviewModalOpen}
              editReviewModalClose={this.editReviewModalClose}
            />
          </div>
          
        </body>

        {/* modal to show edit status  */}
        <Modal
          show={this.state.showEditSuccess}
          onHide={this.handleEditCloseSuccess}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Successfully Added Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>"{this.state.editAsin}" has been successfully edited!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleEditCloseSuccess}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* modal to show delete success  */}
        <Modal
          show={this.state.showDeleteSuccess}
          onHide={this.handleDeleteCloseSuccess}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Successfully Deleted Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>This book has been successfully deleted!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleDeleteCloseSuccess}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        
      </LoadingOverlay>
    );
  }
}

export default ReviewsYouAddedPage;
