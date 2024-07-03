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
  DELETE_REQUEST_REQUEST,
  DELETE_REQUEST_SUCCESS,
  DELETE_REQUEST_FAIL,
  REQUEST_DETAILS_REQUEST,
  REQUEST_DETAILS_SUCCESS,
  REQUEST_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/requestConstants";

import axios from "axios";

// Create Request
export const createRequest = (request) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_REQUEST_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/request/new", request, config);

    dispatch({ type: CREATE_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// My Requests
export const myRequests = () => async (dispatch) => {
  try {
    dispatch({ type: MY_REQUESTS_REQUEST });

    const { data } = await axios.get("/api/v1/requests/me");

    dispatch({ type: MY_REQUESTS_SUCCESS, payload: data.requests });
  } catch (error) {
    dispatch({
      type: MY_REQUESTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Requests (admin)
export const getAllRequests = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_REQUESTS_REQUEST });

    const { data } = await axios.get("/api/v1/admin/requests");

    dispatch({ type: ALL_REQUESTS_SUCCESS, payload: data.requests });
  } catch (error) {
    dispatch({
      type: ALL_REQUESTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Request
export const updateRequest = (id, request) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_REQUEST_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/request/${id}`,
      request,
      config
    );

    dispatch({ type: UPDATE_REQUEST_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Request
export const deleteRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REQUEST_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/request/${id}`);

    dispatch({ type: DELETE_REQUEST_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Request Details
export const getRequestDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/request/${id}`);

    dispatch({ type: REQUEST_DETAILS_SUCCESS, payload: data.request });
  } catch (error) {
    dispatch({
      type: REQUEST_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
