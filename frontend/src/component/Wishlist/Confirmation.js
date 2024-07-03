import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Wishlist/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import {
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import "./confirmation.css";

import { createRequest, clearErrors } from "../../actions/requestAction";

const Confirmation = ({ history }) => {
  const requestInfo = JSON.parse(sessionStorage.getItem("requestInfo"));

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, wishlistItems } = useSelector(
    (state) => state.wishlist
  );
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newRequest);

  const confirmationData = {
    amount: Math.round(requestInfo.totalPrice * 50),
  };

  const request = {
    shippingInfo,
    requestItems: wishlistItems,
    itemsPrice: requestInfo.subtotal,
    taxPrice: requestInfo.tax,
    shippingPrice: requestInfo.shippingCharges,
    totalPrice: requestInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      dispatch(createRequest(request));

      history.push("/success");
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title="Confirmation" />
      <CheckoutSteps activeStep={2} />
      <div id="scroll-container">
        <p id="scroll-text">
          <strong id="note">Note: </strong>Late fee of Rs. 2/- per day per book
          would be charged from all the borrowers who retain book(s) beyond the
          due date. Director General/ Librarian may exempt the late fee
          depending upon the circumstances of delay.
        </p>
      </div>
      <div className="confirmationContainer">
        <form className="confirmationForm" onSubmit={(e) => submitHandler(e)}>
          <h1>Are you sure?</h1>
          <br></br>

          <input
            type="submit"
            value={"Issue"}
            ref={payBtn}
            className="confirmationFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Confirmation;
