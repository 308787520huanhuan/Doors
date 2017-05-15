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
import Styles from './Styles/serverScreenStyle'
import {Images, Metrics} from '../Themes'
import DrawerButton from '../Components/DrawerButton'
//import addressActions from '../Redux/addressRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Toast, {DURATION} from 'react-native-easy-toast'


// I18n
import I18n from 'react-native-i18n'

class serverScreen extends React.Component {

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
onlineServer = ()=>{

}
protectIntraduction = ()=>{

}
overseaShoping = ()=>{

}
shopingInfo = ()=>{

}

render () {
  return (
    <View contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]} >
      <ScrollView style={Styles.opList}>
        <DrawerButton text='在线管家' onPress={this.onlineServer} rightIcon='arrowRight'/>
        <DrawerButton text='养护说明' onPress={this.protectIntraduction} rightIcon='arrowRight'/>
        <DrawerButton text='海外购物' onPress={this.overseaShoping}  rightIcon='arrowRight'/>
        <DrawerButton text='购买须知' onPress={this.shopingInfo} rightIcon='arrowRight'/>
      </ScrollView>
    </View>
  )
}
}
serverScreen.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(serverScreen)
