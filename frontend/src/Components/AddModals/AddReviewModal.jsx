import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import Ratings from "react-ratings-declarative";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";

class AddReviewModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      asin: 0,
      reviewTitle: "",
      rating: 3.7,
      reviewText: "",
      token: this.props.token,
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

  handleSubmit = (event) => {
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

    event.preventDefault();
    axios
      .post(url, params, headers)
      .then((res) => {
        console.log(res);
        console.log(url);
        // const token = res.data.token;
        const username = res.data.username;
        const id = res.data.reviewerID;
        if (res.status == 200) {
          console.log("REVIEW SUCCESS");
          this.setState({ loading: false });
          this.props.event.props.history.push({
            pathname: "/reviews-you-added",
            state: {
              token: this.state.token,
              id: id,
              username: username,
            },
          });
        }
      })
      .catch((err) => {
        let userError = "";
        // userError = err.response.data.message;
        this.setState({ loading: false, userError });
        console.log(err.response);
        console.log(err.request);
      });
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
                    isHalf={true}
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
                Close
              </Button>
              <Button
                variant="outline-success"
                type="submit"
                onClick={this.handleSubmit}
              >
                Add Review
              </Button>
              {/* <form ref="form" onSubmit={this.handleSubmit}>
              <button variant="outline-info" type="submit">ADD REVIEW</button>
            </form> */}
            </Modal.Footer>
          </Form>
        </Modal>
      </LoadingOverlay>
    );
  }
}

export default AddReviewModal;
