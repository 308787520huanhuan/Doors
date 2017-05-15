import { take, put, call } from 'redux-saga/effects'
import { searchTypes } from '../Redux/searchRedux'
import searchActions from '../Redux/searchRedux'
import { Alert } from 'react-native'

export function * getHot(api, action)
{
  const response = yield call(api.getHot,action.token)
  const data = response.data
  if (data.error_code != null)
  {
    yield put(searchActions.fetchingFailure(response.data.message))
  }
  else
  {
    yield put(searchActions.getHotSuccess(data.keys))
  }
}

export function * searchRequest(api, action)
{
  const response = yield call(api.searcGoods,action.key,action.token)
  const data = response.data
  if (data.error_code != null)
  {
    yield put(searchActions.fetchingFailure(response.data.message))
  }
  else
  {
    yield put(searchActions.searchSuccess(data.rows))
  }
}

export function * deleteHistoryLog(api, action)
{
  const response = yield call(api.deleteLog,action.token,action.model,action.key)
  const data = response.data
  if (data.error_code != null)
  {
    yield put(searchActions.fetchingFailure(response.data.message))
  }
  else
  {
    yield put(searchActions.deleteHistoryLogSuccess(data.keys))
  }
}

export function * getHistory(api, action)
{
  const response = yield call(api.getHistory,action.token)
  const data = response.data
  if (data.error_code != null)
  {
    yield put(searchActions.fetchingFailure(response.data.message))
  }
  else
  {
    yield put(searchActions.getHistorySuccess(data.keys))
  }
}
