import React, { Fragment } from "react";
import "./Wishlist.css";
import WishlistItemCard from "./WishlistItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToWishlist, removeItemsFromWishlist } from "../../actions/wishlistAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";

const Wishlist = ({ history }) => {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToWishlist(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToWishlist(id, newQty));
  };

  const deleteWishlistItems = (id) => {
    dispatch(removeItemsFromWishlist(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=request/confirm");
  };

  return (
    <Fragment>
      {wishlistItems.length === 0 ? (
        <div className="emptyWishlist">
          <RemoveShoppingCartIcon />

          <Typography>No Books in Your Wishlist</Typography>
          <Link to="/books">View Books</Link>
        </div>
      ) : (
        <Fragment>
          <div className="wishlistPage">
            <div className="wishlistHeader">
              <p>Book</p>
              {/* <p>Quantity</p>
              <p>Subtotal</p> */}
            </div>

            {wishlistItems &&
              wishlistItems.map((item) => (
                <div className="wishlistContainer" key={item.book}>
                  <WishlistItemCard item={item} deleteWishlistItems={deleteWishlistItems} />
                  <div className="wishlistInput">
                    
                  </div>
                 
                </div>
              ))}

            <div className="wishlistGrossProfit">
              <div></div>
              
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Wishlist</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Wishlist;
