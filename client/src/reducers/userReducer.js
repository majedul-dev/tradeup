import {
  USER_BYID_REQUEST,
  USER_BYID_SUCCESS,
  USER_BYID_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from "../constants/userConstants";

export const getUserByIdReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_BYID_REQUEST:
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_BYID_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };

    case USER_BYID_FAIL:
    case UPDATE_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// export const updateUserReducer = (state = { user: {} }, action) => {
//   switch (action.type) {
//     case UPDATE_USER_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };

//     case UPDATE_USER_SUCCESS:
//       return {
//         loading: false,
//         user: action.payload,
//       };

//     case UPDATE_USER_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };

//     default:
//       return state;
//   }
// };
