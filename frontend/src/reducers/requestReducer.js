import {
  CREATE_REQUEST_REQUEST,
  CREATE_REQUEST_SUCCESS,
  CREATE_REQUEST_FAIL,
  MY_REQUESTS_REQUEST,
  MY_REQUESTS_SUCCESS,
  MY_REQUESTS_FAIL,
  ALL_REQUESTS_REQUEST,
  ALL_REQUESTS_SUCCESS,
  ALL_REQUESTS_FAIL,
  UPDATE_REQUEST_REQUEST,
  UPDATE_REQUEST_SUCCESS,
  UPDATE_REQUEST_FAIL,
  UPDATE_REQUEST_RESET,
  DELETE_REQUEST_REQUEST,
  DELETE_REQUEST_SUCCESS,
  DELETE_REQUEST_FAIL,
  DELETE_REQUEST_RESET,
  REQUEST_DETAILS_REQUEST,
  REQUEST_DETAILS_SUCCESS,
  REQUEST_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/requestConstants";

export const newRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REQUEST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_REQUEST_SUCCESS:
      return {
        loading: false,
        request: action.payload,
      };

    case CREATE_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const myRequestsReducer = (state = { requests: [] }, action) => {
  switch (action.type) {
    case MY_REQUESTS_REQUEST:
      return {
        loading: true,
      };

    case MY_REQUESTS_SUCCESS:
      return {
        loading: false,
        requests: action.payload,
      };

    case MY_REQUESTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allRequestsReducer = (state = { requests: [] }, action) => {
  switch (action.type) {
    case ALL_REQUESTS_REQUEST:
      return {
        loading: true,
      };

    case ALL_REQUESTS_SUCCESS:
      return {
        loading: false,
        requests: action.payload,
      };

    case ALL_REQUESTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const requestReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_REQUEST_REQUEST:
    case DELETE_REQUEST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_REQUEST_FAIL:
    case DELETE_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_REQUEST_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_REQUEST_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const requestDetailsReducer = (state = { request: {} }, action) => {
  switch (action.type) {
    case REQUEST_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case REQUEST_DETAILS_SUCCESS:
      return {
        loading: false,
        request: action.payload,
      };

    case REQUEST_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
