import { call } from 'redux-saga/effects'
import { put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import RegActions from '../Redux/RegRedux'
import LoginActions from '../Redux/LoginRedux'
import GoodsActions from '../Redux/GoodsRedux'
import AlertMessage from '../Components/AlertMessage'
import { Alert } from 'react-native'

// I18n
import I18n from 'react-native-i18n'

export function * login(api, action) {
  let {data} = yield call(api.login, action.username,action.password)
  if (data == null) {
    Alert.alert(I18n.t('neterror'));
    return;
  }
  if ( data.error_code != null) {
      // dispatch failure
    yield put(LoginActions.loginFailure(data.error_code))

      // 登录失败提示信息
    Alert.alert(I18n.t('signIn'), data.message)
  } else {
    yield put(UserActions.loginSuccess(data))
    yield put(LoginActions.loginSuccess(data))
  }
}

export function * wxLogin (api, action) {

  let {data} = yield call(api.wxLogin, action.code)
  if (data == null) {
    Alert.alert(I18n.t('neterror'));
    return;
  }
  if ( data.error_code != null) {
      // dispatch failure
    yield put(LoginActions.wxLoginFailure(data.error_code))

      // 登录失败提示信息
    Alert.alert(I18n.t('signIn'), data.message)
  } else {
    yield put(UserActions.wxLoginSuccess(data))
    yield put(RegActions.resetState())
    yield put(LoginActions.wxLoginSuccess(data))
  }
}

export function * wxBind (api, action) {
  console.info("wxBind begin");
  console.info(action)
  let {data} = yield call(api.wxBind, action.openid, action.access_token, action.phone, action.terminal)
  if (data == null) {
    Alert.alert(I18n.t('neterror'))
    return;
  }
  console.info('-------------data--------------')
  console.info(data)
  if (data.error_code != null) {
      // dispatch failure
    yield put(UserActions.wxBindFailure(data))
    yield put(LoginActions.wxBindFailure(data.error_code))

      // 登录失败提示信息
    Alert.alert(I18n.t('bind'), data.message)
  } else {
    yield put(UserActions.wxBindSuccess(data))
    yield put(LoginActions.wxBindSuccess(data))
  }
}
