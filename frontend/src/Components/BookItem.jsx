import React from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";

const Book = ({ event, data }) => {
  // const bookDeets = (evt, title) => {
  //   const url = "";
  //   const body = {
  //     params: { title: title },
  //   };
  //   console.log(body);
  //   evt.preventDefault();
  //   axios
  //     .get(url, body)
  //     .then((res) => {
  //       console.log(res);
  //       // retrieve top 30 books
  //       const bookData = JSON.stringify(res.data);
  //       if (res.status === 200) {
  //         event.props.history.push({
  //           pathname: "/book",
  //           state: { bookDeets: { bookData } },
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //       console.log(err.request);
  //     });
  // };

  return (
    <div
      className="book-content"
      // onClick={() => bookDeets(data.book)}
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
