import { take, put, call } from 'redux-saga/effects'
import { collectTypes } from '../Redux/collectRedux'
import collectActions from '../Redux/collectRedux'
import { Alert } from 'react-native'

import { createPayment } from 'react-native-pingpp'

export default (api) => {
  // ----------
  // The Worker
  // ---------
  //获得关注列表
  function * getCollectList (token,page,pageSize) {
    // make the call to the api
    const response = yield call(api.collectList,token,page,pageSize)
    const data = response.data
    if (data.error_code != null) {
        // failure
      yield put(collectActions.fetchingFailure(data.message))
    } else {
      //success
      yield put(collectActions.getCollectListSuccess(data))
    }
  }

  function * addCollect (token,goodsId,onResult) {
    // make the call to the api
    const response = yield call(api.addCollect,token,goodsId)
    const data = response.data
    if (data.error_code != null) {
        // failure
      yield put(collectActions.fetchingFailure(data.message))
    } else {
      //success
      yield put(collectActions.addCollectSuccess(data))
    }
    if (onResult) onResult(data)
  }

  function * deleteCollect (token, goods_ids) {
    // make the call to the api
    const response = yield call(api.deleteCollect,token,goods_ids)
    const data = response.data
    if (data.error_code != null) {
        // failure
      yield put(collectActions.fetchingFailure(data.message))
    } else {
      //success
      yield put(collectActions.deleteCollectSuccess(data))
    }
  }

  function * recharge (token,channel,amount,onResult) {
      const response = yield call(api.recharge,token,channel,amount);
      const data = response.data;
      if (data.error_code != null) {
        yield put(collectActions.fetchingFailure(data.message))
      } else {
        yield put(collectActions.rechargeSuccess(data));
      }
      if (onResult) onResult(data);
  }

  function * watcher () {
    while (true) {
      const action = yield take([
      collectTypes.GET_COLLECT_LIST_REQUEST,
      collectTypes.ADD_COLLECT_REQUEST,
      collectTypes.DELETE_COLLECT_REQUEST,
      collectTypes.RECHARGE_REQUEST,
    ])

      switch (action.type) {
        case collectTypes.GET_COLLECT_LIST_REQUEST:
          yield call(getCollectList,action.token,action.page,action.pageSize)
          break;
        case collectTypes.ADD_COLLECT_REQUEST:
          yield call(addCollect, action.token, action.goodsId,action.onResult)
          break;
        case collectTypes.DELETE_COLLECT_REQUEST:
          yield call(deleteCollect,action.token,action.goods_ids)
          break;
        case collectTypes.RECHARGE_REQUEST:
          yield call(recharge,action.token,action.channel,action.amount,action.onResult)
          break;
      }
    }
  }
  return {
    watcher
  }
}
