import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./bookList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminBook,
  deleteBook,
} from "../../actions/bookAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_BOOK_RESET } from "../../constants/bookConstants";

const BookList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, books } = useSelector((state) => state.books);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.book
  );

  const deleteBookHandler = (id) => {
    dispatch(deleteBook(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Book Deleted Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: DELETE_BOOK_RESET });
    }

    dispatch(getAdminBook());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Book ID", minWidth: 230, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 270,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },


    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/book/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteBookHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  books &&
    books.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL BOOKS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="bookListContainer">
          <h1 id="bookListHeading">ALL Books</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="bookListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default BookList;
