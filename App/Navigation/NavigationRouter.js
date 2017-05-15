import React, { Component } from 'react'
import { View, TouchableHighlight, Animated, Easing} from 'react-native'
import { Scene, Router } from 'react-native-router-flux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { Metrics } from '../Themes'
import { connect } from 'react-redux'



import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'

import AppConfig from '../Config/AppConfig'
// screens identified by the router,
import PresentationScreen from '../Containers/PresentationScreen'
import AllComponentsScreen from '../Containers/AllComponentsScreen'
import UsageExamplesScreen from '../Containers/UsageExamplesScreen'
import LoginScreen from '../Containers/LoginScreen'
import RegScreen from '../Containers/RegScreen'
import ListviewExample from '../Containers/ListviewExample'
import ListviewGridExample from '../Containers/ListviewGridExample'
import ListviewSectionsExample from '../Containers/ListviewSectionsExample'
// No maps by default for now
// import MapviewExample from '../Containers/MapviewExample'
import APITestingScreen from '../Containers/APITestingScreen'
import ThemeScreen from '../Containers/ThemeScreen'
import DeviceInfoScreen from '../Containers/DeviceInfoScreen'

import KPMainScreen from '../Containers/KPMainScreen'
import KPGoodsListScreen from '../Containers/KPGoodsListScreen'
import KPContactSalesScreen from '../Containers/KPContactSalesScreen'
import KPGoodsScreen from '../Containers/KPGoodsScreen'
import AddressScreen from '../Containers/AddressScreen'
//订单
import orderListScreen from '../Containers/orderListScreen'
import orderInfoScreen from '../Containers/orderInfoScreen'
//关注
import collectScreen from '../Containers/collectScreen'

import walletScreen from '../Containers/walletScreen'
import rechargeScreen from '../Containers/rechargeScreen'
import inviteScreen from '../Containers/inviteScreen'
import serverScreen from '../Containers/serverScreen'

import AddAddressScreen from '../Containers/AddAddressScreen'
import payScreen from '../Containers/payScreen'
import searchScreen from '../Containers/searchScreen'
import trackOrderScreen from '../Containers/trackOrderScreen'

