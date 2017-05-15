import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getWalletListRequest: ['token'],
  getListSuccess:['data'],
  getWalletInfoRequest: ['token'],
  getWalletInfoSuccess:['data'],
  fetchingFailure:['error']
})

export const walletTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  dataList:null,
  info:null,
  fetching:false
})

/* ------------- Reducers ------------- */

// we're attempting to get
export const getWalletListRequest = state => state.merge({ fetching: true,error: null,success: null })

export const getListSuccess = (state,{ data }) => {
 return state.merge({ fetching: false, error: null, dataList:data,success:null })
}

export const getWalletInfoRequest = state => state.merge({ fetching: true,error: null,success: null })

//获得订单成功
export const getWalletInfoSuccess = (state,{ data }) =>
    state.merge({ fetching: false, info:data , error:null,success: null})

export const fetchingFailure = (state,{ error }) =>
    state.merge({ fetching: false, error,success:null})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_WALLET_LIST_REQUEST]: getWalletListRequest,
  [Types.GET_LIST_SUCCESS]: getListSuccess,
})
