import React from "react";
import "./WishlistItemCard.css";
import { Link } from "react-router-dom";

const WishlistItemCard = ({ item, deleteWishlistItems }) => {
  return (
    <div className="WishlistItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/book/${item.book}`}>{item.name}</Link>
        {/* <span>{`Price: ₹${item.price}`}</span> */}
        <p onClick={() => deleteWishlistItems(item.book)}>Remove</p>
      </div>
    </div>
  );
};

export default WishlistItemCard;
