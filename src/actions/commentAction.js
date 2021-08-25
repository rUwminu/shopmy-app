import Axios from 'axios'
import { useDispatch } from 'react-redux'
import {
  CHECK_COMMENT_FALSE,
  CHECK_COMMENT_TRUE,
  CHECK_PURCHASE_FALSE,
  CHECK_PURCHASE_TRUE,
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

export const checkIsPurchase = (productId) => (dispatch, getState) => {
  const {
    userSignIn: { userInfo },
    orderMineList: { orders },
    productComment: { comments },
  } =  getState()


  if (orders) {
    const newOrderArray = orders.map((order) => {
      if (order.isDelived) {
        return order.orderItems
      }

      return []
    })

    if (newOrderArray && newOrderArray.length > 0) {
      const orderProductId = newOrderArray.map((productId) => {
        return productId.map((id) => {
          return id.product
        })
      })

      // Merge Array in Array into one Array
      const sliceArray = [].concat.apply([], orderProductId)

      if (sliceArray && sliceArray.length > 0) {
        const check = sliceArray.map((x) => {
          if (x.includes(productId)) {
            return true
          } else {
            return false
          }
        })

        if (check.includes(true)) {
          dispatch({ type: CHECK_PURCHASE_TRUE, payload: true })
        } else {
          dispatch({ type: CHECK_PURCHASE_FALSE, payload: false })
        }
      }
    }
  }
}


