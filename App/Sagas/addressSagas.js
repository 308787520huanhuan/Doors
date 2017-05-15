import { take, put, call } from 'redux-saga/effects'
import { addressTypes } from '../Redux/addressRedux'
import addressActions from '../Redux/addressRedux'
import { Alert } from 'react-native'

export default (api) => {
  // ----------
  // The Worker
  // ---------
  //发送验证码接口
  function * address (token) {
    // make the call to the api
    const response = yield call(api.addressList,token)
    const data = response.data
    if (data.error_code != null) {
      // failure
      yield put(addressActions.getAddressFailure(response.data.message))
    } else {
      console.info(data);
      // success
      yield put(addressActions.getAddressSuccess(data.consignee_list))
    }
  }
  //添加地址
  function * addAddress (token,user,phone,address,is_default) {
    // make the call to the api
    const response = yield call(api.addAddress,token,user,phone,address,is_default)

    const data = response.data
    if (data.error_code != null) {
        // failure
      yield put(addressActions.operatFailure(data.message))

    } else {
      yield put(addressActions.operatSuccess(data.consignee_list))
    }
  }

  //删除地址
  function * deleteAddress (id,token) {
    const response = yield call(api.deleteAddress,id,token)

    const data = response.data

    if (data.error_code != null) {
        // failure
      yield put(addressActions.operatFailure(data.message))

    } else {
      //success
      yield put(addressActions.operatSuccess(data.consignee_list))
    }
  }

  //修改地址信息
  function * setDefaultAddress (id,token,user,phone,address,is_default,type) {
    const response = yield call(api.changeAddress,id,token,user,phone,address,is_default,type)

    const data = response.data
    console.info("收到设置默认地址结果")
    console.log(data)
    if (data.error_code != null) {
        // failure
      yield put(addressActions.operatFailure(data.message))

    } else {
      //success
      yield put(addressActions.operatSuccess(data.consignee_list))
    }
  }
  function * editAddress (id,token,user,phone,address,is_default,type) {
    const response = yield call(api.changeAddress,id,token,user,phone,address,is_default,type)

    const data = response.data

    if (data.error_code != null) {
        // failure
      yield put(addressActions.operatFailure(data.message))

    } else {
      var editData = {}
      editData.consignee = user
      editData.consignee_address = address
      editData.consignee_phone = phone
      editData.is_default = is_default
      editData.id = id
      //success
      yield put(addressActions.editAddressSuccess(editData,data.consignee_list))
    }
  }
  //获得某一条地址的信息
  function * getAddressInfo(token,id){
    const response = yield call(api.getAddressInfo,id,token)

    const data = response.data

    if (data.error_code != null) {
        // failure
      yield put(addressActions.operatFailure(data.message))

    } else {
      //success
      yield put(addressActions.getAddressInfoSuccess(data))
    }
  }


  function * watcher () {
    while (true) {
      const action = yield take([
      addressTypes.SET_DEFAULT_ADDRESS,
      addressTypes.GET_ADDRESS_REQUEST,
      addressTypes.DELETE_ADDRESS_REQUEST,
      addressTypes.GET_ADDRESS_INFO,
      addressTypes.ADD_ADDRESS_REQUEST,
      addressTypes.CHANGE_DEFAULT_ADDRESS,
      addressTypes.EDIT_ADDRESS_REQUEST,
    ])
      switch (action.type) {
        case addressTypes.GET_ADDRESS_REQUEST:
          yield call(address,action.token)
          break
        case addressTypes.DELETE_ADDRESS_REQUEST:
          yield call(deleteAddress,action.id,action.token)
          break
        case addressTypes.SET_DEFAULT_ADDRESS:
            yield call(setDefaultAddress,action.id,action.token,action.consignee,action.consignee_phone,action.consignee_address,action.is_default,action.model)
            break
        case addressTypes.GET_ADDRESS_INFO:
            yield call(getAddressInfo,action.token,action.id)
            break
        case addressTypes.ADD_ADDRESS_REQUEST:
            yield call(addAddress,action.token,action.user,action.phone,action.address,action.is_default)
            break
        case addressTypes.EDIT_ADDRESS_REQUEST:
            yield call(editAddress,action.id,action.token,action.consignee,action.consignee_phone,action.consignee_address,action.is_default,action.model)
            break
      }
    }
  }
  return {
    watcher
  }
}
