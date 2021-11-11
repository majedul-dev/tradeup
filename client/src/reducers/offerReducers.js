import {
  MY_PRODUCT_OFFERS_REQUEST,
  MY_PRODUCT_OFFERS_SUCCESS,
  MY_PRODUCT_OFFERS_FAIL,
  OFFER_DETAILS_REQUEST,
  OFFER_DETAILS_SUCCESS,
  OFFER_DETAILS_FAIL,
  MY_OFFERS_REQUEST,
  MY_OFFERS_SUCCESS,
  MY_OFFERS_FAIL,
  CREATE_OFFER_REQUEST,
  CREATE_OFFER_SUCCESS,
  CREATE_OFFER_FAIL,
  DELETE_OFFER_REQUEST,
  DELETE_OFFER_SUCCESS,
  DELETE_OFFER_FAIL,
  TRACK_OFFER_REQUEST,
  TRACK_OFFER_SUCCESS,
  TRACK_OFFER_FAIL,
  CLEAR_ERRORS,
} from "../constants/offerConstants";

export const createOfferReducers = (state = { offer: {} }, action) => {
  switch (action.type) {
    case CREATE_OFFER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_OFFER_SUCCESS:
      return {
        loading: false,
        offer: action.payload,
        success: true,
      };
    case CREATE_OFFER_FAIL:
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

export const myProductOffersReducers = (state = { offers: {} }, action) => {
  switch (action.type) {
    case MY_PRODUCT_OFFERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MY_PRODUCT_OFFERS_SUCCESS:
      return {
        loading: false,
        offers: action.payload,
      };
    case MY_PRODUCT_OFFERS_FAIL:
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

export const offerDetailsReducers = (state = { offer: {} }, action) => {
  switch (action.type) {
    case OFFER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OFFER_DETAILS_SUCCESS:
      return {
        loading: false,
        offer: action.payload,
      };
    case OFFER_DETAILS_FAIL:
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

export const myOffersReducers = (state = { offers: {} }, action) => {
  switch (action.type) {
    case MY_OFFERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MY_OFFERS_SUCCESS:
      return {
        loading: false,
        offers: action.payload,
      };
    case MY_OFFERS_FAIL:
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

export const deleteOfferReducers = (state = { offer: {} }, action) => {
  switch (action.type) {
    case DELETE_OFFER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_OFFER_SUCCESS:
      return {
        loading: false,
        offers: action.payload,
        success: true,
      };
    case DELETE_OFFER_FAIL:
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

export const trackOfferReducers = (state = {}, action) => {
  switch (action.type) {
    case TRACK_OFFER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TRACK_OFFER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case TRACK_OFFER_FAIL:
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
