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
import Styles from './Styles/rechargeScreenStyle'
import {Images, Metrics} from '../Themes'
//import addressActions from '../Redux/addressRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Toast, {DURATION} from 'react-native-easy-toast'
var Spinner = require('react-native-spinkit');

import UserActions from '../Redux/UserRedux'
import collectActions from '../Redux/collectRedux'
import { createPayment } from 'react-native-pingpp'
// I18n
import I18n from 'react-native-i18n'

const dismissKeyboard = require('dismissKeyboard');
const inputComponents = [];

class rechargeScreen extends React.Component {

  // 构造函数
  constructor (props) {
    super(props)
    this.state = {
      visibleHeight: Metrics.screenHeight,
      visibleWidth: Metrics.screenWidth,
      spinVisible: false,
      sum:0,
    }
  }
  //获得收货地址列表
  componentWillMount () {
    //this.props.attemptGetAddress(this.props.token)
  }

  //操作成功之后
  componentWillReceiveProps(nextProps) {
    const {fething} = this.props.collect;
    if (fething != nextProps.collect.fetching) {
      this.setState({'spinVisible':nextProps.collect.fetching});
    }
  }
  handleChangeinput = (text) => {
    this.setState({sum:Number(text)})
  }
  handleBlur = () => {
    console.warn("hanbleBlur")
  }
  attemptWechatRecharge () {
    if(this.state.sum == 0){
      this.refs.toast.show("请输入充值金额")
      return;
    }

    this.props.rechargeRequest(this.props.token,'wx',this.state.sum,(data) => {
      if (data.error_code) {
        return;
      }
      var params = {
          charge: data.charge,
          scheme: "wx9bad1f88af42183a"
      };

      createPayment(params.charge,params.scheme,(err, ret) => {
        console.info("+++++++++++++++++++++++++++++++++")
        console.info(ret);
        console.info(err);
        if (ret == 'success') {
            this.props.getUserDCoin(this.props.token);
        }
      });
    });
  }
  _onStartShouldSetResponderCapture (event) {
     let target = event.nativeEvent.target;
     if(!inputComponents.includes(target)) {
         dismissKeyboard();
     }
     return false;
  }
  _inputOnLayout(event) {
    inputComponents.push(event.nativeEvent.target);
  }
  render () {
    return (
      <View onStartShouldSetResponderCapture={this._onStartShouldSetResponderCapture.bind(this)} contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]} >
        <View style={Styles.spinnerContent}>
          <Spinner isVisible={this.state.spinVisible} size={37} type={'Circle'} color={'#000000'} style={Styles.spinner}/>
        </View>

        <View  style={Styles.topPart}>
        <TextInput
          ref='input'
          placeholder="输入充值金额"
          placehol
          placeholderTextColor="gray"
          style={Styles.input}
          keyboardType='numeric'
          returnKeyType='next'
          onChangeText={this.handleChangeinput}
          underlineColorAndroid='transparent'
          onLayout={this._inputOnLayout.bind(this)}
           />
          <View style={Styles.operatContent}>
            <Text style={[Styles.gray,{textAlign:'auto'}]}>支付方式</Text>
            <View style={[Styles.payWaysContent,Styles.marginTop]}>
              <TouchableHighlight onPress={() => this.attemptWechatRecharge()} underlayColor="#fff">
                <View style={Styles.eachWay}>
                  <Image source={Images.wx} style={Styles.payWaysIcon}/>
                  <Text style={{color:'#333'}}>微信支付</Text>
                </View>
              </TouchableHighlight>
            </View>
            {/* <View style={Styles.payWaysContent}>
              <TouchableHighlight onPress={() => NavigationActions.pop()}>
                <View style={Styles.eachWay}>
                  <Image source={Images.message} style={Styles.payWaysIcon}/>
                  <Text style={Styles.gray}>支付宝支付</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={Styles.payWaysContent}>
              <TouchableHighlight onPress={() => NavigationActions.pop()}>
                <View style={Styles.eachWay}>
                  <Image source={Images.message} style={Styles.payWaysIcon}/>
                  <Text style={Styles.gray}>信用卡支付</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={Styles.payWaysContent}>
              <TouchableHighlight onPress={() => NavigationActions.pop()}>
                <View style={Styles.eachWay}>
                  <Image source={Images.message} style={Styles.payWaysIcon}/>
                  <Text style={Styles.gray}>银联卡支付</Text>
                </View>
              </TouchableHighlight>
            </View> */}
          </View>
        </View>
        <Toast ref='toast' />
      </View>
    )
  }
}
rechargeScreen.propTypes = {
  dispatch: PropTypes.func,
  //attemptDeleteAddress: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    token:state.user.token,
    collect:state.collect
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //attemptGetAddress: (token) => dispatch(addressActions.getAddressRequest(token))
    getUserDCoin: (token) => dispatch(UserActions.getDCoinRequest(token)),
    rechargeRequest: (token,channel,amount,onResult) => dispatch(collectActions.rechargeRequest(token,channel,amount,onResult))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(rechargeScreen)
