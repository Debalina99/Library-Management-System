import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./requestSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const RequestSuccess = () => {
  return (
    <div className="requestSuccess">
      <CheckCircleIcon />

      <Typography>Your Request has been Placed successfully </Typography>
      <Link to="/requests">View Requests</Link>
    </div>
  );
};

export default RequestSuccess;
