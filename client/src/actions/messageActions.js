import axios from "axios";
import {
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAIL,
} from "../constants/messageConstants";

export const createMessage = (message) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_MESSAGE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/message`, message, config);

    dispatch({ type: CREATE_MESSAGE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: CREATE_MESSAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};
