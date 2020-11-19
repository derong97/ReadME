import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import Ratings from "react-ratings-declarative";
import ReactStars from "react-rating-stars-component";
import axios from "axios";

class AddReviewModal extends Component {
  // constructor(props) {
  //   super(props);
  // }


  state = {
    loading: false,
    asin: 0,
    reviewTitle: "",
    rating: 3.7,
    reviewText: "",
  };

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

  getUnixTimestamp = () => {
    const dateTime = Date.now();
    const timestamp = Math.floor(dateTime / 1000);

    return timestamp;
  }

  getCurDate = () => {
    var dateTime = new Date(),
    date = dateTime.getFullYear() + ',' + (dateTime.getMonth() + 1) + ',' + dateTime.getDate();

    return date;
  };

  handleSubmit = (event) => {

    this.setState({loading:true})
    const url = {"http://localhost:5000/book/" + this.state.asin};
    var asin = this.state.asin;
    var overall = this.state.rating;
    var reviewText = this.state.reviewText;
    var reviewTime = this.getCurDate();
    var reviewerID = this.props.username; //HELP
    var reviewerName = this.props.name;
    var summary = this.state.reviewTitle;
    var unixReviewTime = this.getUnixTimestamp();

    // SQL post 
    const review_body = {
    };

    console.log("submitted");

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
          <Form.Group as={Col} md="8" controlId="formASIN">
          <Form.Label>ASIN</Form.Label>
          <Form.Control
            type="input"
            placeholder="enter the book's asin number "
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
            <Button variant="success" type = "submit" onClick={this.handleSubmit}>
              Add Review
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default AddReviewModal;
