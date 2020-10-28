import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import booksYouAddedPage from "../../Pages/booksYouAddedPage";

class AddReviewModal extends Component {
  constructor(props) {
    super(props);
  }

  state = {};
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
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddReviewModal;
