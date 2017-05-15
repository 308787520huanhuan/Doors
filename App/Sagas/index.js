import { takeLatest } from 'redux-saga'
import { fork } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugSettings from '../Config/DebugSettings'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { UserTypes } from '../Redux/UserRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { GoodsTypes } from '../Redux/GoodsRedux'
import { RegTypes } from '../Redux/RegRedux'
import { addressTypes } from '../Redux/addressRedux'
import { searchTypes } from '../Redux/searchRedux'
import { orderTypes } from '../Redux/orderRedux'
import { collectTypes } from '../Redux/collectRedux'
import { walletTypes } from '../Redux/walletRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login, wxLogin, wxBind } from './LoginSagas'
import { getUserDCoin } from './UserSagas'
import { getHot, getHistory,searchRequest,deleteHistoryLog} from './searchSagas'
import regs from './RegSagas'
import goods from './GoodsSagas'
import address from './addressSagas'
import order from './orderSagas'
import collect from './collectSagas'
import wallet from './walletSagas'
/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugSettings.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.WX_LOGIN_REQUEST, wxLogin, api),
    takeLatest(LoginTypes.WX_BIND_REQUEST, wxBind, api),
    takeLatest(UserTypes.GET_D_COIN_REQUEST, getUserDCoin, api),

    //search
    takeLatest(searchTypes.GET_HOT, getHot, api),
    takeLatest(searchTypes.GET_HISTORY, getHistory, api),
    takeLatest(searchTypes.SEARCH_REQUEST, searchRequest, api),
    takeLatest(searchTypes.DELETE_HISTORY_LOG, deleteHistoryLog, api),


    // some sagas receive extra parameters in addition to an action
    fork(goods(api).watcher),
    fork(address(api).watcher),
    //fork(search(api).watcher),
    fork(order(api).watcher),
    fork(collect(api).watcher),
    fork(wallet(api).watcher),
    fork(regs(api).watcher)
  ]
}
