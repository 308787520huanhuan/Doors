import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({

  resetState:[],

  getVerCodeRequest: ['phone'],
  getVerCodeSuccess: [],
  getVerCodeFailure: ['error'],

  checkVerCodeRequest: [
    'phone', 'verification'
  ],
  checkVerCodeSuccess: ['phone'],
  checkVerCodeFailure: ['error'],

  checkInviCodeRequest: ['invitation'],
  checkInviCodeSuccess: [],
  checkInviCodeFailure: ['error']
})

export const RegTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({phone: null, error: null,  fetching: false, step: 1})

/* ------------- Reducers ------------- */
//重置状态
export const resetState = state => state.merge( {fetching: false, phone: null, step: 1})
//获得验证码
export const getVerCodeRequest = state => state.merge({fetching: true})

// 获得验证码成功
export const getVerCodeSuccess = state => state.merge({fetching: false, error: null, step: 2})

// 请求失败
export const getVerCodeFailure = (state, {error}) => state.merge({fetching: false, error})

//检查验证码是否正确
export const checkVerCodeRequest = state => state.merge({fetching: true})

//验证码成功
export const checkVerCodeSuccess = (state, {phone}) => state.merge({fetching: false, error: null, step: 3, phone})

//验证码失败
export const checkVerCodeFailure = (state, {error}) => state.merge({fetching: false, error})

//检查邀请码是否正确
export const checkInviCodeRequest = state => state.merge({fetching: true})

//邀请码成功
export const checkInviCodeSuccess = (state) => {
  return state.merge({fetching: false, error: null, step: 4})
}

//邀请码失败
export const checkInviCodeFailure = (state, {error}) => state.merge({fetching: false, error})
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_STATE]: resetState,
  [Types.GET_VER_CODE_REQUEST]: getVerCodeRequest,
  [Types.GET_VER_CODE_SUCCESS]: getVerCodeSuccess,
  [Types.GET_VER_CODE_FAILURE]: getVerCodeFailure,

  [Types.CHECK_VER_CODE_REQUEST]: checkVerCodeRequest,
  [Types.CHECK_VER_CODE_SUCCESS]: checkVerCodeSuccess,
  [Types.CHECK_VER_CODE_FAILURE]: checkVerCodeFailure,

  [Types.CHECK_INVI_CODE_REQUEST]: checkInviCodeRequest,
  [Types.CHECK_INVI_CODE_SUCCESS]: checkInviCodeSuccess,
  [Types.CHECK_INVI_CODE_FAILURE]: checkInviCodeFailure
})
