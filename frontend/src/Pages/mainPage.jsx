import React from "react";
import axios from "axios";
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
      dropDownValue: "Popularity",
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
      genres: {
        fantasy: false,
        youngadult: false,
        horror: false,
        thriller: false,
        cooking: false,
        inspo: false,
        travel: false,
        crime: false,
      },
    };
  }

  changeValue = (text) => {
    this.setState({ dropDownValue: text });

    // const url = "";
    // var sortby = this.state.dropDownValue;
    // console.log(sortby);

    // const body = {
    //   params: { sortby: sortby },
    // };
    // console.log(body);

    // evt.preventDefault();
    // axios
    //   .get(url, body)
    //   .then((res) => {
    //     console.log(res);
    //     // retrieve top 30 books
    //     this.setState({ books: res.data });
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //     console.log(err.request);
    //   });
  };

  handleCheckboxChange = (evt) => {
    const genres = this.state.genres;
    genres[evt.target.id] = evt.target.checked;
    this.setState({
      genres: genres,
    });
  };

  clearAll = (evt) => {
    evt.preventDefault();
    this.setState({
      genres: {
        fantasy: false,
        youngadult: false,
        horror: false,
        thriller: false,
        cooking: false,
        inspo: false,
        travel: false,
        crime: false,
      },
    });
  };

  // checkGenres = (evt) => {
  //   const url = "";
  //   var genres = this.state.genres;
  //   var selected = [];
  //   for (var key in genres) {
  //     if (genres[key]) {
  //       selected.push(key);
  //     }
  //   }
  //   console.log(selected);
  //   const body = {
  //     params: { genres: selected },
  //   };
  //   console.log(body);
  //   evt.preventDefault();
  //   axios
  //     .get(url, body)
  //     .then((res) => {
  //       console.log(res);
  //       // retrieve top 30 books
  //       this.setState({ books: res.data });
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //       console.log(err.request);
  //     });
  // };

  render() {
    return (
      <body id="body">
        <NavBar
          event={this}
          username={this.state.username}
          home="nav-main"
          byme="nav-sub"
        ></NavBar>

        <div class="container">
          <div id="header-n-filter" class="row">
            <div id="header-n-books" class="col">
              <div id="body-header" class="row">
                <h4 id="header" class="col">
                  EXPLORE
                </h4>
                <div id="sortby" class="col">
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
              <div id="body-content" class="row">
                <div id="book-container" class="col">
                  <GridList cols={4}>
                    {this.state.books.map((book) => (
                      <Book event={this} data={book} />
                    ))}
                  </GridList>
                </div>
                <div id="filter">
                  <text id="filterby-header">FILTER BY</text>
                  <div id="genres">
                    <text>GENRES</text>
                    <Form
                    // onSubmit={this.checkGenres}
                    >
                      <Form.Group>
                        <Form.Label id="genres-header">
                          <i>Fiction</i>
                        </Form.Label>
                        <Form.Check
                          id="fantasy"
                          className="genres-item"
                          label="Fantasy"
                          onChange={this.handleCheckboxChange}
                          checked={this.state.genres.fantasy}
                        />
                        <Form.Check
                          id="youngadult"
                          className="genres-item"
                          label="Young Adult"
                          onChange={this.handleCheckboxChange}
                          checked={this.state.genres.youngadult}
                        />
                        <Form.Check
                          id="horror"
                          className="genres-item"
                          label="Horror"
                          onChange={this.handleCheckboxChange}
                          checked={this.state.genres.horror}
                        />
                        <Form.Check
                          id="thriller"
                          className="genres-item"
                          label="Thriller"
                          onChange={this.handleCheckboxChange}
                          checked={this.state.genres.thriller}
                        />
                        <Form.Label id="genres-header">
                          <i>Non-Fiction</i>
                        </Form.Label>
                        <Form.Check
                          id="cooking"
                          className="genres-item"
                          label="Cooking"
                          onChange={this.handleCheckboxChange}
                          checked={this.state.genres.cooking}
                        />
                        <Form.Check
                          id="inspo"
                          className="genres-item"
                          label="Motivational/ Inspirational"
                          onChange={this.handleCheckboxChange}
                          checked={this.state.genres.inspo}
                        />
                        <Form.Check
                          id="travel"
                          className="genres-item"
                          label="Travel"
                          onChange={this.handleCheckboxChange}
                          checked={this.state.genres.travel}
                        />
                        <Form.Check
                          id="crime"
                          className="genres-item"
                          label="True Crime"
                          onChange={this.handleCheckboxChange}
                          checked={this.state.genres.crime}
                        />
                      </Form.Group>
                      <p id="genres-expand" align="right">
                        <u>See More</u>
                      </p>
                      <div id="genres-submit">
                        <button id="genres-bttn" onClick={this.clearAll}>
                          Clear All
                        </button>
                        <button type="submit" id="genres-bttn">
                          Submit
                        </button>
                      </div>
                    </Form>
                  </div>
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
