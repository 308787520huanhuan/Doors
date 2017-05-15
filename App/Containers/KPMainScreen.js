import React, { PropTypes } from 'react'
import {View, ScrollView, Text, TouchableHighlight, Dimensions, Animated, Easing} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'

import KPClassListPage from '../Components/KPClassListPage'

import GoodsActions from '../Redux/GoodsRedux'
import AnimatedActions from '../Redux/AnimatedRedux'
import SceneActions from '../Redux/SceneRedux'
// Styles
import styles from './Styles/KPMainScreenStyle'

import { Metrics } from '../Themes'

class KPMainScreen extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      lastScrollYValue:0,
      scrollY: new Animated.Value(0),
      marginTopValue: new Animated.Value(0)
    }

    this.state.scrollY.addListener((state)=> {

      if ((this.state.lastScrollYValue <= 46 && state.value > 46) ||
    this.state.lastScrollYValue >= 46 && state.value < 46) {

        const isScrollUp = this.state.lastScrollYValue < state.value?true:false;
        this.state.marginTopValue.setValue(isScrollUp?0:-44);
        Animated.timing(this.state.marginTopValue, {
           toValue: isScrollUp?-44:0,
           duration: 1,
           easing: Easing.inOut(Easing.ease),// 线性的渐变函数
       }).start();
      }
      this.state.lastScrollYValue = state.value;
    })
  }

  _onScroll(event) {
    let y = event.nativeEvent.contentOffset.y;
    this.props.moveWithScrollView(y,false);
    this.state.scrollY.setValue(y);
  }

  componentWillReceiveProps(nextProps) {
    const {token} = nextProps;
    if (token && this.props.token != token) {
        this.props.getGoodsClass(token)
    }

    // //token失效
    // if (this.props.token && token == null) {
    //   setTimeout(()=>{
    //       NavigationActions.push({key:"login",duration:0.5,direction:'vertical'});
    //   },500);
    //   return;
    // }
  }

  componentDidMount () {
    this.props.updateScene("kpMainScreen")
  }

  render () {
    const classList = this.props.classList
    if (classList == null || classList.length == 0) return null

    // const marginTopValue = this.state.scrollY.interpolate({
    //   inputRange: [0, 46, 56],
    //   outputRange: [0,0, -40],
    //   extrapolate: 'clamp',
    // });
    const marginTopValue = this.state.marginTopValue;
    return (
      <ScrollableTabView
        style={{marginTop: Metrics.navBarHeight,  height: Metrics.screenHeight}}
        initialPage={0}
        tabBarTextStyle={{fontSize: 14,bottom: -4}}
        renderTabBar={() => <DefaultTabBar
                      activeTextColor='white' inactiveTextColor='gray'
                      underlineStyle={{backgroundColor:'#fbc15d', height:2}}
                      underlineColor='#fbc15d' underlineHeight={2}
                      backgroundColor='rgba(0, 0, 0, 1)'
                      style={{marginTop:marginTopValue,height:40,borderWidth:0,borderBottomColor:'gray'}}/>}
        >
        {
            classList.map((c) => (
              <KPClassListPage
                style={{top:40}}
                key={c.id}
                tabLabel={c.name}
                items={c.items}
                onPress={(id,name) => NavigationActions.kpGoodsListScreen({classId: id,title: name})}
                onScroll={(e) => this._onScroll(e)}
                />
            ))
          }
      </ScrollableTabView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    classList: state.goods.classList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGoodsClass:(token)=>dispatch(GoodsActions.goodsClassRequest(token)),
    moveWithScrollView:(scrollY,inOnTime)=>dispatch(AnimatedActions.moveWithScrollView(scrollY,inOnTime)),
    updateScene:(sceneKey)=>dispatch(SceneActions.updateScene(sceneKey))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KPMainScreen)
