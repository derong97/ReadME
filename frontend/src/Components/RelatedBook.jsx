import React from "react";
import StarRatings from "react-star-ratings";

const RelatedBook = ({ event, book }) => {
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
  //       const bookData = res.data;
  //       if (res.status === 200) {
  //         event.props.history.push({
  //           pathname: "/book",
  //           state: { detail: { bookData } },
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
      className="row"
      // onClick={() => bookDeets(book.booktitle)}
      onClick={() => event.props.history.push("/main")}
    >
      <img
        className="relatedbooks-img"
        alt="Related Books"
        src={book.bookImg}
      ></img>
      <div className="relatedbooks-info">
        <text>{book.booktitle}</text>
        <StarRatings
          name="rating"
          rating={book.rating}
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
