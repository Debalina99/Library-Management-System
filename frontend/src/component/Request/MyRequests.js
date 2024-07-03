import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myRequests.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myRequests } from "../../actions/requestAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";

const MyRequests = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, requests } = useSelector((state) => state.myRequests);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Request ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.6,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Returned"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Quantity",
      type: "number",
      minWidth: 150,
      flex: 0.6,
    },

    {
      field: "return_date",
      headerName: "Return date",
      type: "date",
      // minWidth: 270,
      flex: 0.6,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Returned"
          ? "greenColor"
          : "redColor";
      },
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
      flex: 0.6,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/request/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  requests &&
    requests.forEach((item, index) => {
      rows.push({
        itemsQty: item.requestItems.length,
        id: item._id,
        status: item.requestStatus,
        amount: item.amount,
        return_date: item.return_date,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myRequests());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Requests`} />

      {loading ? (
        <Loader />
      ) : (
        
        <div className="myRequestsPage">
          <div id="scroll-text"
          
          >
          Late fee of Rs. 2/- per day per book
          would be charged from all the borrowers who retain book(s) beyond the
          due date. Director General/ Librarian may exempt the late fee
          depending upon the circumstances of delay.
          </div>
          
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myRequestsTable"
            autoHeight
          />

          <Typography id="myRequestsHeading">{user.name}'s Requests</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyRequests;
