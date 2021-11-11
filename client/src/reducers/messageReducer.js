import {
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAIL,
} from "../constants/messageConstants";

export const createMessageReducer = (state = { message: {} }, action) => {
  switch (action.type) {
    case CREATE_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_MESSAGE_SUCCESS:
      return {
        loading: false,
        message: action.payload,
        success: true,
      };

    case CREATE_MESSAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
