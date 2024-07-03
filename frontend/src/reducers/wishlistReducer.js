import {
  ADD_TO_WISHLIST,
  REMOVE_WISHLIST_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/wishlistConstants";

export const wishlistReducer = (
  state = { wishlistItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      const item = action.payload;

      const isItemExist = state.wishlistItems.find(
        (i) => i.book === item.book
      );

      if (isItemExist) {
        return {
          ...state,
          wishlistItems: state.wishlistItems.map((i) =>
            i.book === isItemExist.book ? item : i
          ),
        };
      } else {
        return {
          ...state,
          wishlistItems: [...state.wishlistItems, item],
        };
      }

    case REMOVE_WISHLIST_ITEM:
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter((i) => i.book !== action.payload),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};
