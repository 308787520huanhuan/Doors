import React, { Component,PropTypes } from 'react'
import { View, Image, Text, BackAndroid,ScrollView } from 'react-native'
import styles from './Styles/DrawerContentStyle'
import { Images,Metrics } from '../Themes'
import { connect } from 'react-redux'
import DrawerButton from '../Components/DrawerButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

class DrawerContent extends Component {
  // 构造函数
  constructor (props) {
    super(props)
    this.state = {
      visibleHeight: Metrics.screenHeight
    }
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.context.drawer.props.open) {
        this.toggleDrawer()
        return true
      }
      return false
    })
  }

  toggleDrawer () {
    this.context.drawer.toggle()
  }
  handlePressOrder = () => {
    this.toggleDrawer()
    NavigationActions.orderList()
  }
  //收货地址
  handlePressAddress = () => {
    this.toggleDrawer()
    NavigationActions.address()
  }

  //收货地址
  handlePressServer = () => {
    this.toggleDrawer()
    NavigationActions.server()
  }

  //邀请
  handlePressIvite = () => {
    this.toggleDrawer()
    NavigationActions.invite({show:false})
  }


  //我的D币
  handlePressWallet = () => {
    this.toggleDrawer()
    NavigationActions.wallet()
  }


  //我的关注
  handlePressCollect = () => {
    this.toggleDrawer()
    NavigationActions.collect()
  }

  render () {
    const { user } = this.props;
    return (
      <View contentContainerStyle={{justifyContent: 'center'}} style={[styles.container, {height: this.state.visibleHeight}]} >
        {/* <View style={styles.topPart}>
          <Text style={styles.pageTitle}></Text>
        </View> */}
        <View style={styles.userInfo}>
          <Image source={{uri: user.photo}} style={styles.logo} />
          <Text style={styles.infoText}>{user.nickname}</Text>
          <View style={styles.level}>
            <Image source={Images.userLevel1} style={styles.userLevel1} />
            <Text style={styles.levelText}>金牌会员</Text>
          </View>
        </View>

        <ScrollView style={styles.opList}>
          {/*<View style={{height:1,backgroundColor:'#1a1a1a',marginLeft:2}}></View>*/}
          <DrawerButton text='我的订单' onPress={this.handlePressOrder} leftImg='order' rightIcon='arrowRight' topLine='yes'/>
          <DrawerButton text='我的关注' onPress={this.handlePressCollect} leftImg='collection1' rightIcon='arrowRight'/>
          <DrawerButton text='我的钱包' onPress={this.handlePressWallet} leftImg='pay' rightIcon='arrowRight'/>
          <DrawerButton text='地址管理' onPress={this.handlePressAddress} leftImg='address' rightIcon='arrowRight'/>
          <DrawerButton text='邀请奖励' onPress={this.handlePressIvite} leftImg='ivitation' rightIcon='arrowRight'/>
          <DrawerButton text='Doors服务' onPress={this.handlePressServer} leftImg='service' rightIcon='arrowRight'/>
        </ScrollView>
      </View>
    )
  }

}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

// export default DrawerContent

DrawerContent.propTypes = {
  dispatch: PropTypes.func,
  //attemptDeleteAddress: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    user:state.user.user
  }
}

export default connect(mapStateToProps)(DrawerContent)
