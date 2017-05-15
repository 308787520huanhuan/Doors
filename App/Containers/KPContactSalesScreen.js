import React from 'react'
import {StyleSheet, View, Text, Image, Modal, Switch, TouchableHighlight} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
// Styles
// import styles from './Styles/KPContactSalesScreenStyle'
import OnlineServer from '../Components/OnlineServer'
// import QiYu from 'react-native-qiyu'

// const openSales = function (userId, categoryId, subcategoryId, productId) {
//   var params = {
//     sessionTipTextColor: '#CC00FF',
//     sessionTipTextFontSize: 20,
//     customMessageTextColor: '#CC00FF',
//     serviceMessageTextColor: '#CC00FF',
//     messageTextFontSize: 20,
//     tipMessageTextColor: '#CC00FF',
//     tipMessageTextFontSize: 20,
//     inputTextColor: '#CC00FF',
//     inputTextFontSize: 20,
//     sessionBackgroundImage: 'session_bg',
//     sessionTipBackgroundColor: '#000000',
//     customerHeadImage: 'customer_head',
//     serviceHeadImage: 'service_head',
//     sessionMessageSpacing: 2,
//     showHeadImage: true,
//     showAudioEntry: false,
//     showEmoticonEntry: false,
//     autoShowKeyboard: false
//   }
//   QiYu.setCustomUIConfig(params)

//   console.log('setCustomUIConfig')

//   QiYu.openServiceWindow(
//     {
//       sourceTitle: '网易七鱼ReactNative',
//       sourceUrl: 'http://www.qiyukf.com',
//       sourceCustomInfo: '我是来自自定义的信息',

//       commodityInfoTitle: 'ReactNative商品',
//       commodityInfoDesc: '这是来自网易七鱼ReactNative的商品描述',
//       pictureUrl: 'http://qiyukf.com/res/img/companyLogo/blmn.png',
//       commodityInfoUrl: 'http://www.qiyukf.com',
//       note: '￥1888',
//       show: true,

//       sessionTitle: '网易七鱼'
//     }
//   )
// }

class KPContactSalesScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      animationType: false,
      modalVisible: false,
      transparent: false
    }
  }

  componentDidMount () {
    OnlineServer.open()
  }
  render () {
    // console.error("KPContactSalesScreen()");
    return (
      <View style={styles.container} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 100
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center'
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold'
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center'
  },
  modalButton: {
    marginTop: 10
  }
})

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KPContactSalesScreen)
