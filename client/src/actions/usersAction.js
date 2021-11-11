import axios from "axios";
import {
  USER_BYID_REQUEST,
  USER_BYID_SUCCESS,
  USER_BYID_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from "../constants/userConstants";

export const getUserById = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_BYID_REQUEST });

    const { data } = await axios.get(`/api/users/user/${id}`);

    dispatch({
      type: USER_BYID_SUCCESS,
      payload: data.user,
    });

    localStorage.setItem("userById", JSON.stringify(data.user));
  } catch (error) {
    dispatch({
      type: USER_BYID_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateUser = (formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/users/me/profile/update`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.user,
    });

    localStorage.setItem("userById", JSON.stringify(data.user));
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
