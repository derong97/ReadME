import React from "react";
import "../Styles/main.css";
import "font-awesome/css/font-awesome.min.css";
import { Form, Dropdown, DropdownButton } from "react-bootstrap";
import GridList from "@material-ui/core/GridList";
import NavBar from "../Components/NavBar.jsx";
import Book from "../Components/BookItem.jsx";
import Footer from "../Components/Footer.jsx";
import BookImg from "../Image/login_bg.png";

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "GlendiBear",
      dropDownValue: "sort by ...",
      books: [
        {
          link: BookImg,
          book: "Book 1 Title",
          rating: 2,
        },
        {
          link: BookImg,
          book: "Book 1 Title",
          rating: 2,
        },
        {
          link: BookImg,
          book: "Book 1 Title",
          rating: 2,
        },
        {
          link: BookImg,
          book: "Book 1 Title",
          rating: 2,
        },
        {
          link: BookImg,
          book: "Book 1 Title",
          rating: 2,
        },
      ],
      fantasy: false,
      youngadult: false,
      horror: false,
      thriller: false,
      cooking: false,
      inspo: false,
      travel: false,
      crime: false,
    };
  }

  changeValue = (text) => {
    this.setState({ dropDownValue: text });
  };

  handleCheckboxChange = (evt) => {
    this.setState({
      [evt.target.id]: evt.target.checked,
    });
  };

  clearAll = () => {
    this.setState({
      fantasy: false,
      youngadult: false,
      horror: false,
      thriller: false,
      cooking: false,
      inspo: false,
      travel: false,
      crime: false,
    });
  };

  render() {
    return (
      <body id="body">
        <NavBar event={this} username={this.state.username}></NavBar>

        <div class="container">
          <div id="header-n-filter" class="row">
            <div id="header-n-books" class="col">
              <div id="body-header" class="row">
                <h4>EXPLORE</h4>
                <div id="sortby">
                  <text>SORT BY</text>
                  <DropdownButton
                    id="sortby-dropdown"
                    title={this.state.dropDownValue}
                  >
                    <Dropdown.Item
                      id="sortby-item"
                      as="button"
                      onClick={(e) => this.changeValue(e.target.textContent)}
                    >
                      Popularity
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="sortby-item"
                      as="button"
                      onClick={(e) => this.changeValue(e.target.textContent)}
                    >
                      Latest Arrival
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
              <div id="book-container">
                <GridList cols={4}>
                  {this.state.books.map((book) => (
                    <Book event={this} data={book} />
                  ))}
                </GridList>
              </div>
            </div>
            <div id="filter">
              <text id="filterby-header">FILTER BY</text>
              <div id="genres">
                <text>GENRES</text>
                <Form.Group>
                  <Form.Label id="genres-header">
                    <i>Fiction</i>
                  </Form.Label>
                  <Form.Check
                    id="fantasy"
                    className="genres-item"
                    label="Fantasy"
                    onChange={this.handleCheckboxChange}
                    checked={this.state.fantasy}
                  />
                  <Form.Check
                    id="youngadult"
                    className="genres-item"
                    label="Young Adult"
                    onChange={this.handleCheckboxChange}
                    checked={this.state.youngadult}
                  />
                  <Form.Check
                    id="horror"
                    className="genres-item"
                    label="Horror"
                    onChange={this.handleCheckboxChange}
                    checked={this.state.horror}
                  />
                  <Form.Check
                    id="thriller"
                    className="genres-item"
                    label="Thriller"
                    onChange={this.handleCheckboxChange}
                    checked={this.state.thriller}
                  />
                  <Form.Label id="genres-header">
                    <i>Non-Fiction</i>
                  </Form.Label>
                  <Form.Check
                    id="cooking"
                    className="genres-item"
                    label="Cooking"
                    onChange={this.handleCheckboxChange}
                    checked={this.state.cooking}
                  />
                  <Form.Check
                    id="inspo"
                    className="genres-item"
                    label="Motivational/ Inspirational"
                    onChange={this.handleCheckboxChange}
                    checked={this.state.inspo}
                  />
                  <Form.Check
                    id="travel"
                    className="genres-item"
                    label="Travel"
                    onChange={this.handleCheckboxChange}
                    checked={this.state.travel}
                  />
                  <Form.Check
                    id="crime"
                    className="genres-item"
                    label="True Crime"
                    onChange={this.handleCheckboxChange}
                    checked={this.state.crime}
                  />
                </Form.Group>
                <p id="genres-expand" align="right">
                  <u>See More</u>
                </p>
                <div>
                  <button id="genres-bttn" onClick={this.clearAll}>
                    Clear All
                  </button>
                  <button id="genres-bttn">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer></Footer>
      </body>
    );
  }
}
export default MainPage;
