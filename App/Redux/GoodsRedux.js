import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  goodsClassRequest: ['token','terminal'],
  goodsClassReceive: ['data'],
  goodsClassFailure: ['error'],

  // getSubClass:['class_id'],
  // subClassSuccess:['data'],
  // fetchFailure:['error'],

  goodsListRequest: ['token', 'class_id', 'key', 'page', 'page_size'],
  goodsListReceive: ['data'],
  goodsListFailure: ['error'],

  goodsInfoRequest: ['token','goods_id'],
  goodsInfoReceive: ['data'],
  goodsInfoFailure: ['error'],

  showGoodsInfo: ['is_show']
})

export const GoodsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  classId: 0,
  success:null,
  error:null,
  goodsId: 0,
  classList: [],
  goodsList: {},
  goodsInfo: {},
  isShowGoodsInfo:false,
});

/* ------------- Reducers ------------- */
//获得子分类列表
// export const getSubClass = state =>
//   Object.assign({}, state, {
//       fetching: true,
//       success:null,
//       error:null
//     })

// request home data
export const goodsClassRequest = (state, action) =>
  state.merge({fetching: true})


//获得子分类成功
// export const subClassSuccess = (state, {data}) =>
// Object.assign({}, state, {
//       fetching: false,
//       success:null,
//       error:null,
//       subClass:data
//     })

//获得子分类成功
// export const fetchFailure = (state, {error}) =>
//   state.merge({fetching: true,error,success:null})

// receive home data
export const goodsClassReceive = (state, action) =>
  Object.assign({}, state, {
    classList: action.data.class_list,
    fetching: false
  })
// homedata failure
export const goodsClassFailure = (state, action) =>
  state.merge({fetching: false})

// request goodsList
export const goodsListRequest = (state, action) =>
  Object.assign({}, state, {
    fetching: true,
    classId: action.class_id
  })

const updateGoodsList = function (state, action) {
  let classId = state.classId
  let {page, rows} = action.data

  let srcGoodsList = {}
  srcGoodsList[classId] = {}
  srcGoodsList[classId][page] = rows

  return Object.assign({}, state.goodsList, srcGoodsList)
}

// receive goodsList
export const goodsListReceive = (state, action) =>
  Object.assign({}, state, {
    goodsList: updateGoodsList(state, action),
    fetching: false
  })

// goodsList failure
export const goodsListFailure = (state, action) =>
  Object.assign({}, state, {
    fetching: false
  })
// request goodsList
export const goodsInfoRequest = (state, action) =>
  Object.assign({}, state, {
    fetching: true,
    goodsId: action.goods_id
  })

const updateGoodsInfo = function (state, action) {
  let goodsInfo = action.data

  let srcGoodsInfo = {}
  srcGoodsInfo[goodsInfo.id] = goodsInfo

  return Object.assign({}, state.goodsInfo, srcGoodsInfo)
}

// receive goodsList
export const goodsInfoReceive = (state, action) =>
  Object.assign({}, state, {
    goodsInfo: updateGoodsInfo(state, action),
    fetching: false
  })

// goodsList failure
export const goodsInfoFailure = (state, action) =>
  Object.assign({}, state, {
    fetching: false
  })

export const showGoodsInfo = (state, action) => {
  return Object.assign({},state,{isShowGoodsInfo: action.is_show})
}

// map our types to our handlers
const ACTION_HANDLERS = {
  //[Types.GET_SUB_CLASS]: getSubClass,
  [Types.GOODS_CLASS_REQUEST]: goodsClassRequest,
  [Types.GOODS_CLASS_RECEIVE]: goodsClassReceive,
  [Types.GOODS_CLASS_FAILURE]: goodsClassFailure,
  [Types.GOODS_LIST_REQUEST]: goodsListRequest,
  [Types.GOODS_LIST_RECEIVE]: goodsListReceive,
  [Types.GOODS_LIST_FAILURE]: goodsListFailure,
  [Types.GOODS_INFO_REQUEST]: goodsInfoRequest,
  [Types.GOODS_INFO_RECEIVE]: goodsInfoReceive,
  [Types.GOODS_INFO_FAILURE]: goodsInfoFailure,
  [Types.SHOW_GOODS_INFO]: showGoodsInfo
}

export const reducer = createReducer(INITIAL_STATE, ACTION_HANDLERS)
