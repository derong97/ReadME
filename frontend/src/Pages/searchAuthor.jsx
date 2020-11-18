import React from "react";
import "../Styles/main.css";
import "font-awesome/css/font-awesome.min.css";
import GridList from "@material-ui/core/GridList";
import NavBar from "../Components/NavBar.jsx";
import Book from "../Components/BookItem.jsx";
import Footer from "../Components/Footer.jsx";
import BookImg from "../Image/login_bg.png";

class SearchAuthor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.location.state.username,
      title: props.location.state.title,
      books: props.location.state.books,
      // books: [
      //   {
      //     link: BookImg,
      //     book: "Book 1 Title",
      //     rating: 2,
      //   },
      //   {
      //     link: BookImg,
      //     book: "Book 1 Title",
      //     rating: 2,
      //   },
      //   {
      //     link: BookImg,
      //     book: "Book 1 Title",
      //     rating: 2,
      //   },
      //   {
      //     link: BookImg,
      //     book: "Book 1 Title",
      //     rating: 2,
      //   },
      //   {
      //     link: BookImg,
      //     book: "Book 1 Title",
      //     rating: 2,
      //   },
      //   {
      //     link: BookImg,
      //     book: "Book 1 Title",
      //     rating: 2,
      //   },
      //   {
      //     link: BookImg,
      //     book: "Book 1 Title",
      //     rating: 2,
      //   },
      //   {
      //     link: BookImg,
      //     book: "Book 1 Title",
      //     rating: 2,
      //   },
      //   {
      //     link: BookImg,
      //     book: "Book 1 Title",
      //     rating: 2,
      //   },
      //   {
      //     link: BookImg,
      //     book: "Book 1 Title",
      //     rating: 2,
      //   },
      //   {
      //     link: BookImg,
      //     book: "Book 1 Title",
      //     rating: 2,
      //   },
      // ],
    };
  }

  componentDidMount() {
    console.log(this.state.books);
    const books = this.state.books;
    console.log(books[0].imUrl);
  }

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
          </div>
        </div>

        <Footer></Footer>
      </body>
    );
  }
}
export default SearchAuthor;
