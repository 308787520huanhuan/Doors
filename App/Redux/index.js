import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    startup: require('./StartupRedux').reducer,
    login: require('./LoginRedux').reducer,
    reg: require('./RegRedux').reducer,
    user: require('./UserRedux').reducer,
    address: require('./addressRedux').reducer,
    search: require('./searchRedux').reducer,
    goods: require('./GoodsRedux').reducer,
    collect: require('./collectRedux').reducer,
    wallet: require('./walletRedux').reducer,
    order: require('./orderRedux').reducer,
    animated: require('./AnimatedRedux').reducer,
    scene: require('./SceneRedux').reducer,
  })

  return configureStore(rootReducer, rootSaga);
}
