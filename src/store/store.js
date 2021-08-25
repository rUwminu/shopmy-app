import { applyMiddleware, createStore, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import {
  productDetailsReducer,
  productListReducer,
  productReviewsReducer,
} from '../reducers/productReducer'
import { cartReducer } from '../reducers/cartReducer'
import {
  userSingInReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from '../reducers/userReducer'
import {
  orderAllListReducer,
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderMineListReducer,
  orderPayReducer,
} from '../reducers/orderReducer'
import {
  checkCommentedReducer,
  checkPurchasedReducer,
  productCommentReducer,
} from '../reducers/commentReducer'

const initialState = {
  userSignIn: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
  },
  paymentMethod: 'Paypal',
}

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productReviews: productReviewsReducer,
  cart: cartReducer,
  userSignIn: userSingInReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderMineList: orderMineListReducer,
  orderAllList: orderAllListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  productComment: productCommentReducer,
  checkCommented: checkCommentedReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
)

export default store
