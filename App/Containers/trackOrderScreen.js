import React, {PropTypes} from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/trackOrderScreenStyle'
import {Images, Metrics} from '../Themes'
import orderListActions from '../Redux/orderRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Toast, {DURATION} from 'react-native-easy-toast'

// I18n
import I18n from 'react-native-i18n'

class trackOrderScreen extends React.Component {

  // 构造函数
  constructor (props) {
    super(props)
    this.state = {
      visibleHeight: Metrics.screenHeight
    }
  }
  //获得订单详情
  componentWillMount () {
    this.props.attemptGetOrderInfo(this.props.id,this.props.token)
  }

  //操作成功之后
  componentWillReceiveProps(nextProps){

  }

  render () {
    const orderInfo = this.props.order.orderInfo
    if(orderInfo == null || orderInfo == undefined || orderInfo.id != this.props.id){
      return null
    }
    const logistics = orderInfo.logistics
    var index = 0;
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]}>
          <Text style={Styles.orderNumber}>订单号 : {orderInfo.sn}</Text>
          <View style={Styles.listContent}>
          {
              logistics.map((c,i) =>
                  {
                   if(index == 0){
                     index++
                      return (
                        <View style={Styles.eachContent} key={i}>
                          <Image source={Images.dotGreen} style={Styles.locationB}/>
                          <View style={Styles.infoContent}>
                              <View style={Styles.infoInnerContent}>
                                <Text style={[Styles.infoTop,Styles.infoTopHeight,Styles.endText]}>{c.remark}</Text>
                                <Text style={[Styles.infoTop,Styles.infoTime,Styles.endText]}>{c.send_time}</Text>
                              </View>
                          </View>
                        </View>
                      )
                    }
                    else
                    {
                      index++
                      return (
                        <View style={Styles.eachContent} key={i}>
                          <Image source={Images.dot} style={Styles.location}/>
                          <View style={Styles.infoContent}>
                              <View style={Styles.infoInnerContent}>
                                <Text style={[Styles.infoTop,Styles.infoTopHeight]}>{c.remark}</Text>
                                <Text style={[Styles.infoTop,Styles.infoTime]}>{c.send_time}</Text>
                              </View>
                          </View>
                        </View>
                      )
                    }
                  }
              )
          }
          </View>
          {/*<View style={Styles.payBtnContent}>
            <View style={Styles.btnInner}>
              <Image source={Images.service01} style={Styles.linkImg}/>
              <Text style={Styles.payText}>联系管家</Text>
            </View>
          </View>*/}
          <Toast ref='toast' />
      </ScrollView>
    )
  }
}
trackOrderScreen.propTypes = {
  dispatch: PropTypes.func,
  attemptDeleteAddress: PropTypes.func,
  setDefaultAddress: PropTypes.func,
  attemptGetAddress: PropTypes.func
}

const mapStateToProps = state => {
  return {
    token:state.user.token,
    order:state.order
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptGetOrderInfo: (id,token) => dispatch(orderListActions.getOrderInfo(id,token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(trackOrderScreen)
