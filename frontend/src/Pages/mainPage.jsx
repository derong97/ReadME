import React from "react";
import axios from "axios";
import "../Styles/main.css";
import "font-awesome/css/font-awesome.min.css";
import { Form, Dropdown, DropdownButton } from "react-bootstrap";
import GridList from "@material-ui/core/GridList";
import NavBar from "../Components/NavBar.jsx";
import Book from "../Components/BookItem.jsx";
import Footer from "../Components/Footer.jsx";
import Pagination from "react-js-pagination";
import BookImg from "../Image/login_bg.png";
import Logo from "../Image/logo_black.png";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import LoadingOverlay from "react-loading-overlay";
import * as legoData from "../Image/lego_loading";
import * as doneData from "../Image/done_loading";

//Loading screen
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const defaultOptions2 = {
  loop: false,
  autoplay: true,
  animationData: doneData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.location.state.token,
      loading: true,
      done: false,
      searching: false,
      id: props.location.state.id,
      username: props.location.state.username,
      dropDownValue: "Popularity",
      category: "",
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
      activePage: 1,
    };
  }

  componentDidMount() {
    // time taken to retrieve value from the backend for the top 30 books
    setTimeout(() => {
      this.setState({ loading: false });
      setTimeout(() => {
        this.setState({ done: true });
      }, 500);
    }, 1000);
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

  handleCategoryChange = (cat) => {
    var catList = "";
    var i;
    for (i = 0; i < cat.length; i++) {
      if (i === 0) {
        catList += cat[i].value;
      } else {
        catList += ", " + cat[i].value;
      }
    }
    this.setState({
      category: catList,
    });

    console.log("cat change", cat);
    console.log(cat.length);
    console.log(catList);
    console.log(this.state.category);
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

  handlePageChange(pageNumber) {
    //reload screen with new set of books
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  render() {
    const categories = [
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

    return (
      <LoadingOverlay
        active={this.state.searching}
        spinner
        text="searching ..."
      >
        <div>
          {!this.state.done ? (
            <FadeIn>
              <div id="load" class="col">
                {this.state.loading ? (
                  <Lottie options={defaultOptions} height={150} width={150} />
                ) : (
                  <Lottie options={defaultOptions2} height={150} width={150} />
                )}
                <div id="load-header">
                  <img className="navbrand-img" alt="ReadME Logo" src={Logo} />
                  <h1>ReadME</h1>
                </div>
              </div>
            </FadeIn>
          ) : (
            <body id="body">
              <NavBar
                event={this}
                token={this.state.token}
                username={this.state.username}
                searching={this.state.searching}
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
                            onClick={(e) =>
                              this.changeValue(e.target.textContent)
                            }
                          >
                            Popularity
                          </Dropdown.Item>
                          <Dropdown.Item
                            id="sortby-item"
                            as="button"
                            onClick={(e) =>
                              this.changeValue(e.target.textContent)
                            }
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
                            <Book
                              event={this}
                              token={this.state.token}
                              book={book}
                            />
                          ))}
                        </GridList>
                        <Pagination
                          itemClass="page-item"
                          linkClass="page-link"
                          activePage={this.state.activePage}
                          itemsCountPerPage={1} // helps you to calculate how many pages you need depending on your items
                          totalItemsCount={3}
                          pageRangeDisplayed={5}
                          onChange={this.handlePageChange.bind(this)}
                        />
                      </div>
                      <div id="filter">
                        <text id="filterby-header">FILTER BY</text>
                        <div id="genres">
                          <text>GENRES</text>
                          <Form
                          // onSubmit={this.checkGenres}
                          >
                            <Select
                              closeMenuOnSelect={false}
                              components={makeAnimated()}
                              isMulti
                              name="Category"
                              options={categories}
                              className="basic-multi-select"
                              classNamePrefix="select"
                              onChange={this.handleCategoryChange}
                            />
                            <div id="genres-submit">
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
          )}
        </div>
      </LoadingOverlay>
    );
  }
}
export default MainPage;
