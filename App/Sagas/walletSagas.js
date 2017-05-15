import { take, put, call } from 'redux-saga/effects'
import { walletTypes } from '../Redux/walletRedux'
import walletActions from '../Redux/walletRedux'

import { Alert } from 'react-native'

export default (api) => {
  // ----------
  // The Worker
  // ---------
  //获得订单列表
  function * getWalletList (token) {
    // make the call to the api
    const response = yield call(api.walletList,token)

    const data = response.data
    if (data.error_code != null) {
        // failure
      yield put(walletActions.fetchingFailure(data.message))
    } else {
      //success
      yield put(walletActions.getListSuccess(data.data))
    }
  }

  function * getWalletInfo (token) {
    // make the call to the api
    const response = yield call(api.walletInfo,token)
    const data = response.data
    if (data.error_code != null) {
        // failure
      yield put(walletActions.fetchingFailure(data.message))
    } else {
      //success
      yield put(walletActions.getWalletInfoSuccess(data.list))
    }
  }

  function * watcher () {
    while (true) {
      const action = yield take([
        walletTypes.GET_WALLET_LIST_REQUEST
    ])
      switch (action.type) {
        case walletTypes.GET_WALLET_LIST_REQUEST:
          yield call(getWalletList,action.token);
          break
      }
    }
  }
  return {
    watcher
  }
}
