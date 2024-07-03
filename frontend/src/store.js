import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newBookReducer,
  newReviewReducer,
  bookDetailsReducer,
  bookReducer,
  bookReviewsReducer,
  booksReducer,
  reviewReducer,
} from "./reducers/bookReducer";

import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";

import { wishlistReducer } from "./reducers/wishlistReducer";
import {
  allRequestsReducer,
  myRequestsReducer,
  newRequestReducer,
  requestDetailsReducer,
  requestReducer,
} from "./reducers/requestReducer";

const reducer = combineReducers({
  books: booksReducer,
  bookDetails: bookDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  wishlist: wishlistReducer,
  newRequest: newRequestReducer,
  myRequests: myRequestsReducer,
  requestDetails: requestDetailsReducer,
  newReview: newReviewReducer,
  newBook: newBookReducer,
  book: bookReducer,
  allRequests: allRequestsReducer,
  request: requestReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  bookReviews: bookReviewsReducer,
  review: reviewReducer,
});

let initialState = {
  wishlist: {
    wishlistItems: localStorage.getItem("wishlistItems")
      ? JSON.parse(localStorage.getItem("wishlistItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
