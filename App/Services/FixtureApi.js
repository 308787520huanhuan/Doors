export default {
  // Functions return fixtures
  getCity: (city) => {
    // This fixture only supports Boise or else returns toronto
    const boiseData = require('../Fixtures/boise.json')
    const torontoData = require('../Fixtures/toronto.json')
    return {
      ok: true,
      data: city.toLowerCase() === 'boise' ? boiseData : torontoData
    }
  },

  /******************************************************
  *用户登录注册相关API
  *******************************************************/
  // 注册
  register: (invite_code, phone, password, code, terminal) => {
    return {
      'msg': 'register ok'
    }
  },
  // 登录
  login: (user_type = 0, username, password, terminal) => {
    return {
      'token': 'string 会话票据',
      'secret_key': 'string 用户加密key',
      'user': {
        'id': 'string 用户id',
        'user_type': 'string 用户类型',
        'username': 'string 用户名',
        'nickname': 'string 昵称',
        'email': '',
        'phone': 'string 电话',
        'photo': 'string 头像地址',
        'integral': 0
      }
    }
  },
  // 登出
  logout: (token) => {
    return {
      'msg': 'logout'
    }
  },
  // 检查电话号码
  checkPhoneNumber: (phoneNumber) => {
    return {
      'result': 0
    }
  },
  // 发送短信
  sendSMS: (phone) => {
    return {
      'msg': 'send_ok'
    }
  },
  // 重置密码
  resetPassword: (phone, code, new_password, terminal) => {
    return {
      'msg': 'change ok'
    }
  },
  /******************************************************
  *用户设置相关API
  *******************************************************/
  // 修改密码
  modifyPassword: (token, old_password, new_password) => {
    return {
      'msg': 'change ok'
    }
  },
  // 修改昵称
  modifyNickName: (token, nickname) => {
    return {
      'msg': 'change ok'
    }
  },
  // 修改手机
  modifyPhone: (token, phone, code) => {
    return {
      'msg': 'change ok'
    }
  },
  // 修改头像
  modifyProfile: (token, photo) => {
    return {
      'msg': 'change ok'
    }
  },
  /******************************************************
  *商品相关API
  *******************************************************/
  // 首页
  getGoodsClass: (terminal) => {
    return {
      'class_list': [
        {
          'id': 'string 分类id',
          'name': 'string 分类名称',
          'items': [  // 子类列表
            {
              'id': 'string 分类id',
              'name': 'string 分类名称',
              'icon': 'string 分类图片地址'
            }

          ]
        }

      ]
    }
  },
  // 商品列表
  getGoodsList: (class_id, key, page, page_size) => {
    return {
      'page': 'int 当前页码',
      'pages': 'int 页总数',
      'counts': 'int 商品总数',
      'rows': [
        {
          'id': 'string 商品id',
          'name': 'string 商品名称',
          'icon': 'String 商品图片地址'
        }
      ]
    }
  },
  // 商品信息
  getGoodsInfo: (goods_id) => {
    return {
      'id': 'string 商品id',
      'name': 'string 商品名称',
      'images': [],
      'description': 'string 描述',
      'status': 1
    }
  }
}
