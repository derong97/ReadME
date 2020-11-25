import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import axios from "axios";

class DeleteReviewModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      title: this.props.title,
    };
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
          <Modal.Title>Delete Review for this book?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your review for this book?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-info"
            type="submit"
            onClick={this.props.onHide}
          >
            Back
          </Button>
          <Button variant="danger" onClick={this.props.handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DeleteReviewModal;
