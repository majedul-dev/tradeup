import axios from "axios";
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

export const createOfferAction = (formData, productId) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_OFFER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/offers/${productId}`,
      formData,
      config
    );

    dispatch({ type: CREATE_OFFER_SUCCESS, payload: data });
    // localStorage.setItem("productOffers", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CREATE_OFFER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const myProductOffersAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: MY_PRODUCT_OFFERS_REQUEST });

    const { data } = await axios.get(`/api/offers/my/${id}`);

    dispatch({ type: MY_PRODUCT_OFFERS_SUCCESS, payload: data });
    localStorage.setItem("productOffers", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: MY_PRODUCT_OFFERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const offerDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: OFFER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/offers/${id}`);

    dispatch({ type: OFFER_DETAILS_SUCCESS, payload: data.offer });
    localStorage.setItem("offerDetails", JSON.stringify(data.offer));
  } catch (error) {
    dispatch({
      type: OFFER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const myOffers = () => async (dispatch) => {
  try {
    dispatch({ type: MY_OFFERS_REQUEST });

    const { data } = await axios.get(`/api/offers/myoffers`);

    dispatch({ type: MY_OFFERS_SUCCESS, payload: data.offers });
    localStorage.setItem("myoffers", JSON.stringify(data.offers));
  } catch (error) {
    dispatch({
      type: MY_OFFERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteOffer = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_OFFER_REQUEST });

    await axios.delete(`/api/offers/${id}`);

    dispatch({ type: DELETE_OFFER_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_OFFER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const trackOffer = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: TRACK_OFFER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.put(`/api/offers/${id}`, data, config);

    dispatch({ type: TRACK_OFFER_SUCCESS });
  } catch (error) {
    dispatch({
      type: TRACK_OFFER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
