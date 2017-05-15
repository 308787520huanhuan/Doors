import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addAddressRequest: ['token', 'user','phone','address','is_default'],
  editAddressRequest: ['id','token','consignee','consignee_phone','consignee_address','is_default','model'],
  editAddressSuccess:['data','list'],
  getAddressInfo:['token','id'],
  getAddressInfoSuccess:['data'],
  deleteAddressRequest:['id','token'],
  setDefaultAddress:['id','token','consignee','consignee_phone','consignee_address','is_default','model'],

  operatFailure:['error'],
  operatSuccess:['data'],

  getAddressRequest: ['token'],

  getAddressSuccess: ['data'],
  deleteAddressSuccess:['data'],
  getAddressFailure: ['error'],

})

export const addressTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  success: null,
  addressList:null,
  addressInfo:{},
  fetching:false
})

/* ------------- Reducers ------------- */

// we're attempting to get
export const addAddressRequest = state => state.merge({ fetching: true,error:null,success:null })

export const editAddressRequest = state => {
  return state.merge({ fetching: true })
}

export const getAddressInfo = state => state.merge({ fetching: true,error:null,success:null })

//请求地址详情成功
export const getAddressInfoSuccess = (state,{ data }) => {
  let info = {}
  info[data.id] = data
  return state.merge({ fetching: false, addressInfo:info,error:null,success:null})
}

export const editAddressSuccess = (state,{ data,list }) => {
  let info = {}
  info[data.id] = data
  return state.merge({ fetching: false, addressInfo:info,error:null,success:"编辑地址成功",addressList:list})
}

export const operatSuccess = (state,{ data }) =>
    state.merge({ fetching: false, addressList:data,error:null,success:"操作成功"})

// 请求失败
export const operatFailure = (state, { error }) =>
  state.merge({ fetching: false, error,success:null })

//获得地址列表
export const getAddressRequest = state => state.merge({ fetching: true, error: null, success: null })

//删除地址
export const deleteAddressRequest = state => state.merge({ fetching: true })

//设置为默认地址
export const setDefaultAddress = state => state.merge({ fetching: true })

//删除地址成功
export const deleteAddressSuccess = (state,{ data }) =>{
  return state.merge({ fetching: false, error: null, success:data })
}

export const getAddressSuccess = (state,{ data }) =>{
  return state.merge({ fetching: false, error: null, addressList:data,success:null })
}


// 请求失败
export const getAddressFailure = (state, { error }) =>
  state.merge({ fetching: false, error,success:null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_ADDRESS_REQUEST]: addAddressRequest,
  [Types.OPERAT_SUCCESS]: operatSuccess,
  [Types.OPERAT_FAILURE]: operatFailure,
  [Types.DELETE_ADDRESS_REQUEST]:deleteAddressRequest,
  [Types.SET_DEFAULT_ADDRESS]:setDefaultAddress,
  [Types.EDIT_ADDRESS_REQUEST]:editAddressRequest,
  [Types.EDIT_ADDRESS_SUCCESS]:editAddressSuccess,

  [Types.GET_ADDRESS_INFO]: getAddressInfo,
  [Types.GET_ADDRESS_INFO_SUCCESS]: getAddressInfoSuccess,

  [Types.GET_ADDRESS_REQUEST]: getAddressRequest,
  [Types.GET_ADDRESS_SUCCESS]: getAddressSuccess,
  [Types.GET_ADDRESS_FAILURE]: getAddressFailure,


  [Types.DELETE_ADDRESS_SUCCESS]:deleteAddressSuccess
})
