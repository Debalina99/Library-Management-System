import React, { Fragment, useEffect } from "react";
import "./requestDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getRequestDetails, clearErrors } from "../../actions/requestAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const RequestDetails = ({ match }) => {
  const { request, error, loading } = useSelector((state) => state.requestDetails);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getRequestDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Request Details" />
          <div className="requestDetailsPage">
            <div className="requestDetailsContainer">
              <Typography component="h1">
                Request #{request && request._id}
              </Typography>
              <Typography>Requested By:</Typography>
              <div className="requestDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{request.user && request.user.name}</span>
                </div>
                {/* <div>
                  <p>Phone:</p>
                  <span>
                    {request.shippingInfo && request.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {request.shippingInfo &&
                      `${request.shippingInfo.address}, ${request.shippingInfo.city}, ${request.shippingInfo.state}, ${request.shippingInfo.pinCode}, ${request.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Confirmation</Typography>
              <div className="requestDetailsContainerBox">
                <div>
                  <p
                    className={
                      request.confirmationInfo &&
                      request.confirmationInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {request.confirmationInfo &&
                    request.confirmationInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{request.totalPrice && request.totalPrice}</span>
                </div>
              </div> */}
              </div>
              <Typography>Request Status</Typography>
              <div className="requestDetailsContainerBox">
                <div>
                  <p
                    className={
                      request.requestStatus && request.requestStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {request.requestStatus && request.requestStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="requestDetailsWishlistItems">
              <Typography>Request Items:</Typography>
              <div className="requestDetailsWishlistItemsContainer">
                {request.requestItems &&
                  request.requestItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                     
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default RequestDetails;
