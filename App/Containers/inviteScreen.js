import React, {PropTypes} from 'react'
import {
  View,
  ScrollView,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/inviteScreenStyle'
import {Images, Metrics} from '../Themes'
//import addressActions from '../Redux/addressRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Toast, {DURATION} from 'react-native-easy-toast'


// I18n
import I18n from 'react-native-i18n'

class inviteScreen extends React.Component {

  // 构造函数
  constructor (props) {
    super(props)
    this.state = {
      visibleHeight: Metrics.screenHeight,
      show:false
    }
  }
  // 更改
componentWillReceiveProps(nextProps){
  this.setState({
    show:nextProps.show,
  });
}

// 显示/隐藏 modal
_setModalVisible() {
  let isShow = this.state.show;
  this.setState({
    show:!isShow,
  });
}

  render () {
    return (
      <View contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]} >
        <View style={Styles.topPart}>
          <Image source={Images.logo} style={Styles.codeImg}/>
          <Text style={Styles.codeText}>分享您的推荐码</Text>
        </View>
        <Text style={Styles.inviteCode}>LBKAD</Text>
        <View style={Styles.bottomPart}>
          <Text style={Styles.bottomInfo}>为好友提供注册机会，他也会得到注册D币100.00的奖励</Text>
          <Text style={Styles.bottomInfo}>同时您也将得到50D币和等级提升奖励</Text>
        </View>
        <Modal
          animationType='fade'
          transparent={true}
          visible={this.state.show}
          onShow={() => {}}
          onRequestClose={() => {}} >
          <View style={[Styles.modalStyle,Styles.modalStyle0]}>
          </View>
          <View style={Styles.modalStyle}>
            <View style={Styles.subView}>
              <View style={Styles.topView}>
                <View style={Styles.eachView}>
                  <Image source={Images.wx} style={Styles.shareWay}/>
                  <Text style={Styles.shareWayText}>微信好友</Text>
                </View>
                <View style={Styles.eachView}>
                  <Image source={Images.weChat} style={Styles.shareWay}/>
                  <Text style={Styles.shareWayText}>微信朋友圈</Text>
                </View>
                <View style={Styles.eachView}>
                  <Image source={Images.sina} style={Styles.shareWay}/>
                  <Text style={Styles.shareWayText}>微  博</Text>
                </View>

              </View>
              <View style={Styles.buttonView}>
                <TouchableHighlight underlayColor='transparent'
                  style={Styles.buttonStyle}
                  onPress={this._setModalVisible.bind(this)}>
                  <Text style={Styles.buttonText}>
                    取消
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
       </Modal>
      </View>
     );
  }
}
inviteScreen.propTypes = {
  dispatch: PropTypes.func,
  //attemptDeleteAddress: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    token:state.user.token,
    address:state.address
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //attemptGetAddress: (token) => dispatch(addressActions.getAddressRequest(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(inviteScreen)
