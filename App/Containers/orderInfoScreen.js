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
import Styles from './Styles/orderInfoScreenStyle'
import {Images, Metrics} from '../Themes'
import orderListActions from '../Redux/orderRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Toast, {DURATION} from 'react-native-easy-toast'

// I18n
import I18n from 'react-native-i18n'

class orderInfoScreen extends React.Component {

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
    if(nextProps.order.success != null){
      this.refs.toast.show(nextProps.order.success)
      // this.props.attemptGetOrderInfo(this.props.id,this.props.token)
    }
  }

  // 确认收货
  handlerRecevied(id){
    console.info(id)
    Alert.alert(
      '订单列表',
      '确定已经收到该商品？',
      [
        {text: '取消', onPress: () => console.log('Cancel Pressed!')},
        {text: '确定', onPress: () => this.props.attemptConfirmReceived(id,this.props.token)},
      ]
    )
  }
  render () {
    const orderInfo = this.props.order.orderInfo
    if(orderInfo == null || orderInfo == undefined || orderInfo.id != this.props.id){
      return null
    }
    //(0已取消、1待付款、2待发货、3已发货、4完成）
    var status,operate;
    var payText = "",payType="";
    //订单追踪按钮
    var track = <TouchableHighlight style={Styles.opeBtn} onPress={()=>NavigationActions.trackOrderScreen({id: orderInfo.id})}>
                    <Text style={Styles.btnText}>订单追踪</Text>
                </TouchableHighlight>
    switch (orderInfo.order_status) {
      case 0:
        status = '已取消';
        break;
      case 1:
        //还未支付订金
        if(orderInfo.amount_paid == 0){
            status = '待付订金'
            payText = "支付订金"
            payType = 1
            operate = <View style={Styles.operateRow}>
                        {track}
                    </View>
        }else{
          status = '待结尾款'
          payType = 2
          payText = "支付尾款"
        }
        operate = <View style={Styles.operateRow}>
                  {track}
                  <TouchableHighlight style={[Styles.opeBtn,Styles.btnColor]} onPress={()=>NavigationActions.payScreen({order: orderInfo,model:payType})}>
                      <Text style={[Styles.btnText,Styles.textColor]}>{payText}</Text>
                  </TouchableHighlight>
                </View>
        break;
      case 2:
      case 3:
        status = '待收货'
        operate = <View style={Styles.operateRow}>
                    {track}
                    <TouchableHighlight style={[Styles.opeBtn,Styles.btnColor]} onPress={()=>this.handlerRecevied(orderInfo.id)}>
                        <Text style={[Styles.btnText,Styles.textColor]}>确认收货</Text>
                    </TouchableHighlight>
                </View>
        break;
      case 4:
        status = '已完成'
        operate = <View style={Styles.operateRow}>
                  {track}
                  <TouchableHighlight style={[Styles.opeBtn,Styles.btnColor]}>
                      <Text style={[Styles.btnText,Styles.textColor]}>再次购买</Text>
                  </TouchableHighlight>
                </View>
        break;
    }

    return (
      <View contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]}>
          <ScrollView>
            <View style={Styles.orderNumberContent}>
                <Text style={Styles.orderNumber}>订单号 : {orderInfo.sn}</Text>
                <Text style={Styles.red}>{status}</Text>
            </View>
            <View style={Styles.locationContent}>
                <Image source={Images.locationS} style={Styles.linkImg}/>
                <View style={Styles.locationInfoContent}>
                  <View style={Styles.userPhoneContent}>
                    <Text style={Styles.userPhone}>{orderInfo.consignee.name}</Text>
                    <Text style={[Styles.userPhone,Styles.phoneText]}>{orderInfo.consignee.phone}</Text>
                  </View>
                   <Text style={Styles.addressDetail}>{orderInfo.consignee.address}</Text>
                </View>
            </View>
            <View style={Styles.goodsContent}>
              <View style={Styles.logoContent}>
                  <Text style={Styles.logoText}>Doors</Text>
              </View>
              <View style={Styles.goodsInfoContent}>
                  <Image source={{url:orderInfo.goods.image}} style={Styles.goodsImg}/>
                  <View style={Styles.goodsInfoTextContent}>
                    <Text style={Styles.goodsTitle}>{orderInfo.goods.name}</Text>
                    <View style={Styles.subInfo}>
                      <Text style={Styles.goodsNum}>
                        数量：&nbsp;{orderInfo.goods.quantity}
                      </Text>
                      <Text style={Styles.goodsNum}>¥{orderInfo.goods.price}.00</Text>
                    </View>
                  </View>
              </View>
              {/*<View style={Styles.payBtnContent}>
                <View style={Styles.btnInner}>
                  <Image source={Images.service02} style={Styles.linkImg}/>
                  <Text style={Styles.payText}>联系管家</Text>
                </View>
              </View>*/}
            </View>
            <View style={Styles.payTypeContent}>
              <View style={[Styles.betweenContent,Styles.borderBottom]}>
                <Text style={Styles.gray}>支付方式</Text>
                <Text>在线支付</Text>
              </View>
              <View style={Styles.betweenContent}>
                <Text style={Styles.gray}>发票信息</Text>
                <Text>电子发票</Text>
              </View>
              <View style={Styles.invoiceContent}>
                <Text style={Styles.invoiceText}>发票抬头：个人</Text>
                <Text style={Styles.invoiceText}>发票内容：明细</Text>
              </View>
            </View>
            <View style={Styles.payTypeContent}>
              <View style={Styles.betweenContent}>
                <Text>商品总额</Text>
                <Text style={Styles.red}>¥{orderInfo.amount_payable}.00</Text>
              </View>
              <View style={[Styles.betweenContent,Styles.height30]}>
                <Text style={Styles.invoiceText}>优惠金额</Text>
                <Text style={Styles.red}>¥0.00</Text>
              </View>
              <View style={[Styles.betweenContent,Styles.borderBottom,Styles.height30]}>
                <Text style={Styles.invoiceText}>运费</Text>
                <Text style={Styles.red}>¥0.00</Text>
              </View>
              <View style={Styles.betweenContent}>
                <Text>实付款：</Text>
                <Text style={[Styles.red,Styles.fontSize18]}>¥{orderInfo.amount_paid}.00</Text>
              </View>
              <View style={[Styles.betweenContent,Styles.invoiceContent,Styles.height30]}>
                <Text style={Styles.invoiceText}>下单时间：</Text>
                <Text style={Styles.invoiceText}>{orderInfo.add_time}</Text>
              </View>
            </View>
          </ScrollView>
          <View style={Styles.operateRow}>
            {operate}
          </View>
          <Toast ref='toast' />
      </View>
    )
  }
}
orderInfoScreen.propTypes = {
  dispatch: PropTypes.func,
  attemptConfirmReceived: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    token:state.user.token,
    order:state.order
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptGetOrderInfo: (id,token) => dispatch(orderListActions.getOrderInfo(id,token)),
    attemptConfirmReceived: (id,token) => dispatch(orderListActions.confirmReceived(id,token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(orderInfoScreen)
