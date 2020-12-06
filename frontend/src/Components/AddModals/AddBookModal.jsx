import React from "react";
import axios from "axios";
import "../../Styles/modal.css";

import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import LoadingOverlay from "react-loading-overlay";

class AddBookModal extends React.Component {
  state = {
    loading: false,
    title: "",
    imageURL: "",
    asin: "",
    price: "",
    description: "",
    categories: "",
    token: this.props.token,
    showSuccess: false,
  };

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleURLChange = (event) => {
    this.setState({
      imageURL: event.target.value,
    });
  };

  handleASINChange = (event) => {
    this.setState({
      asin: event.target.value,
    });
  };

  handlePriceChange = (event) => {
    this.setState({
      price: event.target.value,
    });
  };

  handleDescriptionChange = (description) => {
    this.setState({
      description: description.target.value,
    });
  };

  handleCategoriesChange = (categories) => {
    console.log(categories);
    var categoriesList = "";
    var i;
    for (i = 0; i < categories.length; i++) {
      if (i === 0) {
        categoriesList += categories[i].value;
      } else if (i == categories.length - 1) {
        categoriesList += categories[i].value;
      } else {
        categoriesList += ", " + categories[i].value;
      }
    }
    console.log(categoriesList);
    this.setState({
      categories: categoriesList,
    });
  };

  handleSubmit = (event) => {
    if (
      !this.state.asin ||
      !this.state.title ||
      !this.state.description ||
      !this.state.price ||
      !this.state.imageURL ||
      !this.state.categories
    ) {
      this.validate("empty", this.state.asin);
    } else {
      const url = "/book/add";

      const title = this.state.title;
      const asin = this.state.asin;
      const description = this.state.description;
      const price = this.state.price;
      const imUrl = this.state.imageURL;
      const categories = this.state.categories;

      const headers = { headers: { "x-access-tokens": this.state.token } };

      const params = {
        title: title,
        asin: asin,
        description: description,
        price: price,
        imUrl: imUrl,
        categories: [categories],
      };

      this.setState({ loading: true });
      event.preventDefault();

      axios
        .post(url, params, headers)
        .then((res) => {
          if (res.status == 200) {
            this.validate("uploaded", asin);
            this.setState({
              loading: false,
            });
          }
        })
        .catch((err) => {
          this.validate("error", asin);
          console.log(err.response);
          console.log(err.request);
        });
    }
  };

  validate = (check, asin) => {
    if (check == "error") {
      let error = "* Asin " + asin + " is already taken up";
      this.setState({ error });
    } else if (check == "empty") {
      let error = "* Please fill in all the empty fields";
      this.setState({ error });
    } else {
      this.handleCloseTemp();
      this.handleOpenSuccess();
    }
  };

  handleClose = () => {
    let error = "";
    this.setState({
      title: "",
      imageURL: "",
      asin: "",
      price: "",
      description: "",
      categories: "",
      loading: false,
      error,
    });
    this.props.onHide();
  };

  handleCloseTemp = () => {
    let error = "";
    this.setState({
      loading: false,
      error,
    });
    this.props.onHide();
  };

  handleOpenSuccess = () => {
    this.setState({ showSuccess: true });
  };

  handleCloseSuccess = () => {
    this.setState({
      title: "",
      imageURL: "",
      asin: "",
      price: "",
      description: "",
      categories: "",
      showSuccess: false,
    });
  };

  render() {
    const options = [
      { value: "Adventure", label: "Adventure" },
      { value: "Biographies", label: "Biographies" },
      { value: "Children", label: "Children" },
      { value: "Crime", label: "Crime" },
      { value: "Fantasy", label: "Fantasy" },
      { value: "History", label: "History" },
      { value: "Horror", label: "Horror" },
      { value: "Humor", label: "Humor" },
      { value: "Journalism & Nonfiction", label: "Journalism & Nonfiction" },
      { value: "Literary", label: "Literary" },
      {
        value: "Philosophy & Social Aspects",
        label: "Philosophy & Social Aspects",
      },
      { value: "Romance", label: "Romance" },
      { value: "Science Fiction", label: "Science Fiction" },
      { value: "Self-Help", label: "Self-Help" },
      { value: "Travel & Tourism", label: "Travel & Tourism" },
      { value: "Teen & Young Adult", label: "Teen & Young Adult" },
    ];

    return (
      <LoadingOverlay
        active={this.state.loading}
        spinner
        text="adding book ..."
      >
        <Modal
          show={this.props.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Book</Modal.Title>
          </Modal.Header>
          <Form>
            <Modal.Body>
              <div id="error">{this.state.error}</div>
              <Form.Group as={Row} controlId="formTitle">
                <Form.Label column sm={2}>
                  Title
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    required
                    type="input"
                    placeholder="enter book title"
                    onChange={this.handleTitleChange}
                  />
                  <Form.Text className="text-muted">
                    If the book is in a series, put which book it is in
                    parenthesis after the title. For example, Breaking Dawn
                    (Twilight, #4).
                  </Form.Text>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formImageURL">
                <Form.Label column sm={2}>
                  Image URL
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    required
                    type="input"
                    placeholder="enter the book's amazon URL"
                    onChange={this.handleURLChange}
                  />
                  <Form.Text className="text-muted">
                    Provide a link to the image of the book (amazon links only.)
                  </Form.Text>
                </Col>
              </Form.Group>

              <Form.Row>
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
                <Form.Group as={Col} md="4" controlId="formPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="enter price of book"
                    required
                    onChange={this.handlePriceChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid price.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formDescriptionText">
                <Form.Label>Description</Form.Label>

                <textarea
                  className="form-control"
                  id="formDescriptionText"
                  rows={4}
                  maxLength={200}
                  onChange={this.handleDescriptionChange}
                  placeholder="what is this book about?"
                ></textarea>

                <Form.Text className="text-muted">
                  Tell everyone in 200 characters or less.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Select
                  closeMenuOnSelect={false}
                  components={makeAnimated()}
                  isMulti
                  name="Category"
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={this.handleCategoriesChange}
                />
                <br></br>
              </Form.Group>

              <Form.Group as={Row} controlId="formAddBookTandC">
                <Col>
                  <Form.Check label="I agree to terms and conditions:" />
                  <Form.Text className="text-muted">
                    I declare that I was unable to find an existing entry of my
                    book on ReadME's repository.
                  </Form.Text>
                  <Form.Text className="text-muted">
                    I recognise that unnececessarily adding books into ReadMe's
                    repository may lead to possible blacklisting, suspension or
                    termination of my ReadMe acount.
                  </Form.Text>
                </Col>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.handleClose}>
                Close
              </Button>
              <Button
                variant="outline-success"
                type="submit"
                onClick={this.handleSubmit}
              >
                Add Book
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
            <Modal.Title>Successfully Added Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>"{this.state.asin}" has been successfully added!</p>
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

export default AddBookModal;
