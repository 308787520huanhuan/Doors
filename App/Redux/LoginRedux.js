import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['data'],
  loginFailure: ['error'],
  wxLoginRequest: ['code', 'terminal'],
  wxLoginSuccess: ['data'],
  wxLoginFailure: ['error'],

  wxBindRequest: ['openid', 'access_token', 'phone', 'terminal'],
  wxBindSuccess: ['data'],
  wxBindFailure: ['error'],

  logout: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,

  terminal: 0,

  access_token: null, //请求绑定时使用
  openid: null,       //请求绑定时使用
})

/* ------------- Reducers ------------- */
export const loginRequest = state => INITIAL_STATE

export const loginSuccess = (state,{data}) => {
  return state.merge({fetching: false});
}

export const loginFailure = state => {
  return state.merge({fething: false});
}

// we've logged out
export const logout = state => INITIAL_STATE

export const wxLoginRequest = state =>
  state.merge({ fetching: true})


export const wxLoginSuccess = (state,{data}) => {
  if (0 == data.bind_user) {
      return state.merge({fetching: false,  access_token: data.access_token, openid: data.openid});
  } else if (1 == data.bind_user) {
      return state.merge({fetching: false,  access_token: null});
  }
  return state;
}

export const wxLoginFailure = state => {
  return state.merge({fething: false});
}

export const wxBindRequest = state =>
  state.merge({ fetching: true})


export const wxBindSuccess = (state,{data}) => {
  return state.merge({ fetching: false, access_token:null })
}

export const wxBindFailure = state => {
  return state.merge( {fetching: false, access_token:null})
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.WX_LOGIN_REQUEST]: wxLoginRequest,
  [Types.WX_LOGIN_SUCCESS]: wxLoginSuccess,
  [Types.WX_LOGIN_FAILURE]: wxLoginFailure,

  [Types.WX_BIND_REQUEST]: wxBindRequest,
  [Types.WX_BIND_SUCCESS]: wxBindSuccess,
  [Types.WX_BIND_FAILURE]: wxBindFailure,

  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = loginState => loginState.token !== null
