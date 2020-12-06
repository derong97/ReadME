import React from "react";
import StarRatings from "react-star-ratings";

class RelatedBook extends React.Component {
  bookDeets = () => {
    this.props.event.props.history.push({
      pathname: "/book",
      state: {
        token: this.props.token,
        id: this.props.id,
        username: this.props.username,
        book: this.props.book,
        reviews: this.props.reviews,
      },
    });
  };

  render() {
    return (
      <div className="row" onClick={this.bookDeets}>
        <img
          className="relatedbooks-img"
          alt="Related Books"
          src={this.props.book.imUrl}
        ></img>
        <div className="relatedbooks-info">
          <text>{this.props.book.title}</text>
          <StarRatings
            name="rating"
            rating={
              this.props.book.avg_rating == null
                ? 0
                : this.props.book.avg_rating
            }
            starRatedColor="orange"
            starDimension="20px"
            starSpacing="2.5px"
            numberOfStars={5}
          />
        </div>
      </div>
    );
  }
}

export default RelatedBook;
