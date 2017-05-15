import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getCollectListRequest: ['token','page','pageSize'],
  getCollectListSuccess: ['data'],

  addCollectRequest: ['token','goodsId','onResult'],
  addCollectSuccess: ['data'],

  deleteCollectRequest: ['goods_ids','token'],
  deleteCollectSuccess: ['data'],

  rechargeRequest: ['token','channel','amount','onResult'],
  rechargeSuccess: ['data'],

  fetchingFailure: ['data'],
})

export const collectTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  charge:null,
  collectList:{},
  fetching:false
})

/* ------------- Reducers ------------- */

// we're attempting to get
export const getCollectListRequest = state => state.merge({ fetching: true,error: null,success: null })

//获得关注列表成功
export const getCollectListSuccess = (state,{ data }) =>
    state.merge({ fetching: false, collectList:data , error:null,success: null})

export const addCollectRequest = state => state.merge({ fetching: true,error: null,success: null })

//添加关注成功
export const addCollectSuccess = (state) =>
    state.merge({ fetching: false,  error:null,success: null})

export const deleteCollectRequest = state => state.merge({ fetching: true,error: null,success: null })

//删除关注成功
export const deleteCollectSuccess = (state,{ data }) =>
    state.merge({ fetching: false, error:null,collectList: data,success:'操作成功'})

export const fetchingFailure = (state,{ data }) => {
    return state.merge({ fetching: false, error:data,success:null})
}

export const rechargeRequest = (state) => state.merge({ fetching: true, error: null,success: null})

export const rechargeSuccess = (state, { charge }) =>
    state.merge({ fetching: false, charge:charge,error:null,success:null})
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCHING_FAILURE]: fetchingFailure,
  [Types.GET_COLLECT_LIST_REQUEST]: getCollectListRequest,
  [Types.GET_COLLECT_LIST_SUCCESS]: getCollectListSuccess,

  [Types.ADD_COLLECT_REQUEST]: addCollectRequest,
  [Types.ADD_COLLECT_SUCCESS]: addCollectSuccess,

  [Types.DELETE_COLLECT_REQUEST]: deleteCollectRequest,
  [Types.DELETE_COLLECT_SUCCESS]: deleteCollectSuccess,

  [Types.RECHARGE_REQUEST]: rechargeRequest,
  [Types.RECHARGE_SUCCESS]: rechargeSuccess,
})
