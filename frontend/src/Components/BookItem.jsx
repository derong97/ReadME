import React from "react";
import StarRatings from "react-star-ratings";

const Book = ({ event, data }) => {
  return (
    <div
      className="book-content"
      onClick={() => event.props.history.push("/book")}
    >
      <img className="book" alt="book" src={data.link}></img>
      <text className="book">{data.book}</text>
      <StarRatings
        name="rating"
        rating={data.rating}
        starRatedColor="orange"
        starDimension="20px"
        starSpacing="2.5px"
        numberOfStars={5}
      />
    </div>
  );
};

export default Book;
