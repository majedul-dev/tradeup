import axios from "axios";
import {
  CREATE_CONVERSATION_REQUEST,
  CREATE_CONVERSATION_SUCCESS,
  CREATE_CONVERSATION_FAIL,
  GET_CONVERSATIONS_REQUEST,
  GET_CONVERSATIONS_SUCCESS,
  GET_CONVERSATIONS_FAIL,
  GET_USERS_CONVERSATIONS_REQUEST,
  GET_USERS_CONVERSATIONS_SUCCESS,
  GET_USERS_CONVERSATIONS_FAIL,
} from "../constants/conversationConstants";

export const createConversation = (members) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CONVERSATION_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/conversation`, members, config);

    dispatch({ type: CREATE_CONVERSATION_SUCCESS, payload: data.conversation });
  } catch (error) {
    dispatch({
      type: CREATE_CONVERSATION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allConversations = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_CONVERSATIONS_REQUEST });

    const { data } = await axios.get(`/api/conversation/${userId}`);

    dispatch({ type: GET_CONVERSATIONS_SUCCESS, payload: data.conversation });
  } catch (error) {
    dispatch({
      type: GET_CONVERSATIONS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getUsersCoversations = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_USERS_CONVERSATIONS_REQUEST });

    const { data } = await axios.get(`/api/users/user/${userId}`);

    dispatch({ type: GET_USERS_CONVERSATIONS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: GET_USERS_CONVERSATIONS_FAIL,
      payload: error.response.data.message,
    });
  }
};
