import React from "react";
import "../Styles/main.css";
import "font-awesome/css/font-awesome.min.css";
import GridList from "@material-ui/core/GridList";
import NavBar from "../Components/NavBar.jsx";
import Book from "../Components/BookItem.jsx";
import Footer from "../Components/Footer.jsx";

class SearchAuthor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.location.state.token,
      username: props.location.state.username,
      title: props.location.state.title,
      books: props.location.state.books,
    };
  }

  render() {
    return (
      <body id="body">
        <NavBar
          event={this}
          token={this.state.token}
          username={this.state.username}
          home="nav-main"
          byme="nav-sub"
        ></NavBar>

        <div class="container">
          <div id="body-header">
            <h4>Search for {this.state.title} ... ...</h4>
          </div>
          <div id="body-content">
            <GridList cols={5}>
              {this.state.books.map((book) => (
                <Book event={this} data={book} />
              ))}
            </GridList>
          </div>
        </div>

        <Footer></Footer>
      </body>
    );
  }
}
export default SearchAuthor;
