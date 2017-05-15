import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getOrderListRequest: ['token','filter','page'],
  getOrderListSuccess:['data'],

  confirmReceived:['id','token'],
  confirmReceivedSuccess:['data'],

  getOrderInfo:['id','token'],
  getOrderInfoSuccess:['data'],


  payOrderRequest:['id','token','amount','onResult'],
  payOrderSuccess:['data'],

  cancelOrderRequest:['id','token'],
  cancelOrderSuccess:['data'],

  fetchingFailure:['error']
})

export const orderTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  success: null,
  orderList:null,
  orderInfo:null,
  fetching:false
})

/* ------------- Reducers ------------- */

// we're attempting to get
export const getOrderListRequest = state => state.merge({ fetching: true,error: null,success: null })

//获得订单详情
export const getOrderInfo = state => state.merge({ fetching: true,error: null,success: null })

//确认收货请求
export const confirmReceived = state => state.merge({ fetching: true,error: null,success: null })

//获得订单列表成功
export const getOrderListSuccess = (state,{ data }) =>
    state.merge({ fetching: false, orderList:data , error:null,success: null})

//获得订单详情成功
export const getOrderInfoSuccess = (state,{ data }) =>
    state.merge({ fetching: false, orderInfo:data , error:null,success: null})

//支付订单
export const payOrderRequest = (state, { data }) =>
  state.merge({ fetching: true ,error: null,success: null })

export const payOrderSuccess = (state, { data }) =>
  state.merge({ fetching: false ,error: null,success: null })

//取消订单
export const cancelOrderRequest = (state, { data }) =>
    state.merge({ fetching: true, error: null, success: null} )

export const cancelOrderSuccess = (state, { data }) =>
  state.merge({ fetching: false ,error: null,success: null } )
//确定收货成功
export const confirmReceivedSuccess = (state,{ data }) => {
  var srcData = {
    'rows':[]
  }
  //先遍历rows
  state.orderList.rows.forEach(function(value,i){
    var val = value,index = i;
    for (var option in val) {
        if(option=='id' && val[option] == data.id){
          break;
        }
        srcData.rows.push(val)
    }
  })
  srcData = Object.assign({}, state.orderList, srcData)

  return state.merge({ fetching: false, orderList:srcData , error:null,success:'操作成功'})
}

export const fetchingFailure = (state,{ error }) =>
    state.merge({ fetching: false, error,success:null})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_ORDER_LIST_REQUEST]: getOrderListRequest,
  [Types.GET_ORDER_INFO]: getOrderInfo,
  [Types.GET_ORDER_INFO_SUCCESS]: getOrderInfoSuccess,
  [Types.GET_ORDER_LIST_SUCCESS]: getOrderListSuccess,
  [Types.CONFIRM_RECEIVED_SUCCESS]: confirmReceivedSuccess,
  [Types.CONFIRM_RECEIVED]: confirmReceived,
  [Types.PAY_ORDER_REQUEST]:payOrderRequest,
  [Types.PAY_ORDER_SUCCESS]:payOrderSuccess,
  [Types.CANCEL_ORDER_REQUEST]:cancelOrderRequest,
  [Types.CANCEL_ORDER_SUCCESS]:cancelOrderSuccess,
})
