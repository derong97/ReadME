import React from "react";
import "../Styles/main.css";
import "font-awesome/css/font-awesome.min.css";
import GridList from "@material-ui/core/GridList";
import NavBar from "../Components/NavBar.jsx";
import Book from "../Components/BookItem.jsx";
import Footer from "../Components/Footer.jsx";
import BookImg from "../Image/login_bg.png";

class SearchAuthor extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "GlendiBear",
      author: "GlendiBear",
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
          {
            link: BookImg,
            book: "Book 1 Title",
            rating: 2,
          }
      ],
    };
  }

  render() {
    return (
      <body id="body">
        <NavBar event={this} username={this.state.username}></NavBar>

        <div class="container">
          <div id="header-n-filter" class="row">
            <div id="header-n-books" class="col">
              <div id="body-header" class="row">
                <h4>Search for {this.state.author} ... ...</h4>
              </div>
              <div id="book-container">
                <GridList cols={5}>
                  {this.state.books.map((book) => (
                    <Book event={this} data={book} />
                  ))}
                </GridList>
              </div>
            </div>
          </div>
        </div>

        <Footer></Footer>
      </body>
    );
  }
}
export default SearchAuthor;
