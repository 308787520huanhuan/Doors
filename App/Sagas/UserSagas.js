import { call } from 'redux-saga/effects'
import { put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import AlertMessage from '../Components/AlertMessage'
import { Alert } from 'react-native'

export function * getUserDCoin (api, action) {
  // make the call to the api
  const response = yield call(api.getUserDCoin,action.token)
  const data = response.data
  if (data.error_code != null) {
      // failure
    yield put(UserActions.getDCoinFailure(data.message));
  } else {
    //success\
    yield put(UserActions.getDCoinSuccess(data));
  }
}
