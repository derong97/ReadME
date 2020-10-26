import React from "react";
import StarRatings from "react-star-ratings";

const RelatedBook = ({ event, link, book, rating }) => {
  return (
    <div class="row" onClick={() => event.props.history.push("/main")}>
      <img className="relatedbooks-img" alt="Related Books" src={link}></img>
      <div className="relatedbooks-info">
        <text>{book}</text>
        <StarRatings
          name="rating"
          rating={rating}
          starRatedColor="orange"
          starDimension="20px"
          starSpacing="2.5px"
          numberOfStars={5}
        />
      </div>
    </div>
  );
};

export default RelatedBook;
