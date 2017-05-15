import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginSuccess: ['data'],

  wxLoginSuccess: ['data'],

  wxBindSuccess: ['data'],
  wxBindFailure: ['error'],

  wxTokenInvalid: [],

  getDCoinRequest: ['token'],
  getDCoinSuccess: ['data'],
  getDCoinFailure: ['error'],
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  isbinduser:false,
  token:null,         //绑定后能使用
  user:{},            //绑定后得到的用户数据
})


export const loginSuccess = (state, { data }) =>
    state.merge({ user: data.user, token: data.token, isbinduser: true})

export const wxLoginSuccess = (state,{ data }) => {
  if (1 == data.bind_user) {
      return state.merge({user: data.user, token: data.token, isbinduser: true});
  } else {
      return state.merge({isbinduser: false});
  }
  return state;
}

export const wxBindSuccess = (state,{ data }) => {
  return state.merge( {user: data.user,token: data.token, isbinduser:true } )
}

export const wxBindFailure = state => {
  return state.merge( { isbinduser:false } )
}

export const wxTokenInvalid = state =>
  state.merge({ token: null,isbinduser: false })

//获得D币成功
export const getDCoinRequest = state => state.merge({ fetching: true,error: null,success: null })

const _updateDCoin = function (state, action) {
  let classId = state.classId
  let { d_coin } = action.data

  let user = {}
  user['d_coin'] = d_coin;

  return Object.assign({}, state.user, user)
}
//获得D币成功
export const getDCoinSuccess = (state, action) =>
    state.merge({ fetching: false, user:_updateDCoin(state,action) , error:null,success: null})

export const getDCoinFailure = (state, action) =>
    state.merge({ fetching: false})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_SUCCESS]: loginSuccess,

  [Types.WX_LOGIN_SUCCESS]: wxLoginSuccess,

  [Types.WX_BIND_SUCCESS]: wxBindSuccess,
  [Types.WX_BIND_FAILURE]: wxBindFailure,

  [Types.WX_TOKEN_INVALID]: wxTokenInvalid,

  [Types.GET_D_COIN_REQUEST]: getDCoinRequest,
  [Types.GET_D_COIN_SUCCESS]: getDCoinSuccess,
  [Types.GET_D_COIN_FAILURE]: getDCoinFailure
})

/* ------------- Selectors ------------- */
