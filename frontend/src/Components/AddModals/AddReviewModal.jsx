import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

class AddReviewModal extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    reviewTitle: "",
    rating: 0,
    reviewText: "",
  };

  handleReviewTitleChange = (event) => {
    this.setState({
      reviewTitle: event.target.value,
    });
  };

  handleRatingChange = (event) => {
    this.setState({
      rating: event.target.value,
    });
  };

  handleReviewTextChange = (event) => {
    this.setState({
      reviewText: event.target.value,
    });
  };

  handleSubmit = (event) => {
    console.log("LATEST STATES for Add Review");
    console.log("reviewTitle", this.state.reviewTitle);
    console.log("rating: ", this.state.review);
    console.log("reviewText: ", this.state.reviewText);
  };

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
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
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

            <Form.Group controlId="formReviewText">
              <Form.Label>Review</Form.Label>
              <Form.Control
                required
                type="input"
                placeholder="Enter review title."
                onChange={this.handleReviewTitleChange}
              />
              <Form.Text className="text-muted">
                Feel free to get creative!
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
            <Button variant="success" onClick={this.handleSubmit}>
              Add Review
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default AddReviewModal;
