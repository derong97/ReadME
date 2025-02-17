import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

class EditReviewModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      asin: this.props.editAsin,
      reviewTitle: this.props.editSummary,
      reviewText: this.props.editReviewText,
      rating: this.props.editOverall,
      showSuccess: false,
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      asin: nextProps.editAsin,
      reviewTitle: nextProps.editSummary,
      reviewText: nextProps.editReviewText,
      rating: nextProps.editOverall,
    });
  }

  handleInternalSubmit = () => {
    if (this.state.reviewText === "" || this.state.reviewTitle === ""){
      this.internalValidate("empty", this.state.asin);
    }

    else {
      this.props.handleEdit(this.state.asin, this.state.rating, this.state.reviewText, this.state.reviewTitle);
    }

  }

  internalValidate = (check, asin) => {
    let error = ""
    if (check === "empty") {
      console.log("EMPTY IF STATEMENT")
      error = "* Please fill in all fields before submitting."
      this.setState({error, loading: false});
    }
  }

  render() {
    return (
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
          <Modal.Title>Edit Review</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <div id="error">{this.state.error}</div>
            <Form.Group as={Row} controlId="formASIN">
              <Form.Label column sm={2}>
                ASIN
              </Form.Label>
              <Col sm={10}>
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  id="readonly"
                  value={this.state.asin}
                />
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
                  value={this.state.reviewTitle}
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
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="orange"
                  value={this.state.rating}
                />
              </Col>
            </Form.Group>

            <Form.Group controlId="formReviewText">
              <Form.Label>Review</Form.Label>
              <textarea
                className="form-control"
                id="formReviewTextArea"
                rows={8}
                onChange={this.handleReviewTextChange}
                value={this.state.reviewText}
              ></textarea>

              <Form.Text className="text-muted">
                Tell everyone your opinion about this book!
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" type="submit" onClick={this.props.onHide}>
              Cancel
            </Button>
            <Button variant="outline-success" onClick={this.handleInternalSubmit}>
              Update Review
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default EditReviewModal;
