import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";

class AddReviewModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      asin: 0,
      reviewTitle: "",
      rating: 3.7,
      reviewText: "",
      token: this.props.token,
      id: this.props.id,
      username: this.props.username,
      showSuccess: false,
      loading: false,
      responseMessage: "",
    };
  }

  handleASINChange = (event) => {
    this.setState({
      asin: event.target.value,
    });
  };

  handleReviewTitleChange = (event) => {
    this.setState({
      reviewTitle: event.target.value,
    });
  };

  handleRatingChange = (newRating) => {
    this.setState({
      rating: newRating,
    });
  };

  handleReviewTextChange = (event) => {
    this.setState({
      reviewText: event.target.value,
    });
  };

  checkBook = (resolve) => {
    const url = "/book/" + this.state.asin;
    const body = { headers: { "x-access-tokens": this.state.token } };

    axios
      .get(url, body)
      .then((res) => {
        const message = res.data.message;
        if (res.status === 200) {
          const str =
            "No metadata found for asin " +
            this.state.asin +
            " & No reviews found for asin " +
            this.state.asin;
          if (message == str) {
            return resolve(true);
          } else return resolve(false);
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.request);
        return resolve(true);
      });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const asin = this.state.asin;
    const url = `/book/${asin}`;
    const overall = this.state.rating;
    const reviewText = this.state.reviewText;
    const summary = this.state.reviewTitle;

    const headers = { headers: { "x-access-tokens": this.state.token } };
    const params = {
      overall: overall,
      reviewText: reviewText,
      summary: summary,
    };

    if (asin === 0 || reviewText === "" || summary === "") {
      this.validate("empty", asin);
    } else {
      var check = await new Promise((resolve) => this.checkBook(resolve));
      if (check) {
        this.validate("wrong", asin);
      } else {
        axios
          .post(url, params, headers)
          .then((res) => {
            this.setState({ responseMessage: res.data.message });
            if (res.status === 200) {
              this.validate("uploaded", asin);
              this.setState({ loading: false });
            }
          })
          .catch((err) => {
            this.validate("error", asin);
            console.log(err.response);
            console.log(err.request);
          });
      }
    }
  };

  validate = (check, asin) => {
    let error = "";
    if (check === "empty") {
      error = "* Please fill in all fields before submitting.";
      this.setState({ error, loading: false });
    } else if (check === "error") {
      error =
        "* You have already given a review for the book with ASIN " +
        asin +
        ". Please edit your existing review instead.";
      this.setState({ error, loading: false });
    } else if (check === "wrong") {
      error = "* Invalid asin. Please check your asin.";
      this.setState({ error, loading: false });
    } else {
      //if state is uploaded
      this.handleClose();
      this.handleOpenSuccess();
    }
  };

  handleClose = () => {
    let error = "";
    this.setState({ error, loading: false });
    this.props.onHide();
  };

  handleOpenSuccess = () => {
    this.setState({ showSuccess: true });
  };

  handleCloseSuccess = () => {
    this.setState({ showSuccess: false });
  };

  render() {
    return (
      <LoadingOverlay
        active={this.state.loading}
        spinner
        text="adding review ..."
      >
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Review</Modal.Title>
          </Modal.Header>
          <Form>
            <Modal.Body>
              <div id="error">{this.state.error}</div>
              <Form.Group as={Row} controlId="formASIN">
                <Form.Label column sm={2}>
                  ASIN
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    required
                    type="input"
                    placeholder="enter the book's asin number."
                    required
                    onChange={this.handleASINChange}
                  />
                  <Form.Text className="text-muted">
                    The ASIN number is the Amazon Standardard Identification
                    Number of your book (i.e. the ISBN).
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    awh hell no this is wrong dont be stupid
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formReviewTitle">
                <Form.Label column sm={2}>
                  Review Title
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    required
                    type="input"
                    placeholder="Enter review title."
                    onChange={this.handleReviewTitleChange}
                  />
                  <Form.Text className="text-muted">
                    Feel free to get creative!
                  </Form.Text>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formRatings">
                <Form.Label column sm={2}>
                  Rating
                </Form.Label>
                <Col sm={10}>
                  <ReactStars
                    count={5}
                    onChange={this.handleRatingChange}
                    size={24}
                    isHalf={false}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="orange"
                  />
                </Col>
              </Form.Group>

              <Form.Group controlId="formReviewText">
                <Form.Label>Review</Form.Label>
                {/* <Form.Control
                required
                type="textarea"
                placeholder="Pen your thoughts here..."
                onChange={this.handleReviewTextChange}
              /> */}
                <textarea
                  className="form-control"
                  id="formReviewTextArea"
                  rows={8}
                  onChange={this.handleReviewTextChange}
                ></textarea>

                <Form.Text className="text-muted">
                  Tell everyone your opinion about this book!
                </Form.Text>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.props.onHide}>
                Cancel
              </Button>
              <Button
                variant="outline-success"
                type="submit"
                onClick={this.handleSubmit}
              >
                Add Review
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <Modal
          show={this.state.showSuccess}
          onHide={this.handleCloseSuccess}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Review Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{this.state.responseMessage}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleCloseSuccess}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </LoadingOverlay>
    );
  }
}

export default AddReviewModal;
