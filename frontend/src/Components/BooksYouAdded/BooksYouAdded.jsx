import React, { Component } from "react";
import BookYouAdded from "./BookYouAdded";
import '../../Styles/booksyouadded.css'


class BooksYouAdded extends Component {


  render() {
    return (
      <div>
        
        {this.props.BooksYouAdded.map((bookYouAdded) => (
          <BookYouAdded
            key={bookYouAdded.asin} //used internally
            onDelete={this.props.onDelete}
            bookYouAdded={bookYouAdded}
          ></BookYouAdded>
        ))}
      </div>
    );
  }
}

export default BooksYouAdded;
