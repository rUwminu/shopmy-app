import {
  CHECK_COMMENT_FALSE,
  CHECK_COMMENT_TRUE,
  CHECK_PURCHASE_TRUE,
  CHECK_PURCHASE_FALSE,
  COMMENT_ALL_FAIL,
  COMMENT_ALL_REQUEST,
  COMMENT_ALL_SUCCESS,
  COMMENT_CREATE_FAIL,
  COMMENT_CREATE_SUCCESS,
} from '../constant/commentContant'

export const productCommentReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case COMMENT_ALL_REQUEST:
      return { loading: true }
    case COMMENT_ALL_SUCCESS:
      return { loading: false, comments: action.payload }
    case COMMENT_ALL_FAIL:
      return { loading: false, error: action.payload }
    case COMMENT_CREATE_SUCCESS:
      return { comments: [...state.comments, action.payload] }
    case COMMENT_CREATE_FAIL:
      return { ...state, error: action.payload }
    default:
      return state
  }
}

export const checkCommentedReducer = (
  state = { isPurchased: null },
  action
) => {
  switch (action.type) {
    case CHECK_PURCHASE_TRUE:
      return { isPurchased: true }
    case CHECK_PURCHASE_FALSE:
      return { isPurchased: false }
    default:
      return state
  }
}
