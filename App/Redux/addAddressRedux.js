import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addAddressRequest: ['user','phone','address'],
  getAddressInfo:['token','id'],
  getAddressInfoSuccess:['data'],
  addAddressSuccess: ['success'],
  addAddressFailure: ['error'],
})

export const addAddressTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  success: false,
  fetching:false,
  addressInfo:null
})

/* ------------- Reducers ------------- */

// we're attempting to get
//获得验证码
export const addAddressRequest = state => state.merge({ fetching: true })

export const getAddressInfo = state => state.merge({ fetching: true })

export const getAddressInfoSuccess = (state,{ data }) =>
    state.merge({ fetching: false, addressInfo:data})

export const addAddressSuccess = (state,{ success }) =>
    state.merge({ fetching: false, success})

// 请求失败
export const addAddressFailure = (state, { error }) =>
  state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_ADDRESS_REQUEST]: addAddressRequest,
  [Types.ADD_ADDRESS_SUCCESS]: addAddressSuccess,
  [Types.GET_ADDRESS_INFO]: getAddressInfo,
  [Types.GET_ADDRESS_INFO_SUCCESS]: getAddressInfoSuccess,
  [Types.ADD_ADDRESS_FAILURE]: addAddressFailure
})
