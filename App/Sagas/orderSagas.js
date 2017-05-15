import { take, put, call } from 'redux-saga/effects'
import { orderTypes } from '../Redux/orderRedux'
import orderActions from '../Redux/orderRedux'
import { Alert } from 'react-native'

export default (api) => {
  // ----------
  // The Worker
  // ---------
  //获得订单列表
  function * getOrderList (token,filter,page) {
    // make the call to the api
    const response = yield call(api.orderList,token,filter,page)
    const data = response.data
    if (data.error_code != null) {
      // failure
      yield put(orderActions.fetchingFailure(response.data.message))
    } else {
      //success
      yield put(orderActions.getOrderListSuccess(response.data,filter))
    }
  }

  //支付订单
  function * payOrder (id,token,amount,onResult) {
      const response = yield call(api.payOrder,id,token,amount)
      const data = response.data;
      if (data.error_code != null) {
        yield put(orderActions.fetchingFailure(response.data.message))
      } else {
        yield put(orderActions.payOrderSuccess(data));
      }
      if (onResult) yield onResult(data);
  }

  //取消订单
  function * cancelOrder (id,token) {
    const response = yield call(api.cancelOrder,id,token);
    const data = response.data;
    if (data.error_code != null) {
      yield put(orderActions.fetchingFailure(data.message))
    } else {
      yield put(orderActions.cancelOrderSuccess(data));
    }
  }
  //确认收货
  function * confirmReceived (id,token) {
    //make the call to the api
    const response = yield call(api.confirmReceived,id,token)
    const data = response.data
    if (data.error_code != null) {
        // failure
      yield put(orderActions.fetchingFailure(data.message))

    } else {
      var setData = {
        'id':id,
        'order_status':4
      }
      //success
      yield put(orderActions.confirmReceivedSuccess(setData))
    }
  }

  //获得订单详情
  function * getOrderInfo (id,token) {
    // make the call to the api
    const response = yield call(api.orderInfo,id,token)
    const data = response.data
    if (data.error_code != null) {
      // failure
      yield put(orderActions.fetchingFailure(data.message))
    } else {
      // success
      yield put(orderActions.getOrderInfoSuccess(data))
    }
  }

  function * watcher () {
    while (true) {
      const action = yield take([
      orderTypes.GET_ORDER_LIST_REQUEST,
      orderTypes.PAY_ORDER_REQUEST,
      orderTypes.CANCEL_ORDER_REQUEST,
      orderTypes.GET_ADDRESS_INFO,
      orderTypes.CONFIRM_RECEIVED,
      orderTypes.GET_ORDER_INFO
    ])
      switch (action.type) {
        case orderTypes.GET_ORDER_LIST_REQUEST:
          yield call(getOrderList,action.token,action.filter,action.page)
          break
        case orderTypes.PAY_ORDER_REQUEST:
          yield call(payOrder,action.id,action.token,action.amount,action.onResult)
          break;
        case orderTypes.CANCEL_ORDER_REQUEST:
          yield call(cancelOrder,action.id,action.token)
          break;
        case orderTypes.CONFIRM_RECEIVED:
            yield call(confirmReceived,action.id,action.token)
            break
        case orderTypes.GET_ADDRESS_INFO:
            yield call(getAddressInfo,action.token,action.id)
            break
        case orderTypes.GET_ORDER_INFO:
            yield call(getOrderInfo,action.id,action.token)
            break
      }
    }
  }
  return {
    watcher
  }
}
