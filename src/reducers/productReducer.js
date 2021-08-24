import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_REVIEW_LIST,
  PRODUCT_UPDATED_INFO,
} from '../constant/productConstant'

export const productListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
      }
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      }
    case PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case PRODUCT_UPDATED_INFO:
      return {
        products: [
          ...state.products,
          state.products.map(
            (product) =>
              action.payload.find((x) => x._id === product._id) || product
          ),
        ],
      }
    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { product: {}, loading: true },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productReviewsReducer = (state = { reviewList: {} }, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_LIST:
      return { reviewList: action.payload }
    default:
      return state
  }
}
