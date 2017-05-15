import { take, put, call } from 'redux-saga/effects'
import { RegTypes } from '../Redux/RegRedux'
import RegActions from '../Redux/RegRedux'
import { Alert } from 'react-native'
import * as MobSMS from 'react-native-mob-sms'

const timer = require('react-native-timer')
export default (api) => {
  // ----------
  // The Worker
  // ---------
  //发送验证码接口
  function * getVerCodeRequest (phone) {
    let error = yield MobSMS.getVerificationCode(phone,'86',null);
    if (error && error.code == '0') {
        yield put(RegActions.getVerCodeSuccess())
    } else {
        yield put(RegActions.getVerCodeFailure(error.message))
    }
  }
  //检查验证码是否正确
  function * checkVerCodeRequest (phone,verification) {
    let error = yield call(MobSMS.commitVerificationCode,verification,phone,'86');
    if (error && error.code == '0') {
        yield put(RegActions.checkVerCodeSuccess(phone))
    } else {
        yield put(RegActions.checkVerCodeFailure(error.message))
    }
  }
  //检查邀请码是否正确
  function * checkInviCodeRequest (invitation) {
    //make the call to the api
    // const response = yield call(api.checkInviCodeRequest,invitation)
    // if (response.data.error_code != null) {
    //   // dispatch failure
    //   yield put(RegActions.checkInviCodeFailure(response.data.message))
    //
    // } else {
    //   // dispatch successful get homedata
    //   yield put(RegActions.checkInviCodeSuccess())
    // }
    yield put(RegActions.checkInviCodeSuccess())
  }

  function * watcher () {
    while (true) {
      const action = yield take([RegTypes.GET_VER_CODE_REQUEST, RegTypes.CHECK_VER_CODE_REQUEST, RegTypes.CHECK_INVI_CODE_REQUEST])
      switch (action.type) {
        case RegTypes.GET_VER_CODE_REQUEST:
          yield call(getVerCodeRequest,action.phone)
          break
        case RegTypes.CHECK_VER_CODE_REQUEST:
          yield call(checkVerCodeRequest,action.phone,action.verification)
          break
        case RegTypes.CHECK_INVI_CODE_REQUEST:
          yield call(checkInviCodeRequest,action.invitation)
          break
      }
    }
  }
  return {
    watcher
  }
}
