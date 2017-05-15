import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  userId: null,
  categoryId: null,
  subcategoryId: null,
  productId: null
})

// request temp
const tempContact = (state, action) =>
  state.merge({
    userId: action.userId,
    categoryId: action.categoryId,
    subcategoryId: action.subcategoryId,
    productId: action.productId
  })

const contactSuccess = (state, action) =>
  state.merge({
    userId: action.userId,
    categoryId: action.categoryId,
    subcategoryId: action.subcategoryId,
    productId: action.productId
  })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.CONTACT_SALES]: tempContact,
  [Types.CONTACT_SUCCESS]: contactSuccess
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
