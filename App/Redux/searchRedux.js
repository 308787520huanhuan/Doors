import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getHot: ['token'],
  getHotSuccess: ['data'],

  getHistory: ['token'],
  getHistorySuccess: ['data'],

  deleteHistoryLog:['token','model','key'],
  deleteHistoryLogSuccess:['data'],

  searchRequest:['token','key'],
  searchSuccess:['data'],

  fetchingFailure:['error']
})

export const searchTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  success: null,
  fetching:false,
  fetchingGoods:false,
  hotList:null,
  historyList:null,
  goodsList:null
})

/* ------------- Reducers ------------- */

// we're attempting to get
export const getHot = state => state.merge({ fetching: true,error:null,success:null })

export const getHotSuccess = (state,{ data }) =>{
  return state.merge({ fetching: false, error: null, hotList:data })
}

export const getHistory = state => state.merge({ fetching: true,error:null,success:null })

export const getHistorySuccess = (state,{ data }) =>{
  return state.merge({ fetching: false, error: null, historyList:data })
}

export const deleteHistoryLog = state => state.merge({ fetching: true,error:null,success:null })

export const deleteHistoryLogSuccess = (state,{ data }) =>{
  return state.merge({ fetching: false, error: null, historyList:data })
}

//搜索
export const searchRequest = state => state.merge({ fetching: true,error:null,success:null })

export const searchSuccess = (state,{ data }) =>{
  return state.merge({ fetching: false, error: null, goodsList:data})
}

export const fetchingFailure = (state,{ error }) =>{
  return state.merge({ fetching: false, error,success:null })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_HOT]: getHot,
  [Types.GET_HOT_SUCCESS]: getHotSuccess,

  [Types.GET_HISTORY]: getHistory,
  [Types.GET_HISTORY_SUCCESS]: getHistorySuccess,

  [Types.DELETE_HISTORY_LOG]: deleteHistoryLog,
  [Types.DELETE_HISTORY_LOG_SUCCESS]: deleteHistoryLogSuccess,

  [Types.SEARCH_REQUEST]: searchRequest,
  [Types.SEARCH_SUCCESS]: searchSuccess,

  [Types.FETCHING_FAILURE]: fetchingFailure,
})
