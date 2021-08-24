import Axios from 'axios'
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_REVIEW_LIST,
} from '../constant/productConstant'

const baseUrl = 'https://full-stack-api-shopmy.herokuapp.com/'

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  })

  try {
    const {
      data: { products, commentList },
    } = await Axios.get(`${baseUrl}api/products`)

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: products,
    })

    dispatch({ type: PRODUCT_REVIEW_LIST, payload: commentList })
  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: err.message,
    })
  }
}

export const detailProducts = (productId) => async (dispatch) => {
  dispatch({
    type: PRODUCT_DETAILS_REQUEST,
    payload: productId,
  })

  try {
    const { data } = await Axios.get(`${baseUrl}api/products/${productId}`)
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}
