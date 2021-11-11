import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_RESET,
  CREATE_PRODUCT_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  MY_PRODUCTS_REQUEST,
  MY_PRODUCTS_SUCCESS,
  MY_PRODUCTS_FAIL,
  USERS_PRODUCTS_REQUEST,
  USERS_PRODUCTS_SUCCESS,
  USERS_PRODUCTS_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const createProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        loading: true,
      };

    case CREATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        success: true,
      };

    case CREATE_PRODUCT_RESET:
      return {
        loading: false,
        success: false,
      };

    case CREATE_PRODUCT_FAIL:
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

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        products: [],
      };

    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productCount,
        resPerPage: action.payload.resPerPage,
      };

    case ALL_PRODUCTS_FAIL:
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

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: null,
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

export const myProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case MY_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        products: [],
      };

    case MY_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };

    case MY_PRODUCTS_FAIL:
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

export const usersProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case USERS_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        products: [],
      };

    case USERS_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };

    case USERS_PRODUCTS_FAIL:
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

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return {
        loading: true,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case DELETE_PRODUCT_RESET:
      return {
        loading: false,
        success: false,
      };

    case DELETE_PRODUCT_FAIL:
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

export const updateProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        success: true,
      };

    case UPDATE_PRODUCT_RESET:
      return {
        loading: false,
        success: false,
      };

    case UPDATE_PRODUCT_FAIL:
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
