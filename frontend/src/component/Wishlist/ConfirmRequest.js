import React, { Fragment,useState, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmRequest.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmRequest = ({ history }) => {
  const { shippingInfo, wishlistItems } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.user);
  const subtotal = wishlistItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  
  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToConfirmation = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("requestInfo", JSON.stringify(data));

    history.push("/process/confirmation");
    // history.push("/success");
  };




  
  


  return (
    <Fragment>
      <MetaData title="Confirm Request" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmRequestPage">
        <div>
          <div className="confirmUserDetails">
            <Typography>User Info</Typography>
            <div className="confirmUserDetailsBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              {/* {/* <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div> */}
              <div>
                <p>Email:</p>
                <span>{user.email}</span>
              </div> 
            </div>
          </div>
          <div className="confirmWishlistItems">
            <Typography>Your Wishlisted Items:</Typography>
            <div className="confirmWishlistItemsContainer">
              {wishlistItems &&
                wishlistItems.map((item) => (
                  <div key={item.book}>
                    <img src={item.image} alt="Book" />
                    <Link to={`/book/${item.book}`}>
                      {item.name}
                    </Link>{" "}
                    {/* <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span> */}
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="requestSummary">
            {/* <Typography>Request Summery</Typography> */}
            {/* <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div> */}

            {/* <div className="requestSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div> */}

            <button onClick={proceedToConfirmation}>Issue Request</button>

            
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmRequest;
