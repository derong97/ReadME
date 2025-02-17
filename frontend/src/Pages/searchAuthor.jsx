import React from "react";
import axios from "axios";
import "../Styles/main.css";
import "font-awesome/css/font-awesome.min.css";

import GridList from "@material-ui/core/GridList";
import Pagination from "react-js-pagination";
import LoadingOverlay from "react-loading-overlay";

import NavBar from "../Components/NavBar.jsx";
import Book from "../Components/BookItem.jsx";

class SearchAuthor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      token: props.location.state.token,
      id: props.location.state.id,
      username: props.location.state.username,
      title: props.location.state.title,
      books: props.location.state.books,
      count: props.location.state.count,
      activePage: props.location.state.activePage,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      this.setState({
        token: this.props.location.state.token,
        username: this.props.location.state.username,
        title: this.props.location.state.title,
        books: this.props.location.state.books,
        count: this.props.location.state.count,
        activePage: this.props.location.state.activePage,
      });
    }
  }

  handlePageChange(pageNum) {
    this.setState({ searching: true });
    this.setState({ activePage: pageNum });

    const url = "/books";
    const search = this.state.title;
    const body = {
      headers: { "x-access-tokens": this.state.token },
      params: { title: search, pageNum: pageNum },
    };

    axios
      .get(url, body)
      .then((res) => {
        const metadata = res.data.metadata;
        const count = res.data.total_counts;
        if (res.status === 200) {
          this.setState({ searching: false });
          this.props.history.push({
            pathname: "/search",
            state: {
              token: this.state.token,
              username: this.state.username,
              title: search,
              books: metadata,
              count: count,
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
    return (
      <LoadingOverlay
        active={this.state.searching}
        spinner
        text="searching ..."
      >
        <body id="body">
          <NavBar
            event={this}
            id={this.state.id}
            token={this.state.token}
            username={this.state.username}
            home="nav-main"
            byme="nav-sub"
          ></NavBar>

          <div className="container">
            <div id="body-header">
              <h4>Search for "{this.state.title}" ......</h4>
            </div>
            <div id="body-content">
              <GridList cols={5}>
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
            </div>
          </div>

          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={this.state.count}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
          />
        </body>
      </LoadingOverlay>
    );
  }
}
export default SearchAuthor;
