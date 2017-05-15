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
import Immutable from 'immutable';
import {connect} from 'react-redux'
import Styles from './Styles/LoginScreenStyle'
import {Images, Metrics} from '../Themes'
import UserActitons from '../Redux/UserRedux'
import LoginActions from '../Redux/LoginRedux'
import GoodsActions from '../Redux/GoodsRedux'
import SceneActions from '../Redux/SceneRedux'

import {Actions as NavigationActions} from 'react-native-router-flux'
import Toast, {DURATION} from 'react-native-easy-toast'

// I18n
import I18n from 'react-native-i18n'

import * as WeChat from 'react-native-wechat';

class LoginScreen extends React.Component {

  // 构造函数
  constructor(props) {
    super(props)
    this.state = {
      visibleHeight: Metrics.screenHeight,
      topLogo: {
        width: Metrics.screenWidth
      }
    }
    this.isAttempting = false
    this.clicked = false
  }

  componentDidMount () {
    this.props.updateScene("login")
  }

  componentWillReceiveProps(nextProps) {
    let {status} = nextProps.startup;
    let {token} = nextProps.user;
    let {access_token} = nextProps.login;

    if (status < 2) {
      return;
    }
    console.info("LoginScreen componentWillReceiveProps");
    // //授权码仍然有效
    // if (token && this.props.user.token == token) {
    //   console.info("授权码仍然有效")
    //   NavigationActions.pop({
    //     refresh: {
    //       duration: 0
    //     }
    //   });
    //   return;
    // }
    //未绑定，则跳转到绑定账户界面
    if (this.props.login.access_token == null && access_token) {
        console.info("未绑定，则跳转到绑定账户界面")
        NavigationActions.reg();
        return;
    }
    //绑定成功
    if (this.props.user.token == null && token) {
      console.info("绑定成功")
      NavigationActions.pop({
        refresh: {
          duration: 0
        }
      });
      return;
    }
  }

  // 登录
  handlePressLogin = () => {
    const {username, password} = this.state
    // 登录校验
    var myreg = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[0-9]{9}|147[0-9]{8}|17[012356789][0-9]{8})$/
    if (!myreg.test(username)) {
      this.refs.toast.show(I18n.t('inputCorrectPhone'))
      return
    } else if (password == '') {
      // Alert.alert(I18n.t('signIn'),I18n.t('inputPassWord'))
      this.refs.toast.show(I18n.t('inputPassWord'))
      return
    }
    this.isAttempting = true

    // attempt a login - a saga is listening to pick it up from here.
    this.props.attemptLogin(username, password)
  }

  // handleChangeUsername = (text) => {
  //   this.setState({username: text})
  // }
  //
  // handleChangePassword = (text) => {
  //   this.setState({password: text})
  // }

  async handleWeChatLogin() {
    var __isInstalled = false;
    await WeChat.isWXAppInstalled().then((isInstalled) => {
      if (isInstalled) {
        __isInstalled = isInstalled;
      }
    });

    if (__isInstalled) {
        await WeChat.sendAuthRequest("snsapi_userinfo", "doors").then((result) => {
          // console.info(result);
          if (result.errCode ==0) {
              this.props.attemptWxLogin(result.code);
          }

        }, (error) => {
          console.info("微信授权登录失败!")
          console.info(error);
        })
    } else {
      console.info("还没有安装微信，请按安装!");
    }
  }

  render() {
    //未启动好
    // let {status} = this.props.startup;
    // if (status < 2) {
    //   return (<View style={{width:Metrics.screenWidth,height: Metrics.screenHeight,backgroundColor:'black'}} />);
    // }
    //等待服务器
    let {fetching} = this.props.login;
    if (fetching) {
      return null;
    }

    var srcWe = Images.weChat1
    var srcSin = Images.sina1
    return (
      <ScrollView contentContainerStyle={{
        justifyContent: 'center'
      }} style={[
        Styles.container, {
          height: this.state.visibleHeight
        }
      ]} keyboardShouldPersistTaps>
        <View style={[
          Styles.content, {
            height: this.state.visibleHeight
          }
        ]}>
          <View style={Styles.logoSwap}>
            <Image source={Images.logoLogin} style={[Styles.topLogo, this.state.topLogo]}/>
          </View>
          <View style={Styles.form}>
            <TouchableHighlight onPress={() => {
              srcWe = Images.weChat2;
              this.handleWeChatLogin();
            }}>
              <Image source={srcWe} style={Styles.btn} href='weChat'/>
            </TouchableHighlight>
            {/* <TouchableHighlight onPress={() => {
              srcSin = Images.sina2
            }}>
              <Image source={srcSin} style={Styles.btn}/>
            </TouchableHighlight> */}
          </View>
        </View>
      </ScrollView>
    )
  }

}

LoginScreen.propTypes = {
  dispatch: PropTypes.func,
  login: PropTypes.object,
  attemptLogin: PropTypes.func,
  attemptWxLogin: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    startup:state.startup,
    user: state.user,
    login: state.login,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
    attemptWxLogin: (code) => dispatch(LoginActions.wxLoginRequest(code)),
    updateScene: (sceneKey) => dispatch(SceneActions.updateScene(sceneKey))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
