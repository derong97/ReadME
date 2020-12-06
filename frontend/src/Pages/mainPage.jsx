import React from "react";
import axios from "axios";
import "../Styles/main.css";
import "font-awesome/css/font-awesome.min.css";

import { Form } from "react-bootstrap";
import GridList from "@material-ui/core/GridList";
import Pagination from "react-js-pagination";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import LoadingOverlay from "react-loading-overlay";
import * as legoData from "../Image/lego_loading";
import * as doneData from "../Image/done_loading";

import NavBar from "../Components/NavBar.jsx";
import Book from "../Components/BookItem.jsx";
import Logo from "../Image/logo_black.png";

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
      loading: true,
      done: false,
      searching: false,
      token: props.location.state.token,
      id: props.location.state.id,
      username: props.location.state.username,
      books: props.location.state.books,
      category: props.location.state.category,
      count: props.location.state.count,
      activePage: props.location.state.activePage,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      this.setState({
        books: this.props.location.state.books,
        count: this.props.location.state.count,
        category: this.props.location.state.category,
        activePage: this.props.location.state.activePage,
      });
    }
  }

  componentDidMount() {
    this.getBooks();
  }
  z;

  getBooks = () => {
    var params = new URLSearchParams();
    for (var cat of this.state.category) {
      params.append("category", cat);
    }
    params.append("pageNum", this.state.activePage);

    const url = "/books";
    const body = {
      headers: { "x-access-tokens": this.state.token },
      params: params,
    };

    axios
      .get(url, body)
      .then((res) => {
        const metadata = res.data.metadata;
        const count = res.data.total_counts;
        if (res.status === 200) {
          this.setState({ books: metadata, count: count });
          this.setState({ loading: false });
          setTimeout(() => {
            this.setState({ done: true });
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.request);
      });
  };

  handleCategoryChange = (cat) => {
    var catList = [];
    for (var i = 0; i < cat.length; i++) {
      catList.push(cat[i].value);
    }
    this.setState({
      category: catList,
    });
  };

  categoryOnSubmit = (evt) => {
    this.setState({ searching: true });
    var params = new URLSearchParams();
    for (var cat of this.state.category) {
      params.append("category", cat);
    }
    params.append("pageNum", 1);

    const url = "/books";
    const body = {
      headers: { "x-access-tokens": this.state.token },
      params: params,
    };

    evt.preventDefault();
    axios
      .get(url, body)
      .then((res) => {
        const metadata = res.data.metadata;
        const count = res.data.total_counts;
        if (res.status === 200) {
          this.setState({ searching: false });
          this.props.history.push({
            pathname: "/main",
            state: {
              token: this.state.token,
              id: this.state.id,
              username: this.state.username,
              books: metadata,
              count: count,
              category: this.state.category,
              activePage: 1,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.request);
      });
  };

  handlePageChange(pageNum) {
    this.setState({ searching: true });
    this.setState({ activePage: pageNum });

    var params = new URLSearchParams();
    for (var cat of this.state.category) {
      params.append("category", cat);
    }
    params.append("pageNum", pageNum);

    const url = "/books";
    const body = {
      headers: { "x-access-tokens": this.state.token },
      params: params,
    };

    axios
      .get(url, body)
      .then((res) => {
        const metadata = res.data.metadata;
        const count = res.data.total_counts;
        if (res.status === 200) {
          this.setState({ searching: false });
          this.props.history.push({
            pathname: "/main",
            state: {
              token: this.state.token,
              id: this.state.id,
              username: this.state.username,
              books: metadata,
              count: count,
              category: this.state.category,
              activePage: pageNum,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.request);
      });
  }

  render() {
    const categories = [
      { value: "Dance", label: "Dance" },
      { value: "Dark Fantasy", label: "Dark Fantasy" },
      { value: "Halloween", label: "Halloween" },
      { value: "Multilevel", label: "Multilevel" },
      { value: "Preaching", label: "Preaching" },
      { value: "Racing", label: "Racing" },
      { value: "Vegetables", label: "Vegetables" },
      { value: "Warsaw", label: "Warsaw" },
    ];

    return (
      <LoadingOverlay active={this.state.searching} spinner text="loading ...">
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
                id={this.state.id}
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
                    </div>
                    <div id="body-content" class="row">
                      <div id="book-container" class="col">
                        <GridList cols={4}>
                          {this.state.books.map((book) => (
                            <Book
                              event={this}
                              id={this.state.id}
                              token={this.state.token}
                              username={this.state.username}
                              book={book}
                            />
                          ))}
                        </GridList>
                        <Pagination
                          itemClass="page-item"
                          linkClass="page-link"
                          activePage={this.state.activePage}
                          itemsCountPerPage={10}
                          totalItemsCount={this.state.count}
                          pageRangeDisplayed={5}
                          onChange={this.handlePageChange.bind(this)}
                        />
                      </div>
                      <div id="filter">
                        <text id="filterby-header">FILTER BY</text>
                        <div id="genres">
                          <text>GENRES</text>
                          <Form onSubmit={this.categoryOnSubmit}>
                            <Select
                              id="select"
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
            </body>
          )}
        </div>
      </LoadingOverlay>
    );
  }
}
export default MainPage;
