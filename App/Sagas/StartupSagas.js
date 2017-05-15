import { call, put, select } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import GoodsActions from '../Redux/GoodsRedux'
import StartupActions from '../Redux/StartupRedux'
import LoginActions from '../Redux/LoginRedux'

// exported to make available for tests
export const getUserToken = state => state.user.token
// process STARTUP actions
export function * startup (api,action) {

  // const token = yield select(getUserToken);
  // console.info("startup with token:"+token);
  // let { data } = yield call(api.getGoodsClass,token)
  // if (data == null) {
  //   Alert.alert(I18n.t('neterror'));
  //   return;
  // }

  // if (data.error_code != null) {
  //   if (data.error_code == 403) {
  //       yield put(UserActions.wxTokenInvalid());
  //   }
  // } else if (data.class_list != null) {
  //   // dispatch successful get homedata
  //   yield put(GoodsActions.goodsClassReceive(data));
  // }
  yield put(StartupActions.startupSuccess())
  //yield put(LoginActions.loginRequest('18224018117','123456'));
  yield put(LoginActions.loginRequest('15012345678','123456'));
}
