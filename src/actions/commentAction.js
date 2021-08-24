import Axios from 'axios'
import {
  COMMENT_ALL_FAIL,
  COMMENT_ALL_REQUEST,
  COMMENT_ALL_SUCCESS,
  COMMENT_CREATE_FAIL,
  COMMENT_CREATE_REQUEST,
  COMMENT_CREATE_SUCCESS,
} from '../constant/commentContant'
import { PRODUCT_UPDATED_INFO } from '../constant/productConstant'

const baseUrl = 'https://full-stack-api-shopmy.herokuapp.com/'

export const getProductComment = (productId) => async (dispatch) => {
  dispatch({ type: COMMENT_ALL_REQUEST, payload: productId })

  try {
    const { data } = await Axios.get(`${baseUrl}api/comments/${productId}`)

    dispatch({ type: COMMENT_ALL_SUCCESS, payload: data })
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    dispatch({ type: COMMENT_ALL_FAIL, payload: `${message}` })
  }
}

export const createProductComment =
  (InfoData) => async (dispatch, getState) => {
    console.log(InfoData)
    const {
      userSignIn: { userInfo },
    } = getState()
    const { id, commentBody, numReviews } = InfoData

    try {
      const { data } = await Axios.post(
        `${baseUrl}api/comments/${id}`,
        { commentBody },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      )

      if (data) {
      const { updatedProduct } = await Axios.put(
        `${baseUrl}api/products/addcomment/${id}`,
        { numReviews },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      )

        dispatch({ type: PRODUCT_UPDATED_INFO, payload: updatedProduct })
      }

      dispatch({ type: COMMENT_CREATE_SUCCESS, payload: data })
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      dispatch({ type: COMMENT_CREATE_FAIL, payload: `${message}` })
    }
  }
