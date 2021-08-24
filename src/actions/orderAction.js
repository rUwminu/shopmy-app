import Axios from 'axios'
import { CART_REMOVE_ALL_ITEM } from '../constant/cartContant'
import {
  ORDER_ALL_LIST_FAIL,
  ORDER_ALL_LIST_REQUEST,
  ORDER_ALL_LIST_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from '../constant/orderContant'

const baseUrl = 'https://full-stack-api-shopmy.herokuapp.com/'

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order })

  try {
    const {
      userSignIn: { userInfo },
    } = getState()

    const { data } = await Axios.post(`${baseUrl}api/orders`, order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    })

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order })
    dispatch({ type: CART_REMOVE_ALL_ITEM })
    localStorage.removeItem('cartItems')
  } catch (err) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId })

  const {
    userSignIn: { userInfo },
  } = getState()

  try {
    const { data } = await Axios.get(`${baseUrl}api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message })
  }
}

export const payOrder =
  (order, paymentResult) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } })

    const {
      userSignIn: { userInfo },
    } = getState()

    try {
      const { data } = await Axios.put(
        `${baseUrl}api/orders/pay/${order._id}`,
        paymentResult,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      )

      dispatch({ type: ORDER_PAY_SUCCESS, payload: data })

      // Line for order detail reasign to redux, wait for data done asign and show data
      dispatch({ type: ORDER_DETAILS_REQUEST })
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      dispatch({ type: ORDER_PAY_FAIL, payload: `${message}` })
    }
  }

export const deliverOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELIVER_REQUEST, payload: { order } })

  const {
    userSignIn: { userInfo },
  } = getState()

  try {
    const { data } = await Axios.put(
      `${baseUrl}api/orders/deliver/${order._id}`,
      null,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    )

    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data })

    // Line for order detail reasign to redux, wait for data done asign and show data
    dispatch({ type: ORDER_DETAILS_REQUEST })
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    dispatch({ type: ORDER_DELIVER_FAIL, payload: `${message}` })
  }
}

export const listOrderMine = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_MINE_LIST_REQUEST })

  const {
    userSignIn: { userInfo },
  } = getState()

  try {
    const { data } = await Axios.get(`${baseUrl}api/orders/mine`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    })

    dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data })
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message })
  }
}

export const listOrderAll = (status) => async (dispatch, getState) => {
  dispatch({ type: ORDER_ALL_LIST_REQUEST })

  const {
    userSignIn: { userInfo },
  } = getState()

  try {
    const { data } = await Axios.get(`${baseUrl}api/orders/allorder`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    })

    if (status === 'All') {
      dispatch({ type: ORDER_ALL_LIST_SUCCESS, payload: data })
    } else if (status === 'isPaid') {
      dispatch({
        type: ORDER_ALL_LIST_SUCCESS,
        payload: data.filter((state) => state.isPaid === true),
      })
    } else if (status === 'isNotPaid') {
      dispatch({
        type: ORDER_ALL_LIST_SUCCESS,
        payload: data.filter((state) => state.isPaid !== true),
      })
    } else if (status === 'isDelived') {
      dispatch({
        type: ORDER_ALL_LIST_SUCCESS,
        payload: data.filter((state) => state.isDelived === true),
      })
    } else if (status === 'isNotDelived') {
      dispatch({
        type: ORDER_ALL_LIST_SUCCESS,
        payload: data.filter((state) => state.isDelived !== true),
      })
    }
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    dispatch({ type: ORDER_ALL_LIST_FAIL, payload: message })
  }
}
