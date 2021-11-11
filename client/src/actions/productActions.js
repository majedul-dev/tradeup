import axios from "axios";

import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  MY_PRODUCTS_REQUEST,
  MY_PRODUCTS_SUCCESS,
  MY_PRODUCTS_FAIL,
  USERS_PRODUCTS_REQUEST,
  USERS_PRODUCTS_SUCCESS,
  USERS_PRODUCTS_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/products/create`, formData, config);

    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllProducts =
  (keyword = "", currentPage = 1, category) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });

      let link = `/api/products/getall?keyword=${keyword}&page=${currentPage}`;

      if (category) {
        link = `/api/products/getall?keyword=${keyword}&page=${currentPage}&category=${category}`;
      }

      const { data } = await axios.get(link);

      dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data });

      localStorage.setItem("products", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const productDetailsAction = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/getsingle/${productId}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });

    localStorage.setItem("productDetail", JSON.stringify(data.product));
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const myProducts = () => async (dispatch) => {
  try {
    dispatch({ type: MY_PRODUCTS_REQUEST });

    const { data } = await axios.get("/api/products/my");

    dispatch({ type: MY_PRODUCTS_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({
      type: MY_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const usersProducts = (userId) => async (dispatch) => {
  try {
    dispatch({ type: USERS_PRODUCTS_REQUEST });

    const { data } = await axios.get(`/api/products/${userId}`);

    dispatch({ type: USERS_PRODUCTS_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({
      type: USERS_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    await axios.delete(`/api/products/delete/${productId}`);

    dispatch({ type: DELETE_PRODUCT_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateProduct = (formData, productId) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/products/edit/${productId}`,
      formData,
      config
    );

    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
