import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import Ratings from "react-ratings-declarative";
import ReactStars from "react-rating-stars-component";

class AddReviewModal extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    reviewTitle: "",
    rating: 3.7,
    reviewText: "",
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
    console.log("LATEST STATES for Add Review");
    console.log("reviewTitle", this.state.reviewTitle);
    console.log("rating: ", this.state.rating);
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

            <Form.Group as={Row} controlId="formRatings">
              <Form.Label column sm={2}>
                Rating
              </Form.Label>
              {/* <Ratings
                rating={this.state.rating}
                widgetRatedColors="orange"
                changeRating={this.handleRatingChange}
              >
                <Ratings.Widget widgetHoverColor="yellow" widgetDimension="40px"/>
                <Ratings.Widget widgetHoverColor="yellow" widgetDimension="40px"/>
                <Ratings.Widget widgetHoverColor="yellow" widgetDimension="40px"/>
                <Ratings.Widget widgetHoverColor="yellow" widgetDimension="40px"/>
                <Ratings.Widget widgetHoverColor="yellow" widgetDimension="40px"/>
              </Ratings> */}
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
