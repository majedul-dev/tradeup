import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  createProductReducer,
  productsReducer,
  productDetailsReducer,
  myProductsReducer,
  usersProductsReducer,
  deleteProductReducer,
  updateProductReducer,
} from "./reducers/productReducer";
import { authReducer } from "./reducers/authReducer";
import { getUserByIdReducer } from "./reducers/userReducer";
import {
  createOfferReducers,
  deleteOfferReducers,
  myOffersReducers,
  myProductOffersReducers,
  offerDetailsReducers,
  trackOfferReducers,
} from "./reducers/offerReducers";
import {
  createConversationReducer,
  getConversations,
  getUsersConversations,
} from "./reducers/conversationReducer";
import { createMessageReducer } from "./reducers/messageReducer";

const reducer = combineReducers({
  createProduct: createProductReducer,
  products: productsReducer,
  productDetails: productDetailsReducer,
  myProducts: myProductsReducer,
  usersProducts: usersProductsReducer,
  deleteProduct: deleteProductReducer,
  updateProduct: updateProductReducer,

  auth: authReducer,

  getUserById: getUserByIdReducer,

  createConversation: createConversationReducer,
  getConversations: getConversations,
  getUsersConversations: getUsersConversations,

  createMessage: createMessageReducer,

  myProductOffers: myProductOffersReducers,
  offerDetails: offerDetailsReducers,
  myOffers: myOffersReducers,
  createOffer: createOfferReducers,
  deleteOffer: deleteOfferReducers,
  trackOffer: trackOfferReducers,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const userByIdFromStorage = localStorage.getItem("userById")
  ? JSON.parse(localStorage.getItem("userById"))
  : null;

const productsFromStorage = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : null;

const productDetailFromStorage = localStorage.getItem("productDetail")
  ? JSON.parse(localStorage.getItem("productDetail"))
  : null;

const productOffersFromStorage = localStorage.getItem("productOffers")
  ? JSON.parse(localStorage.getItem("productOffers"))
  : null;

const offerDetailsFromStorage = localStorage.getItem("offerDetails")
  ? JSON.parse(localStorage.getItem("offerDetails"))
  : null;

const myOffersFromStorage = localStorage.getItem("myoffers")
  ? JSON.parse(localStorage.getItem("myoffers"))
  : null;

const initialState = {
  auth: { user: userInfoFromStorage },
  getUserById: userByIdFromStorage,
  products: productsFromStorage,
  productDetails: { product: productDetailFromStorage },
  myProductOffers: { offers: productOffersFromStorage },
  offerDetails: { offer: offerDetailsFromStorage },
  myOffers: { offers: myOffersFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
