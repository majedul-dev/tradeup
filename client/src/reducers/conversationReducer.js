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

export const createConversationReducer = (
  state = { conversation: {} },
  action
) => {
  switch (action.type) {
    case CREATE_CONVERSATION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_CONVERSATION_SUCCESS:
      return {
        loading: false,
        conversation: action.payload,
        success: true,
      };

    case CREATE_CONVERSATION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getConversations = (state = { conversations: [] }, action) => {
  switch (action.type) {
    case GET_CONVERSATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_CONVERSATIONS_SUCCESS:
      return {
        loading: false,
        conversations: action.payload,
      };

    case GET_CONVERSATIONS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getUsersConversations = (state = { user: {} }, action) => {
  switch (action.type) {
    case GET_USERS_CONVERSATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_USERS_CONVERSATIONS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };

    case GET_USERS_CONVERSATIONS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
