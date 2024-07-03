import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import {
  getRequestDetails,
  clearErrors,
  updateRequest,
} from "../../actions/requestAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_REQUEST_RESET } from "../../constants/requestConstants";
import "./processRequest.css";

const ProcessRequest = ({ history, match }) => {
  const { request, error, loading } = useSelector((state) => state.requestDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.request);

  const updateRequestSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateRequest(match.params.id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Request Updated Successfully");
      dispatch({ type: UPDATE_REQUEST_RESET });
    }

    dispatch(getRequestDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Process Request" />
      <div className="dashboard">
        <SideBar />
        <div className="newBookContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmRequestPage"
              style={{
                display: request.requestStatus === "Returned" ? "block" : "grid",
               
              }}
            >
              <div>
                <div className="confirmshippingArea">
                

                  <Typography>Issue Status</Typography>
                  <div className="requestDetailsContainerBox">
                    <div>
                      <p
                        className={
                          request.requestStatus && request.requestStatus === "Returned"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {request.requestStatus && request.requestStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmWishlistItems">
                  <Typography>Your Request Items:</Typography>
                  <div className="confirmWishlistItemsContainer">
                    {request.requestItems &&
                      request.requestItems.map((item) => (
                        <div key={item.book}>
                          <img src={item.image} alt="Book" />
                          <Link to={`/book/${item.book}`}>
                            {item.name}
                          </Link>{" "}
                         
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: request.requestStatus === "Returned" ? "none" : "block",
                  // display: request.requestStatus === "Paid(Late Fine)" ? "none" : "block",
                 
                }}
              >
                <form
                  className="updateRequestForm"
                  onSubmit={updateRequestSubmitHandler}
                >
                  <h1>Process Request</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {request.requestStatus === "Processing" && (
                        <option value="Issued">Issued</option>
                      )}

                      {request.requestStatus === "Issued" && (
                        <option value="Returned">Returned</option>
                      )}
                      {request.requestStatus === "Issued" && (
                        <option value="Not Returned">Not Returned</option>
                      )}
                      
                       {request.requestStatus === "Not Returned" && (
                        <option value="Returned(late fine)">Returned(Late fine)</option>
                      )}
                      {request.requestStatus === "Returned(late fine)" && (
                        <option value="Paid(Late Fine)">Paid(Late Fine)</option>
                      )}
                       {request.requestStatus === "Returned(late fine)" && (
                        <option value="Not Paid(Late Fine)">Not Paid(Late Fine)</option>
                      )}
                       {/* {request.requestStatus === "Returned" && (
                        <option value="Paid">Paid</option>
                      )}
                      
                      {request.requestStatus === "Returned" && (
                        <option value="Not Paid">Not Paid</option>
                      )} */}
                       {request.requestStatus === "Not Paid" && (
                        <option value="Paid">Paid</option>
                      )}
                       {request.requestStatus === "Not Paid(Late Fine)" && (
                        <option value="Paid(Late Fine)">Paid(Late Fine)</option>
                      )}
                    </select>
                  </div>
                  
                 
                  <Button
                    id="createBookBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessRequest;
