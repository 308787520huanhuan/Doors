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
import Styles from './Styles/AddAddressScreenStyle'
import {Images, Metrics} from '../Themes'
import addAddressActions from '../Redux/addressRedux'
import LoginActions from '../Redux/LoginRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Toast, {DURATION} from 'react-native-easy-toast'
import CheckBox from 'react-native-checkbox'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const dismissKeyboard = require('dismissKeyboard');
const inputComponents = [];

var radio_props = [
  {label: '否', value: 0 },
  {label: '是', value: 1 }
];

// I18n
import I18n from 'react-native-i18n'

class addAddressScreen extends React.Component {

  // 构造函数
  constructor (props) {
    super(props)
    this.state = {
      consignee_phone: '',
      is_default:0,
      consignee: '',
      address:'',
      visibleHeight: Metrics.screenHeight
    }
  }

  //初始化之前请求数据
  componentWillMount () {
    if(this.props.model=="edit"){
        //如果是第一次编辑当前数据 则请求
        if(this.props.address.addressInfo[this.props.id]==undefined){
            this.props.attemptGetAddressInfo(this.props.token,this.props.id)
        }else{
          //如果已经编辑过了 直接在根state里面取
          let editeInfo = this.props.address.addressInfo[this.props.id]
          const {consignee,consignee_phone,consignee_address,is_default} = editeInfo;
          this.setState({
            consignee,
            is_default,
            consignee_phone,
            consignee_address
          })
        }
    }
  }

  componentWillReceiveProps (newProps) {
    //如果是编辑 先保存数据
    let info = newProps.address.addressInfo[this.props.id];
    if(info != undefined){
      const {consignee,consignee_phone,consignee_address,is_default} = info;
      this.setState({
        consignee,
        is_default,
        consignee_phone,
        consignee_address
      })
    }
    //操作成功 返回上一页
    if(newProps.address.success != null){
      this.refs.toast.show(newProps.address.success)
      NavigationActions.pop();
    }
    //请求失败 停留在当前页面
    if(newProps.address.error != null){
      this.refs.toast.show(newProps.address.error)
    }

  }

  handleChangeUser = (text) => {
    this.setState({
      consignee: text
    })
  }

  handleChangePhone = (text) => {
    this.setState({
      consignee_phone: text
    })
  }

  handleChangeAddress = (text) => {
    this.setState({
      consignee_address: text
    })
  }

  // 保存
  handlePressAdd = () => {
    const { consignee, consignee_phone, consignee_address, is_default} = this.state
    // 登录校验
    var myreg = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[0-9]{9}|147[0-9]{8}|17[012356789][0-9]{8})$/
    if(consignee == ''){
      this.refs.toast.show("请输入收货人")
      return
    }
    if (!myreg.test(consignee_phone)) {
      this.refs.toast.show(I18n.t('inputCorrectPhone'))
      return
    }
     if (consignee_address.length < 4) {
      // Alert.alert(I18n.t('signIn'),I18n.t('inputPassWord'))
      this.refs.toast.show('请输入正确的详细地址')
      return
    }
    //编辑
    if(this.props.model=="edit"){
        this.props.attemptEditAddress(this.props.id,this.props.token,consignee,consignee_phone,consignee_address,is_default,1)
    }
    //添加
    else{
        this.props.attemptAddAddress(this.props.token,consignee,consignee_phone,consignee_address,is_default)
    }
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
    //如果是编辑地址并且还没有得到地址详情
    if(this.props.model=="edit" && this.props.address.addressInfo[this.props.id]== undefined){
        return null
    }
    const { consignee, consignee_phone, consignee_address, is_default} = this.state
    return (
      <View onStartShouldSetResponderCapture={this._onStartShouldSetResponderCapture.bind(this)} contentContainerStyle={{justifyContent: 'center'}} style={{height: this.state.visibleHeight}}>
      <ScrollView keyboardShouldPersistTaps={true} contentContainerStyle={{flex: 1}}>
      <View style={Styles.container}>
        <View style={Styles.eachcontent}>
          <Text style={Styles.labelTex}>收货人:</Text>
          <TextInput
            value={consignee}
            style={Styles.textInputStyle}
            clearButtonMode='always'
            keyboardType='default'
            onChangeText={this.handleChangeUser}
            onSubmitEditing={() => this.refs.phone.focus()}
            onLayout={this._inputOnLayout.bind(this)}
            underlineColorAndroid='transparent'/>
        </View>
        <View style={Styles.eachcontent}>
          <Text style={Styles.labelTex}>手机号码:</Text>
          <TextInput
            ref='phone'
            value={consignee_phone}
            style={Styles.textInputStyle}
            keyboardType='numeric'
            clearButtonMode='always'
            onChangeText={this.handleChangePhone}
            onSubmitEditing={() => this.refs.address.focus()}
            onLayout={this._inputOnLayout.bind(this)}
            underlineColorAndroid='transparent'/>
        </View>
        <View style={Styles.eachcontent}>
          <Text style={Styles.labelTex}>详细地址:</Text>
            <TextInput
              ref='address'
              value={consignee_address}
              style={Styles.textInputStyle}
              placeholder='4~50位字符'
              clearButtonMode='always'
              keyboardType='default'
              maxLength={50}
              onChangeText={this.handleChangeAddress}
              onLayout={this._inputOnLayout.bind(this)}
              underlineColorAndroid='transparent'/>
        </View>
        {/* <View style={Styles.eachcontent}>
          <Text style={Styles.labelTex}>默认地址:</Text>
          <RadioForm
            style={Styles.radioStyle}
            radio_props={radio_props}
            initial={is_default}
            buttonSize={5}
            labelHorizontal={true}
            buttonSize={80}
            // formHorizontal={true}
            // labelStyle={{fontSize: 14, color: '#666'}}
            // buttonColor={'#2196f3'}
            // animation={true}
            onPress={(value) => {this.setState({is_default:value})}}
          />
        </View> */}
      </View>
      <View style={Styles.addBtnTextContent}>
          <TouchableHighlight style={Styles.AddAddress} underlayColor='#ca8b1f' onPress={this.handlePressAdd}>
              <Text style={Styles.addBtnText}>保存</Text>
          </TouchableHighlight>
      </View>
      </ScrollView>
        <Toast ref='toast' />
      </View>
    )
  }
}
addAddressScreen.propTypes = {
  address: PropTypes.object,
  attemptAddAddress: PropTypes.func,
  attemptEditAddress: PropTypes.func,
  attemptGetAddressInfo: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    state:state,
    address: state.address,
    token: state.user.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptAddAddress: (token, consignee, consignee_phone, consignee_address,is_default) => dispatch(addAddressActions.addAddressRequest(token,consignee, consignee_phone, consignee_address,is_default)),
    attemptEditAddress: (id,token,consignee,consignee_phone,consignee_address,is_default,model) => dispatch(addAddressActions.editAddressRequest(id,token,consignee,consignee_phone,consignee_address,is_default,model)),
    attemptGetAddressInfo: (token,id) => dispatch(addAddressActions.getAddressInfo(token,id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(addAddressScreen)
