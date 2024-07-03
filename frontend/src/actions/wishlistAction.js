import {
  ADD_TO_WISHLIST,
  REMOVE_WISHLIST_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/wishlistConstants";
import axios from "axios";

// Add to Wishlist
export const addItemsToWishlist = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/book/${id}`);

  dispatch({
    type: ADD_TO_WISHLIST,
    payload: {
      book: data.book._id,
      name: data.book.name,
      price: data.book.price,
      image: data.book.images[0].url,
      stock: data.book.Stock,
      quantity,
    },
  });

  localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlistItems));
};

// REMOVE FROM WISHLIST
export const removeItemsFromWishlist = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_WISHLIST_ITEM,
    payload: id,
  });

  localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlistItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
