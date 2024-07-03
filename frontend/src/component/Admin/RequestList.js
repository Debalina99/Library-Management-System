import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./bookList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import {
  deleteRequest,
  getAllRequests,
  clearErrors,
} from "../../actions/requestAction";
import { DELETE_REQUEST_RESET } from "../../constants/requestConstants";

const RequestList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, requests } = useSelector((state) => state.allRequests);

  const { error: deleteError, isDeleted } = useSelector((state) => state.request);

  const deleteRequestHandler = (id) => {
    dispatch(deleteRequest(id));
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
      alert.success("Request Deleted Successfully");
      history.push("/admin/requests");
      dispatch({ type: DELETE_REQUEST_RESET });
    }

    dispatch(getAllRequests());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Request ID", minWidth: 300, flex: 1 },
    

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Returned"
          ? "greenColor"
          : "redColor";
      },
     
    },
    
    {
      field: "return_date",
      headerName: "Return date",
      type: "date",
      // minWidth: 270,
      flex: 0.6,
    },
    {
      field: "issued_date",
      headerName: "Issue date",
      type: "date",
      // minWidth: 270,
      flex: 0.6,
    },
   

    {
      field: "amount",
      headerName: "Fine",
      type: "number",

      // minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Returned"
          ? "greenColor"
          : "redColor";
      },
      
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
            <Link to={`/admin/request/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteRequestHandler(params.getValue(params.id, "id"))
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

  requests &&
    requests.forEach((item) => {
      rows.push({
        id: item._id,
        
        itemsQty: item.requestItems.length,
        amount: item.amount,
        status: item.requestStatus,
        return_date: item.return_date,
        issued_date: item.issued_date,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL REQUESTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="bookListContainer">
          <h1 id="bookListHeading">ALL Requests</h1>

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

export default RequestList;
