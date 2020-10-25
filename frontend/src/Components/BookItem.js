import React from "react";
import StarRatings from "react-star-ratings";

const Book = ({ event, link, book, rating }) => {
  return (
    <div
      className="book-content"
      onClick={() => event.props.history.push("/book")}
    >
      <img className="book" alt="book" src={link}></img>
      <text className="book">{book}</text>
      <StarRatings
        name="rating"
        rating={rating}
        starRatedColor="orange"
        starDimension="20px"
        starSpacing="2.5px"
        numberOfStars={5}
      />
    </div>
  );
};

export default Book;
