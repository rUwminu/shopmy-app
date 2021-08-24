import Axios from 'axios'
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIKE_PRODUCT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UNLIKE_PRODUCT,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constant/userContant'
import { CART_REMOVE_ALL_ITEM } from '../constant/cartContant'

const baseUrl = 'https://full-stack-api-shopmy.herokuapp.com/'

export const register = (data) => async (dispatch) => {
  const { email, password, username } = data

  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { username, email, password },
  })

  try {
    const { data } = await Axios.post(`${baseUrl}api/users/register`, {
      username,
      email,
      password,
    })

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const signin = (data) => async (dispatch) => {
  const { email, password } = data

  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: { email, password },
  })

  try {
    const { data } = await Axios.post(`${baseUrl}api/users/login`, {
      email,
      password,
    })

    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    })

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (err) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const signout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingAddress')
  dispatch({
    type: USER_SIGNOUT,
  })

  dispatch({
    type: CART_REMOVE_ALL_ITEM,
  })
}

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId })

  const {
    userSignIn: { userInfo },
  } = getState()

  try {
    const { data } = await Axios.get(`${baseUrl}api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    dispatch({ type: USER_DETAILS_FAIL, payload: message })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user })

  const {
    userSignIn: { userInfo },
  } = getState()

  try {
    const { data } = await Axios.put(`${baseUrl}api/users/profile`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data })
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message })
  }
}

export const likeProduct = (product) => async (dispatch, getState) => {
  const {
    userSignIn: { userInfo },
  } = getState()

  const existItemsInArr = userInfo.likeItems.find((item) => item === product)

  if (!existItemsInArr) {
    const newItemsArr = [...userInfo.likeItems, product]

    const updateData = {
      _id: userInfo._id,
      name: userInfo.name,
      email: userInfo.email,
      isAdmin: userInfo.isAdmin,
      likeItems: newItemsArr,
      createdAt: userInfo.createdAt,
      token: userInfo.token,
    }

    dispatch({
      type: USER_LIKE_PRODUCT,
      payload: updateData,
    })

    localStorage.setItem('userInfo', JSON.stringify(updateData))
  }

  const id = { productId: product.toString() }

  try {
    const { data } = await Axios.put(`${baseUrl}api/users/like`, id, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
  }
}

export const unlikeProduct = (product) => async (dispatch, getState) => {
  const {
    userSignIn: { userInfo },
  } = getState()

  const existItemsInArr = userInfo.likeItems.find((item) => item === product)

  if (existItemsInArr) {
    const newItemsArr = userInfo.likeItems.filter((item) => item !== product)

    const updateData = {
      _id: userInfo._id,
      name: userInfo.name,
      email: userInfo.email,
      isAdmin: userInfo.isAdmin,
      likeItems: newItemsArr,
      createdAt: userInfo.createdAt,
      token: userInfo.token,
    }

    dispatch({
      type: USER_UNLIKE_PRODUCT,
      payload: updateData,
    })

    localStorage.setItem('userInfo', JSON.stringify(updateData))
  }

  const id = { productId: product.toString() }

  try {
    const { data } = await Axios.put(`${baseUrl}api/users/unlike`, id, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
  }
}
