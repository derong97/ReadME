import React from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";
import { TextareaAutosize } from "@material-ui/core";

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

  const checkNull = () => {
    if (data.avg_rating === null) return true;
    return false;
  };

  return (
    <div
      className="book-content"
      // onClick={() => bookDeets(data.book)}
      onClick={() => event.props.history.push("/book")}
    >
      <img className="book" alt="book" src={data.imUrl}></img>
      <text className="book-title">{data.title}</text>
      <StarRatings
        name="rating"
        rating={checkNull ? 0 : data.avg_rating}
        starRatedColor="orange"
        starDimension="20px"
        starSpacing="2.5px"
        numberOfStars={5}
      />
    </div>
  );
};

export default Book;
