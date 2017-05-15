import React, {PropTypes} from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Keyboard,
  Alert,
  LayoutAnimation
} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/payScreenStyle'
import {Images, Metrics} from '../Themes'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Toast, {DURATION} from 'react-native-easy-toast'
import orderActions from '../Redux/orderRedux'
import loginActions from '../Redux/LoginRedux'
import UserActions from '../Redux/UserRedux'

// I18n
import I18n from 'react-native-i18n'

class payScreen extends React.Component {

  // 构造函数
  constructor (props) {
    super(props)
    this.state = {
      visibleHeight: Metrics.screenHeight
    }
  }

  handlePressPay = ()=> {
    let {token,d_coin} = this.props;
    let {id,amount_payable,amount_paid} = this.props.order;
    let amount_need_pay = amount_payable-amount_paid;
    if (d_coin < amount_need_pay) {
      Alert.alert(
        '支付',
        'D币余额不足,立即充值？',
        [
          {text: '取消', onPress: () => console.log('Cancel Pressed!')},
          {text: '确定', onPress: () => NavigationActions.recharge()},
        ]
      )
      return;
    }

    this.props.payOrderRequest(id,token,amount_need_pay,(data) => {
        if (data.error_code != null) {
          return;
        }
        this.props.getUserDCoin(token);
        this.props.getOrderInfo(id,token);
    });
  }

  render () {
    const { model } = this.props;
    var text = "",mustPay = "",D = "",warmingText = "";
    if( model == 1){
      //支付订金
      text = "支付订金"
      warmingText = "注：会员等级越高订金支付越少 黄金会员免订金"
    }else{
      //支付尾款
      text = "支付尾款"
    }
    //需要支付的钱
    let {amount_paid,amount_payable} = this.props.order;

    var amount_need_pay = amount_payable - amount_paid;

    //支付定金 最低20%
    if(amount_paid == 0)
    {
      amount_need_pay = amount_need_pay * 0.2;
    }

    return (
      <View contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]}>
        <ScrollView keyboardShouldPersistTaps={false} contentContainerStyle={{flex: 1}}>
          <View style={[Styles.row,Styles.topRow]}>
            <Text style={Styles.btnText}>{text}</Text>
            <Text style={[Styles.btnText,Styles.money]}>{amount_need_pay}</Text>
          </View>
          <View style={[Styles.row,Styles.topRow]}>
            <Text style={Styles.btnText}>D币余额</Text>
            <Text style={Styles.btnText}>{this.props.d_coin}</Text>
          </View>
          <Text style={Styles.warmingText}>{warmingText}</Text>
          <View style={Styles.payBtnContent}>
            <TouchableHighlight style={Styles.payBtn} underlayColor='#ca8b1f' onPress={this.handlePressPay}>
              <Text style={Styles.payText}>确认支付</Text>
            </TouchableHighlight>
          </View>
          <Toast ref='toast' />
        </ScrollView>
      </View>
    )
  }
}
payScreen.propTypes = {
  d_coin:PropTypes.number,
  token:PropTypes.string,
  payOrderRequest: PropTypes.func
}

const mapStateToProps = state => {
  return {
    d_coin:state.user.user.d_coin,
    token:state.user.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDCoin: (token) => dispatch(UserActions.getDCoinRequest(token)),
    getOrderInfo: (id,token) => dispatch(orderActions.getOrderInfo(id,token)),
    payOrderRequest: (id,token,amount,onResult) => dispatch(orderActions.payOrderRequest(id,token,amount,onResult))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(payScreen)
