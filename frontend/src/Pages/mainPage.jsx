import React from "react";
import "../Styles/main.css";
import "font-awesome/css/font-awesome.min.css";
import { Form, Dropdown, DropdownButton } from "react-bootstrap";
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
      bookImg: BookImg,
      bookImg1: BookImg,
      bookImg2: BookImg,
      bookImg3: BookImg,
      bookImg4: BookImg,
      bookImg5: BookImg,
      bookImg6: BookImg,
      bookImg7: BookImg,
      bookImg8: BookImg,
      book1: "Book 1 Title",
      book2: "Book 2 Title",
      book3: "Book 3 Title",
      book4: "Book 4 Title",
      book5: "Book 5 Title",
      book6: "Book 6 Title",
      book7: "Book 7 Title",
      book8: "Book 8 Title",
      rating1: 2,
      rating2: 2,
      rating3: 2,
      rating4: 2,
      rating5: 2,
      rating6: 2,
      rating7: 2,
      rating8: 2,
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
                <h4>RECOMMENDATION</h4>
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
                      Lowest Price
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="sortby-item"
                      as="button"
                      onClick={(e) => this.changeValue(e.target.textContent)}
                    >
                      Highest Price
                    </Dropdown.Item>
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
                <div class="row">
                  <Book
                    event={this}
                    link={this.state.bookImg1}
                    book={this.state.book1}
                    rating={this.state.rating1}
                  ></Book>
                  <Book
                    event={this}
                    link={this.state.bookImg2}
                    book={this.state.book2}
                    rating={this.state.rating2}
                  ></Book>
                  <Book
                    event={this}
                    link={this.state.bookImg3}
                    book={this.state.book3}
                    rating={this.state.rating3}
                  ></Book>
                  <Book
                    event={this}
                    link={this.state.bookImg4}
                    book={this.state.book4}
                    rating={this.state.rating4}
                  ></Book>
                </div>

                <div class="row">
                  <Book
                    event={this}
                    link={this.state.bookImg5}
                    book={this.state.book5}
                    rating={this.state.rating5}
                  ></Book>
                  <Book
                    event={this}
                    link={this.state.bookImg6}
                    book={this.state.book6}
                    rating={this.state.rating6}
                  ></Book>
                  <Book
                    event={this}
                    link={this.state.bookImg7}
                    book={this.state.book7}
                    rating={this.state.rating7}
                  ></Book>
                  <Book
                    event={this}
                    link={this.state.bookImg8}
                    book={this.state.book8}
                    rating={this.state.rating8}
                  ></Book>
                </div>
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
