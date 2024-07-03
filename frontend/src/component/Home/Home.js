import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import BookCard from "./BookCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getBook } from "../../actions/bookAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, books } = useSelector((state) => state.books);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getBook());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="LIBRARY" />

          <div className="banner">
            <p>Welcome to Library</p>
            <h1>FIND AMAZING BOOKS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Books</h2>

          <div className="container" id="container">
            {books &&
              books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
