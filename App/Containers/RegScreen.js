import React, {PropTypes} from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
  Keyboard,
  Alert,
  LayoutAnimation
} from 'react-native'
import { connect } from 'react-redux'
import Button from 'apsl-react-native-button'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Toast, {DURATION} from 'react-native-easy-toast'
import { Hoshi } from 'react-native-textinput-effects';
// I18n
import I18n from 'react-native-i18n'
import Styles from './Styles/RegScreenStyle'
import {Images, Metrics, Colors} from '../Themes'
import RegActions from '../Redux/RegRedux'
import LoginActions from '../Redux/LoginRedux'
import SceneActions from '../Redux/SceneRedux'

const timer = require('react-native-timer');
class RegScreen extends React.Component {

  // 构造函数
  constructor (props) {
    super(props)
    this.state = {
      phone: '',
      verification: '',
      invitation:'',
      step:1,
      isCD:false,
      cdDefaultValue:0,
      visibleHeight: Metrics.screenHeight,
    }
  }

  //监听键盘
  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()

    timer.clearInterval(this,'cdInterval');
  }

  componentDidMount () {
      this.props.updateScene("reg")
  }

  //注册成功后 跳转界面
  componentWillReceiveProps(nextProps) {
    let {token, isbinduser} = nextProps.user;
    let {phone, step, error} = nextProps.reg;
    let {openid, access_token} = this.props.login;
    if (error && error.length > 0) {
      this.refs.toast.show(error)
    }
    console.info("RegScreen componentWillReceiveProps!")
    //绑定成功
    if (token && isbinduser) {
      console.info("绑定成功!")
      NavigationActions.pop({
        popNum:2,
        refresh: {
          duration: 0
        }
      });
      return;
    }

    if (this.props.reg.step != step) {
      this.refs.input.clear();
      this.refs.input.blur();

      // this.handleChangeinput("",nextStep);
      if (step == 2) {
        this.startVerificationCD();
      } else if (step == 4) {
        this.props.attemptBindPhone(openid, access_token, phone, 1);
      }
    }
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    // let newSize = Metrics.screenHeight - e.endCoordinates.height
    // this.setState({
    //   visibleHeight: newSize
    // })
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    // this.setState({
    //   visibleHeight: Metrics.screenHeight
    // })
  }

  startVerificationCD() {
    if (this.state.isCD)
      return;

    timer.clearInterval(this,'cdInterval');

    let cd = 60;
    this.setState({isCD:true,cdValue:cd})


    timer.setInterval(this,"cdInterval",() => {
      if (this.state.cdValue == 0) {
          timer.clearInterval(this, "cdInterval");
          this.setState({isCD:false})
      } else {
        this.setState({cdValue:this.state.cdValue-1})
      }
    },1000)
  }

  handleResetVerification = () => {
      let {phone} = this.state;
      this.startVerificationCD();
      //请求 发送验证码
      this.props.attemptGetVerCode(phone)
  }
  //
  // handlePressLogin = () => {
  //   const { username, password } = this.state
  //   // 登录校验
  //   var myreg = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[0-9]{9}|147[0-9]{8}|17[012356789][0-9]{8})$/
  //   if (!myreg.test(username)) {
  //     this.refs.toast.show(I18n.t('inputCorrectPhone'))
  //     return
  //   } else if (password == '') {
  //     // Alert.alert(I18n.t('signIn'),I18n.t('inputPassWord'))
  //     this.refs.toast.show(I18n.t('inputPassWord'))
  //     return
  //   }
  //   // attempt a login - a saga is listening to pick it up from here.
  //   this.props.attemptLogin(username, password)
  // }
  //输入之后先保存再判断
  handleChangeinput = (text,step) => {
    const stepValue = step || this.props.reg.step;
    switch (stepValue) {
      case 1:
        this.setState({ phone: text})
        break;
      case 2:
        this.setState({ verification: text})
        break;
      case 3:
        this.setState({ invitation: text})
        break;
      default:
    }
  }
  //点击下一步
  handleNextStep = () => {
    const { fetching, step } = this.props.reg
    if (fetching) {
      return;
    }

    const { phone,verification,invitation } = this.state
    switch (step) {
      //第一步 绑定手机
      case 1:
        // 验证手机号
        var myreg = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[0-9]{9}|147[0-9]{8}|17[012356789][0-9]{8})$/
        if (!myreg.test(phone)) {
          this.refs.toast.show("请输入正确的手机号！")
        } else {
          //请求 发送验证码
          this.props.attemptGetVerCode(phone)
        }
        break;
      //第二步 验证验证码是否正确（如果输入的验证码是正确的
      //那么后台需要判断该手机号是否已经被绑定过 如果没被绑定过 则继续下一步
      //如果已经绑定过判断是否是绑定的自己的账号 如果是自己的账号 则跳转到首页 如果不是自己的账号 则错误提示）
      case 2:
        if(!verification || verification.length == 0){
          this.refs.toast.show("验证码不能为空!")
        }else{
          this.props.attemptCheckVerCode(phone,verification)
        }
        break;
      case 3:
        if(!invitation || invitation.length == 0){
          this.refs.toast.show("邀请码不能为空!")
        }else{
          this.props.attemptCheckInviCode(invitation)
        }
        break;
      default:
    }

  }

  renderHoshi (label,maxLength) {
    return (
      <Hoshi
            ref='input'
           containerStyle={Styles.input}
           label={label}
           // this is used as active border color
           borderColor={Colors.golden}
           // this is used to set backgroundColor of label mask.
           // please pass the backgroundColor of your TextInput container.
           labelStyle={{
            //  color: Colors.golden,
            fontSize: 12,
            lineHeight:30,
            left:-16,
            bottom:-2
           }}
           inputStyle={{
            //  color: 'white',
            fontSize: 12,
            lineHeight:30,
            left:0,
            bottom:-8,
           }}
           keyboardType="numeric"
           maxLength={maxLength}
          //  blurOnSubmit={true}
           selectTextOnFocus={true}
           onChangeText={this.handleChangeinput}
           >
        </Hoshi>
    )
  }
  renderStep1() {
    const { error , fetching} = this.props.reg
    const { phone,verification,invitation } = this.state
    const disabled = phone && phone.length > 0 ?false:true;
    return (
      <View style={Styles.row}>
          {this.renderHoshi('输入手机号',15)}
          <Button onPress={this.handleNextStep} isDisabled={disabled || fetching} style={[Styles.regBtn,{backgroundColor: disabled?Colors.gray:Colors.golden}]} textStyle={Styles.btnText}>
            {fetching?'验证中...':'获取验证码'}
          </Button>
      </View>
    )
  }

  renderStep2() {
      const {verification, cdValue,isCD } = this.state;
      const { error , fetching} = this.props.reg;
      const disabled = verification && verification.length > 0 ?false:true;
      return (
          <View style={[Styles.row]}>
              {this.renderHoshi('输入验证码',4)}
              {
                  isCD ?
                      (<View style={[Styles.cd,{alignSelf:'flex-end'}]}>
                        <Text style={Styles.btnText}>{'倒计时'+cdValue+'秒'}</Text>
                      </View>
                    ):
                      (
                        <TouchableHighlight onPress={this.handleResetVerification}>
                          <View style={[Styles.cd,{alignSelf:'flex-end'}]}>
                            <Text style={Styles.btnText}>{'重取验证码'}</Text>
                          </View>
                        </TouchableHighlight>
                      )
            }
            <Button onPress={this.handleNextStep} isDisabled={disabled || fetching} style={[Styles.regBtn,{backgroundColor: disabled?Colors.gray:Colors.golden}]} textStyle={Styles.btnText}>
              {fetching?'验证中...':'下一步'}
            </Button>
      </View>
    )
  }

  renderStep3() {
    const { error , fetching} = this.props.reg;
    const { phone,verification,invitation } = this.state
    const disabled = invitation && invitation.length > 0 ?false:true;
    return (
      <View style={Styles.row}>
          {this.renderHoshi('输入邀请码',6)}
          <Button onPress={this.handleNextStep} isDisabled={disabled || fetching} style={[Styles.regBtn,{backgroundColor: disabled?Colors.gray:Colors.golden}]} textStyle={Styles.btnText}>
            {'完成'}
          </Button>
          <View style={Styles.row}>
             <Text style={Styles.step3Warn}>{'注：一个邀请码只能注册一个手机号'}</Text>
          </View>
      </View>
  )
  }

  render () {
    const { error,step } = this.props.reg
    const { phone,verification,invitation } = this.state
    //重新获得验证码的按钮
    var valStyle = step == 2 ? [Styles.regBtn,Styles.valBtn] : [Styles.regBtn,Styles.valBtn,Styles.valBtnNone]
    return (
      // <ScrollView style={{marginTop: Metrics.navBarHeight}} scrollEnabled={false} keyboardShouldPersistTaps={false} keyboardDismissMode={'interactive'}>

      <View style={{marginTop: Metrics.navBarHeight}} >
        <TouchableWithoutFeedback onPress = {() => this.refs.input.blur()}>
          <View contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps>
            {step == 1 ? this.renderStep1():(step == 2 ? this.renderStep2():this.renderStep3())}
          </View>
          </TouchableWithoutFeedback>
          <Toast ref='toast' textStyle={{color:'#ffffff'}}  position="top" positionValue={180}/>
      </View>

      // </ScrollView>
    )
  }
}
RegScreen.propTypes = {
  dispatch: PropTypes.func,
  reg: PropTypes.object,
  login: PropTypes.object,
  attemptGetVerCode: PropTypes.func,
  attemptCheckVerCode:PropTypes.func,
  attemptCheckInviCode:PropTypes.func
}

const mapStateToProps = state => {
  return {
    user:state.user,
    reg:state.reg,
    login:state.login,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptGetVerCode: (phone) => dispatch(RegActions.getVerCodeRequest(phone)),
    attemptCheckVerCode: (phone,verification) => dispatch(RegActions.checkVerCodeRequest(phone,verification)),
    attemptCheckInviCode: (invitation) => dispatch(RegActions.checkInviCodeRequest(invitation)),
    attemptBindPhone: (openid,access_token,phone,terminal) => dispatch(LoginActions.wxBindRequest(openid,access_token,phone,terminal)),
    updateScene: (sceneKey) => dispatch(SceneActions.updateScene(sceneKey))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegScreen)
