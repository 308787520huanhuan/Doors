import { take, put, call } from 'redux-saga/effects'
import { GoodsTypes } from '../Redux/GoodsRedux'
import GoodsActions from '../Redux/GoodsRedux'
import UserActions from '../Redux/UserRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
// This style of Saga is a common pattern.  It has a
// worker and a watcher.
//
// The watcher listens for the signal, and the worker
// does the job.

// We use a factory function will close over the scope of
// our watcher saga.  This ensures the API is passed in
// (hurray objects being composed).
export default (api) => {
  // ----------
  // The Worker
  // ---------
  function * getGoodsClass (token) {
    // make the call to the api
    let {data} = yield call(api.getGoodsClass,token)
    if (data == null) {
      Alert.alert(I18n.t('neterror'));
      return;
    }
    if (data.error_code != null) {
      if (data.error_code == 403) {
          yield put(UserActions.wxTokenInvalid());
          return;
      }

      error = data == null ? "网络异常":data.error_code;
      // dispatch failure
      yield put(GoodsActions.goodsClassFailure(error))
    } else if (data.class_list != null) {
      // dispatch successful get homedata
      yield put(GoodsActions.goodsClassReceive(data))
    }
  }

  //第三级分类列表
  // function * getSubClass (classId) {
  //   console.info("dasdasdasd")
  //   // make the call to the api
  //   let {data} = yield call(api.getSubClass, classId)
  //   if (data == null || data.error_code != null)
  //   {
  //     error = data == null ? "网络异常":data.error_code;
  //     console.info("失败啦");
  //     console.info(error)
  //     // dispatch failure
  //     yield put(GoodsActions.fetchFailure(error))
  //   }
  //   else
  //   {
  //     console.info("成功啦");
  //     console.info(data)
  //     // dispatch successful get homedata
  //     yield put(GoodsActions.subClassSuccess(data))
  //   }
  // }

  function * getGoodsList (token, classId, key, page, pageNum) {
    // make the call to the api
    let {data} = yield call(api.getGoodsList, token, classId, key, page, pageNum)
    if (data == null || data.error_code != null) {
      error = data == null ? "网络异常":data.error_code;
      // dispatch failure
      yield put(GoodsActions.goodsListFailure(error))
    } else {
      // dispatch successful get homedata
      yield put(GoodsActions.goodsListReceive(data))
    }
  }

  function * getGoodsInfo (token, goodsId) {
    // make the call to the api
    let {data} = yield call(api.getGoodsInfo, token, goodsId)
    if (data == null || data.error_code != null) {
      error = data == null ? "网络异常":data.error_code;
      // dispatch failure
      yield put(GoodsActions.goodsInfoFailure(error))
    } else {
      // dispatch successful get homedata
      yield put(GoodsActions.goodsInfoReceive(data))
      yield put(GoodsActions.showGoodsInfo(true))
    }
  }

  // function * reqeustGoods(action) {
  //   switch (action.type) {
  //     case GoodsTypes.GOODS_CLASS_REQUEST:
  //       call(goodsClassRequest)
  //       break;
  //     case GoodsTypes.GOODS_LIST_REQUEST:
  //       call(goodsListRequest,action.classId,action.page,action.pageNum)
  //       break;
  //     case GoodsTypes.GOODS_INFO_REQUEST:
  //       call(goodsInfoRequest,action.goodsId)
  //       break;
  //   }
  // }
  // a daemonized version which waits for GOODSCLASS_REQUEST signals
  function * watcher () {
    while (true) {
      const action = yield take([
        GoodsTypes.GOODS_CLASS_REQUEST,
        GoodsTypes.GOODS_LIST_REQUEST,
        //GoodsTypes.GET_SUB_CLASS,
        GoodsTypes.GOODS_INFO_REQUEST])
      switch (action.type) {
        case GoodsTypes.GOODS_CLASS_REQUEST:
          yield call(getGoodsClass,action.token)
          break
        // case GoodsTypes.GET_SUB_CLASS:
        //   yield call(getSubClass,action.class_id)
        //   break
        case GoodsTypes.GOODS_LIST_REQUEST:
          yield call(getGoodsList, action.token, action.class_id, action.key, action.page, action.page_size)
          break
        case GoodsTypes.GOODS_INFO_REQUEST:
          yield call(getGoodsInfo, action.token, action.goods_id)
          break
      }
    }
  }
  // Expose both functions.  Now, technically, we're only
  // needing to return the watcher.  If we return both, we
  // gain 2 important properties:
  //
  // 1.  We can test the worker directly without need to
  // mock the watcher taking.
  //
  // 2.  We can call the worker from other sagas which is
  // often required in some flow control cases.
  return {
    watcher
  }
}
