import React, { Fragment, useEffect, useState } from "react";
import "./newBook.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createBook } from "../../actions/bookAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_BOOK_RESET } from "../../constants/bookConstants";

const NewBook = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newBook);

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [edition, setEdition] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Science",
    "Fiction",
    "Horror",
    "Biography",
    "History",
    "English",
    "Economics",
    "Competitive Exams",
  ];
  

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Book Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_BOOK_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createBookSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("author", author);
    myForm.set("edition", edition);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createBook(myForm));
  };

  const createBookImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Book" />
      <div className="dashboard">
        <SideBar />
        <div className="newBookContainer">
          <form
            className="createBookForm"
            encType="multipart/form-data"
            onSubmit={createBookSubmitHandler}
          >
            <h1>Create Book</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Book Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Author Name"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div>
              <SpellcheckIcon />
              <input
                type="number"
                placeholder="Edition"
                required
                value={edition}
                onChange={(e) => setEdition(e.target.value)}
              />
            </div>
            

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Book Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createBookFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createBookImagesChange}
                multiple
              />
            </div>

            <div id="createBookFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Book Preview" />
              ))}
            </div>

            <Button
              id="createBookBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewBook;
