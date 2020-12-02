import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "../../Styles/modal.css";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";

class AddBookModal extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    loading: false,
    title: "",
    // author: "",
    imageURL: "",
    asin: "",
    price: "",
    description: "",
    // isFiction: false,
    categories: "",
    token: this.props.token,
  };

  //VALIDATE THE FORM NEXT TIME
  // const [validated, setValidated] = useState(false);

  // handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   setValidated(true);
  // };

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  // handleAuthorChange = (event) => {
  //   this.setState({
  //     author: event.target.value,
  //   });
  // };

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

  // handleisFictionChange = (isFiction) => {
  //   this.setState({
  //     isFiction: isFiction.value,
  //   });
  // };

  handleDescriptionChange = (description) => {
    this.setState({
      description: description.target.value,
    });
  };

  handleCategoriesChange = (categories) => {
    var categoriesList = "";
    var i;
    for (i = 0; i < categories.length; i++) {
      if (i === 0) {
        categoriesList += categories[i].value;
      } else {
        categoriesList += ", " + categories[i].value;
      }
    }
    this.setState({
      categories: categoriesList,
    });

    console.log("categories change", categories);
    console.log(categories.length);
    console.log(categoriesList);
    console.log(this.state.categories);
  };

  handleSubmit = (event) => {
    // console.log("LATEST STATES for Add Book");
    // console.log("title change", this.state.title);
    // // console.log("author: ", this.state.author);
    // console.log("imageURL: ", this.state.imageURL);
    // console.log("asin: ", this.state.asin);
    // console.log("price: ", this.state.price);
    // console.log("description: ", this.state.description);
    // console.log("categories: ", this.state.categories);

    this.setState({ loading: true });

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
      categories: categories,
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
          console.log("book adding SUCCESS");
          this.setState({ loading: false });
          this.props.event.props.history.push({
            pathname: "/main",
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
        // this.setState({ loading: false, userError });
        // console.log(err.response);
        // console.log(err.request);
      });
  };

  render() {
    const options = [
      { value: "Fantasy", label: "Fantasy" },
      { value: "Science Fiction", label: "Science Fiction" },
      { value: "Dystopian", label: "Dystopian" },
      { value: "Adventure", label: "Adventure" },
      { value: "Historical Fiction", label: "Historical Fiction" },
      { value: "Young Adult", label: "Young Adult" },
      { value: "Children's Fiction", label: "Children's Fiction" },
      { value: "Romance", label: "Romance" },
      { value: "Detective & Mystery", label: "Detective & Mystery" },
      { value: "Horror", label: "Horror" },
      { value: "Thriller", label: "Thriller" },
    ];
    const optionsNonFiction = [
      { value: "Memoir & Autobiography", label: "Memoir & Autobiography" },
      { value: "Biography", label: "Biography" },
      { value: "Cooking", label: "Cooking" },
      { value: "Art & Photography", label: "Art & Photography" },
      {
        value: "Self-Help/ Personal Development",
        label: "Self-Help/ Personal Development",
      },
      {
        value: "Motivational/ Inspirational",
        label: "Motivational/ Inspirational",
      },
      { value: "Health & Fitness", label: "Health & Fitness" },
      { value: "History", label: "History" },
      { value: "Craft, Hobbies & Home", label: "Craft, Hobbies & Home" },
      { value: "Families & Relationships", label: "Families & Relationships" },
      { value: "Humor & Entertainment", label: "Humor & Entertainment" },
      { value: "Business & Money", label: "Business & Money" },
      { value: "Law & Crimminology", label: "Law & Crimminology" },
      {
        value: "Politics & Social Sciences",
        label: "Politics & Social Sciences",
      },
      { value: "Religion & Spirituality", label: "Religion & Spirituality" },
      { value: "Education & Teaching", label: "Education & Teaching" },
      { value: "Travel", label: "Travel" },
      { value: "True Crime", label: "True Crime" },
    ];

    return (
      <LoadingOverlay
        active={this.state.loading}
        spinner
        text="adding book ..."
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
            <Modal.Title>Add Book</Modal.Title>
          </Modal.Header>
          <Form>
            <Modal.Body>
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

              {/* <Form.Group as={Row} controlId="formAuthor">
              <Form.Label column sm={2}>
                Author
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  required
                  type="input"
                  placeholder="enter author's name"
                  onChange={this.handleAuthorChange}
                />
                <Form.Text className="text-muted">
                  First name goes first. Only social suffixes are used. This
                  includes Jr., Sr., and Roman numerals. There is no punctuation
                  between the name and the suffix.
                </Form.Text>
              </Col>
            </Form.Group> */}

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
                  // value={this.state.Category}
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
                {/* <Form.Text className="text-muted">Non-Fiction</Form.Text>
              <Select
                // value={this.state.Category}
                closeMenuOnSelect={false}
                components={makeAnimated()}
                isMulti
                name="Category"
                options={optionsNonFiction}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={this.handleCategoryChange}
              /> */}
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
              <Button variant="danger" onClick={this.props.onHide}>
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
      </LoadingOverlay>
    );
  }
}

export default AddBookModal;
