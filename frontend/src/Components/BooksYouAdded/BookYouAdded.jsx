import React, { Component } from "react";
import Logo from "../../Image/logo_white.png";

class BookYouAdded extends Component {
  state = {
    // to call the data of the book here?
    imageUrl: "http://ecx.images-amazon.com/images/I/51fAmVkTbyL._SY300_.jpg",
    title: "Girls Ballet Tutu Zebra Hot Pink",
    author: "Riley Sager",
    avg_rating: 4.9,
    review_time: "09 13, 2009",
  };

  styles = {
    //if you wanted to have a standard style to call
    bookCoverImage: {
        width: 85,
        height: 128,
    },

    reviewText: {
        fontFamily: "Gotham-Book"
    }
  };

  render() {
    return (
      <div className= "container">
        {this.props.children}
        <img src={this.state.imageUrl} alt="" style={this.styles.bookCoverImage} />
        <h4> {this.state.title}</h4>
        <h6>by {this.state.author}</h6>
        <h6>Average Rating: {this.state.avg_rating}</h6>
        <p style = {this.styles.reviewText}> 
          "I bought this for my husband who plays the piano. He is having a
          wonderful time playing these old hymns. The music is at times hard to
          read because we think the book was published for singing from more
          than playing from. Great purchase though!"
        </p>
        <p style = {this.styles.reviewText}>
          <i>{this.state.review_time}</i>
        </p>
        <button
          onClick={() => this.props.onDelete(this.props.BookYouAdded.asin)} //raise event to Counters
          className="btn btn-danger btn-sm m-2"
        >
          Delete Book
        </button>
      </div>
    );
  }

  //   onDelete(){
  //       console.log("delete button pressed!")
  //   }
}

export default BookYouAdded;