import QiYu from 'react-native-qiyu'
import * as MobSMS from 'react-native-mob-sms'
import * as WeChat from 'react-native-wechat';
/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/
class NavigationRouter extends Component {
  constructor(props) {
    super(props);

    QiYu.registerAppId(AppConfig.qyAppKey, AppConfig.qyAppName);
    //短信验证接口
    MobSMS.registerApp(AppConfig.mobAppId, AppConfig.mobAppKey);
    //微信注册
    WeChat.registerApp(AppConfig.wxAppId);

    let anim01 = new Animated.Value(0);
    let anim02 = new Animated.Value(0);
    this.state = {
      swapNavBar:{
        lastScrollYValue:0,
        scrollY : anim01,
        opacityValue : anim01.interpolate({
          inputRange: [0, 46],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
        borderBottomWidthValue : anim01.interpolate({
          inputRange: [0, 46],
          outputRange: [0, 0],
          extrapolate: 'clamp',
        }),
        heightValue: new Animated.Value(Metrics.navBarHeight),
      }
    }
    this.inOnTime = false;
    let {swapNavBar,} = this.state;
    swapNavBar.scrollY.addListener((state)=> {
      if ((swapNavBar.lastScrollYValue <= 46 && state.value > 46) ||
      swapNavBar.lastScrollYValue >= 46 && state.value < 46) {

        const isScrollUp = swapNavBar.lastScrollYValue < state.value?true:false;

        this.inOnTime ?
        Animated.timing(swapNavBar.heightValue, {
          toValue: isScrollUp?20:Metrics.navBarHeight,
          duration: 0,
        }).start():
        Animated.timing(swapNavBar.heightValue, {
             toValue: isScrollUp?20:Metrics.navBarHeight,
             duration: 1,
             easing: Easing.inOut(Easing.ease),// 线性的渐变函数
         }).start();
        }
      swapNavBar.lastScrollYValue = state.value;
    });


    swapNavBar.heightValue.addListener(({value}) => {
      if (value == Metrics.navBarHeight) {
        // this.setState({invalidNavBar:'auto'},()=> {
        // // console.warn(this.state.invalidNavBar)
        // })
          NavigationActions.refresh({key:'drawerChildrenWrapper',navigationBarProps:{pointerEvents:'auto'}});
      } else {
        //  this.setState({invalidNavBar:'none'},()=> {
        //   //  console.warn(this.state.invalidNavBar)
        //  })
          NavigationActions.refresh({key:'drawerChildrenWrapper',navigationBarProps:{pointerEvents:'none'}});
      }
    });


    this.initScenes();
  }

  initScenes() {
    const { pointerEventsValue, opacityValue, borderBottomWidthValue, heightValue } = this.state.swapNavBar;
    this.scenes = NavigationActions.create(
      <Scene initial key='drawer' component={NavigationDrawer} open={false} duration={0}>
        <Scene
        initial key='drawerChildrenWrapper'
        navigationBarProps={{pointerEvents:'auto'}}
        navigationBarStyle={[Styles.navBar,{height:heightValue, borderBottomWidth:borderBottomWidthValue}]}
        navigationBarContentStyle={{opacity:opacityValue}}
        titleStyle={Styles.title}
        leftButtonIconStyle={Styles.leftButton}
        rightButtonTextStyle={Styles.rightButton}>
          <Scene initial key='kpMainScreen' component={KPMainScreen} title='Doors' duration={0} hideNavBar={false} renderLeftButton={NavItems.hamburgerButton} renderRightButton={NavItems.searchButton} />
          <Scene key='kpGoodsListScreen' component={KPGoodsListScreen} title='商品列表' />
          <Scene key='kpGoodsScreen' component={KPGoodsScreen} hideNavBar direction={'fade'} duration={0} />
          <Scene key='kpContactSalesScreen' component={KPContactSalesScreen}/>
          {/* 搜索界面*/}
          <Scene key='search' component={searchScreen} hideNavBar={true} renderLeftButton={NavItems.backButton}/>
          {/* 收货地址*/}
          <Scene key='address' component={AddressScreen} title='地址管理' renderLeftButton={NavItems.backButton}/>
          <Scene key='addAddress' component={AddAddressScreen} title='新增收货地址' renderLeftButton={NavItems.backButton}/>
          {/* 关注管理*/}
          <Scene key='collect' component={collectScreen} title='我的关注' renderLeftButton={NavItems.backButton}/>
          {/* D币*/}
          <Scene key='wallet' component={walletScreen} title='我的钱包' renderLeftButton={NavItems.backButton}/>
          <Scene key='recharge' component={rechargeScreen} title='充值' renderLeftButton={NavItems.backButton}/>
          <Scene key='invite' component={inviteScreen} title='邀请奖励' renderLeftButton={NavItems.backButton} renderRightButton={NavItems.shareButton}/>
          <Scene key='server' component={serverScreen} title='Doors服务' renderLeftButton={NavItems.backButton}/>

          {/* 订单管理*/}
          <Scene key='orderList' component={orderListScreen} title='订单管理' renderLeftButton={NavItems.backButton}/>
          <Scene key='orderInfo' component={orderInfoScreen} title='订单详情' renderLeftButton={NavItems.backButton}/>
          <Scene key='payScreen' component={payScreen} title='Doors收银台' renderLeftButton={NavItems.backButton}/>
          <Scene key='trackOrderScreen' component={trackOrderScreen} title='订单追踪' renderLeftButton={NavItems.backButton}/>
          <Scene key='reg' component={RegScreen} title='Doors'  hideNavBar={false}  duration={0}/>
          <Scene key='login' component={LoginScreen} title='登录' hideNavBar={true}  duration={0}/>
        </Scene>
      </Scene>
    );
  }

  componentWillReceiveProps(nextProps) {
    // console.warn("nextProps.swapNavBar.scrollY:"+nextProps.swapNavBar.scrollY
    console.info("NavigationRouter componentWillReceiveProps")

    // if (this.props.user.token == null) {
    //   console.info("NavigationActions.login()")
    //   NavigationActions.login();
    //   return;
    // }
    //刚启动
    if (this.props.startup.status < 2) {
        return;
    }

    if (this.props.startup.status == 2) {
      this.inOnTime = nextProps.swapNavBar.inOnTime;
      this.state.swapNavBar.scrollY.setValue(nextProps.swapNavBar.scrollY);

      NavigationActions.refresh({key:'kpGoodsListScreen',hideNavBar:nextProps.isShowGoodsInfo});
    }
  }

  componentDidUpdate () {
    console.info("NavigationRouter componentDidUpdate():"+this.props.user.token);
    if (this.props.startup.status < 2) {
        return;
    }
    if (this.props.user.token == null) {
        NavigationActions.login();
    }
  }

  renderSplashScreen() {
    return (<View style={{backgroundColor:'white',width:Metrics.screenWidth,height:Metrics.screenHeight}}>

    </View>);
  }

  render() {
    console.info("NavigationRouter render()");
    const { status } = this.props.startup;
    if (status < 2) {
      return this.renderSplashScreen();
    }
    const { pointerEventsValue, opacityValue, borderBottomWidthValue, heightValue } = this.state.swapNavBar;
    return (
      <Router>
        <Scene initial key='drawer' component={NavigationDrawer} open={false} duration={0}>
          <Scene
          initial key='drawerChildrenWrapper'
          navigationBarProps={{pointerEvents:'auto'}}
          navigationBarStyle={[Styles.navBar,{height:heightValue,borderBottomWidth:borderBottomWidthValue}]}
          navigationBarContentStyle={{opacity:opacityValue}}
          titleStyle={Styles.title}
          leftButtonIconStyle={Styles.leftButton}
          rightButtonTextStyle={Styles.rightButton}>
            <Scene initial key='kpMainScreen' component={KPMainScreen} title='Doors' duration={0} hideNavBar={false} renderLeftButton={NavItems.hamburgerButton} renderRightButton={NavItems.searchButton} />
            <Scene key='kpGoodsListScreen' component={KPGoodsListScreen} title='商品列表' />
            <Scene key='kpGoodsScreen' component={KPGoodsScreen} hideNavBar direction={'fade'} duration={0} />
            <Scene key='kpContactSalesScreen' component={KPContactSalesScreen}/>
            {/* 搜索界面*/}
            <Scene key='search' component={searchScreen} hideNavBar={true} renderLeftButton={NavItems.backButton}/>
            {/* 收货地址*/}
            <Scene key='address' component={AddressScreen} title='地址管理' renderLeftButton={NavItems.backButton}/>
            <Scene key='addAddress' component={AddAddressScreen} title='新增收货地址' renderLeftButton={NavItems.backButton}/>
            {/* 关注管理*/}
            <Scene key='collect' component={collectScreen} title='我的关注' renderLeftButton={NavItems.backButton}/>
            {/* D币*/}
            <Scene key='wallet' component={walletScreen} title='我的钱包' renderLeftButton={NavItems.backButton}/>
            <Scene key='recharge' component={rechargeScreen} title='充值' renderLeftButton={NavItems.backButton}/>
            <Scene key='invite' component={inviteScreen} title='邀请奖励' renderLeftButton={NavItems.backButton} renderRightButton={NavItems.shareButton}/>
            <Scene key='server' component={serverScreen} title='Doors服务' renderLeftButton={NavItems.backButton}/>

            {/* 订单管理*/}
            <Scene key='orderList' component={orderListScreen} title='订单管理' renderLeftButton={NavItems.backButton}/>
            <Scene key='orderInfo' component={orderInfoScreen} title='订单详情' renderLeftButton={NavItems.backButton}/>
            <Scene key='payScreen' component={payScreen} title='Doors收银台' renderLeftButton={NavItems.backButton}/>
            <Scene key='trackOrderScreen' component={trackOrderScreen} title='订单追踪' renderLeftButton={NavItems.backButton}/>
            <Scene key='reg' component={RegScreen} title='Doors'  hideNavBar={false}  duration={0}/>
            <Scene key='login' component={LoginScreen} title='登录' hideNavBar={true}  duration={0}/>
          </Scene>
        </Scene>
      </Router>
    )
  }
}

const mapStateToProps = state =>  {
  return {
    startup:state.startup,
    user: state.user,
    login: state.login,
    swapNavBar: state.animated.swapNavBar,
    isShowGoodsInfo: state.goods.isShowGoodsInfo,
  }
}

const mapStateToDispatch = dispatch => ({
})

export default connect(mapStateToProps, mapStateToDispatch)(NavigationRouter)
