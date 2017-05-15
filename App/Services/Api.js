// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'http://114.215.137.189:8001/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // Force OpenWeather API Key on all requests
  api.addRequestTransform(request => {
    if (request.params) {
      request.params['APPID'] = '0e44183e8d1018fc92eb3307d885379c'
    }
    if (request.data) {
      request.data['APPID'] = '0e44183e8d1018fc92eb3307d885379c'
    }
  })

  // Wrap api's addMonitor to allow the calling code to attach
  // additional monitors in the future.  But only in __DEV__ and only
  // if we've attached Reactotron to console (it isn't during unit tests).
  if (__DEV__ && console.tron) {
    console.tron.log('Hello, I\'m an example of how to log via Reactotron.')
    api.addMonitor(console.tron.apisauce)
  }

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getCity = (city) => api.get('weather', {q: city})
  /******************************************************
  *用户登录注册相关API
  *******************************************************/
  // 注册
  const register = (invite_code, phone, password, code, terminal) => api.post('v1/users', {invite_code, phone, password, code, terminal})
  //注册发送验证码
  const getVerCodeRequest = (phone) => api.post('v1/users/send/sms', {phone})
  // 登录
  const login = (username, password, terminal = 1, is_manager = 0) => api.post('v1/users/login', {is_manager, username, password, terminal})
  // 登出

  // 微信登录
  const wxLogin = (code,terminal = 1,source = 'WEI_XIN') => api.post('v1/users/third/authorization/login', {code, terminal, source})

  // 微信绑定
  const wxBind = (openid, access_token, phone, terminal = 1, source = 'WEI_XIN') => api.post('v1/users/third/authorization/bind', {openid, access_token, phone, terminal, source})

  const logout = (token) => api.post('v1/users/logout', {token})
  // 检查电话号码
  const checkPhoneNumber = (phoneNumber) => api.get('v1/users/check/' + phoneNumber)
  // 发送短信
  const sendSMS = (phone) => api.post('v1/users/send/sms/' + phone)
  // 重置密码
  const resetPassword = (phone, code, new_password, terminal) => api.put('v1/users/password/' + phone, {code, new_password, terminal})
  /******************************************************
  *用户设置相关API
  *******************************************************/
  // 修改密码
  const modifyPassword = (token, old_password, new_password) => api.put('v1/users/change/password', {token, old_password, new_password})
  // 修改昵称
  const modifyNickName = (token, nickname) => api.put('v1/users/change/nickname', {token, nickname})
  // 修改手机
  const modifyPhone = (token, phone, code) => api.put('v1/users/change/phone', {token, phone, code})
  // 修改头像
  const modifyProfile = (token, photo) => api.put('v1/users/change/photo', {token, photo})
  /******************************************************
  *收货地址相关API
  *******************************************************/
  const addressList = (token) => api.get('v1/users/consignees', {token})
  const addAddress = (token,consignee,consignee_phone,consignee_address,is_default,consignee_area_id = 1) => api.post('v1/users/consignee', {token,consignee,consignee_phone,consignee_address,is_default,consignee_area_id})
  const deleteAddress = (id,token) => api.delete('v1/users/consignee/'+ id, {token})
  const getAddressInfo = (id,token) => api.get('v1/users/consignee/'+ id, {token})
  const changeAddress = (id,token,consignee,consignee_phone,consignee_address,is_default,type) => api.put('v1/users/consignee/'+ id, {token,consignee,consignee_phone,consignee_address,is_default,type})

  /******************************************************
  *订单相关API
  *******************************************************/
  const orderList = (token,order_status = 0,page = 1, page_size = 10) => api.get('/v1/users/orders', {token,order_status,page,page_size})
  const orderInfo = (id,token) => api.get('/v1/users/order/'+id, {token})
  //v1/users/order/{order_id}/pay
  const payOrder = (id,token,amount) => api.put('v1/users/order/'+id+'/pay',{token,amount})
  const cancelOrder = (id,token) => api.put('v1/users/order/'+id+'/cancel',{token});
  const confirmReceived = (id,token) => api.put('/v1/users/order/'+id+'/receipt', {token})

  /******************************************************
  *关注相关API
  *******************************************************/
  const collectList = (token,page = 1, page_size = 10) => api.get('/v1/users/favorites', {token,page,page_size})
  const addCollect = (token,goods_id) => api.post('v1/users/favorite/'+goods_id,{token});
  const deleteCollect = (token,goods_ids) => api.delete("v1/users/favorites", {token, goods_ids});
  /******************************************************
  *钱包相关API
  *******************************************************/
  const walletList = (token) => api.get('/v1/users/transaction/record', {token})
  const walletInfo = (token) => api.get('/v1/users/coin', {token})
  const getUserDCoin = (token) => api.get('v1/users/coin', {token})

  /******************************************************
  *商品相关API
  *******************************************************/
  // 首页
  const getGoodsClass = (token, terminal) => api.get('v1/home', {token, terminal})
  // 商品列表
  const getGoodsList = (token, class_id = 0, key = '', page = 1, page_size = 2000) => api.get('v1/goods', {token, class_id, key, page, page_size})
  //搜索商品
  const searcGoods = (key,token) => api.get('v1/goods', {key,token})
  // 商品信息
  const getGoodsInfo = (token,goods_id) => api.get('v1/goods/' + goods_id,{token})
  //获得第三级分类列表
  const getSubClass = (token, class_id = 0) => api.get('v1/goods/class/'+class_id+'/children', {token})

  /******************************************************
  *支付相关API
  *******************************************************/
  const recharge = (token,channel,amount) => api.post('v1/users/coin/recharge',{token,channel,amount});

  /******************************************************
  *搜索相关API
  *******************************************************/
  const getHot = (token) => api.get('v1/goods/search/hot',{token});
  const getHistory = (token) => api.get('v1/goods/search/log',{token});
  //删除搜索记录
  const deleteLog = (token,type,key = " ") => api.delete('v1/goods/search/log', {token,type,key})
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getCity,
    orderList,
    orderInfo,
    payOrder,
    cancelOrder,
    collectList,
    addCollect,
    deleteCollect,
    walletList,
    walletInfo,
    confirmReceived,
    getSubClass,
    register,
    getVerCodeRequest,
    login,
    logout,
    wxLogin,
    wxBind,
    checkPhoneNumber,
    sendSMS,
    resetPassword,
    modifyPassword,
    modifyNickName,
    modifyPhone,
    modifyProfile,
    addressList,
    addAddress,
    changeAddress,
    getAddressInfo,
    deleteAddress,
    getGoodsClass,
    getGoodsList,
    getGoodsInfo,
    getUserDCoin,
    recharge,
    getHot,
    getHistory,
    searcGoods,
    deleteLog
  }
}

// let's return back our create method as the default.
export default {
  create
}
