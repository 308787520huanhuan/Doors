// @flow
import React from 'react'
import { View, Image, Text, Animated, PanResponder, TouchableHighlight, Dimensions,DeviceEventEmitter} from 'react-native'
import styles,{CIRCLE_RADIUS,MARGIN_RIGHT_BOTTOM} from './Styles/FloatingButtonStyle'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
// import QiYu from 'react-native-qiyu'
import OnlineServer from '../Components/OnlineServer'
import QiYu from 'react-native-qiyu'
import { Images, Metrics } from '../Themes'

export default class FloatingButton extends React.Component {

  constructor (props) {
    super(props);

    this.center = {x:Metrics.screenWidth-CIRCLE_RADIUS-MARGIN_RIGHT_BOTTOM,y:Metrics.screenHeight-CIRCLE_RADIUS*2-MARGIN_RIGHT_BOTTOM};
    this.touchOffset = {x:0,y:0};

    this.state = {
        unreadCount:0,
        pan: new Animated.ValueXY({x:this.center.x-CIRCLE_RADIUS,y:this.center.y-CIRCLE_RADIUS}),
    };

    this.panResponder = PanResponder.create({    //Step 2
        onStartShouldSetPanResponder : () => true,
        onPanResponderGrant: (e,gesture) => {
          console.info("grant");
          let {x0,y0} = gesture;
          let center = this.center;
          console.info(center)
          let touchOffset = {x:center.x-x0,y:center.y-y0};
          console.info(center)
          this.touchOffset = touchOffset;
        },
        onPanResponderMove           : (e, gesture) => {
          console.info("move:")
          let {x0,y0,moveX,moveY} = gesture

          let touchOffset = this.touchOffset;
          this.center.x = moveX + touchOffset.x;
          this.center.y = moveY + touchOffset.y;
          let xxx = {x:this.center.x-CIRCLE_RADIUS,y:this.center.y-CIRCLE_RADIUS};

          this.state.pan.setValue({x:this.center.x-CIRCLE_RADIUS,y:this.center.y-CIRCLE_RADIUS});
        },
        // Animated.event([null,{ //Step 3
        //     moveX : this.state.pan.x,
        //     moveY : this.state.pan.y
        // }]),
        onPanResponderRelease        : (e, gesture) => {
          console.info(gesture)
          let {moveX,moveY} = gesture;
          let touchOffset = this.touchOffset;

          // let xxx = {x:this.center.x-28,y:this.center.y-28};

          var x = 0,y = moveY + touchOffset.y-CIRCLE_RADIUS;
          if (moveX < Metrics.screenWidth / 2) {
              x = MARGIN_RIGHT_BOTTOM;
          } else {
              x = Metrics.screenWidth - (CIRCLE_RADIUS*2 + MARGIN_RIGHT_BOTTOM) ;
          }

          if (moveY < MARGIN_RIGHT_BOTTOM) {
              y = MARGIN_RIGHT_BOTTOM;
          } else if (moveY >= Metrics.screenHeight - (CIRCLE_RADIUS*2 + MARGIN_RIGHT_BOTTOM)) {
              y = Metrics.screenHeight - (CIRCLE_RADIUS*2 + MARGIN_RIGHT_BOTTOM)
          }



          if (moveX == 0 && moveY == 0){
              // openSales(this.props.user);
              OnlineServer.open()
              // this.state.pan.setValue({x:this.center.x-28,y:this.center.y-28});
          }else {
            this.center.x = x + CIRCLE_RADIUS;
            this.center.y = y + CIRCLE_RADIUS;

              Animated.spring(                      //Step 1
                            this.state.pan,         //Step 2
                            {toValue:{x:x,y:y}}     //Step 3
                        ).start();
          }
        } //Step 4
    });
  }

  componentWillMount () {

    //先获得未读消息
    QiYu.getUnreadCountCallback((unreadCount)=>{
        this.setState({
          unreadCount:unreadCount
      })
    });

    //监听未读消息改变
    var that = this
    QiYu.setUnreadCountWithEventName('UnreadCountCallback');
    DeviceEventEmitter.addListener('UnreadCountCallback',function(e) {
         that.setState({
            unreadCount:e.unreadCount
        })
    }); 
  }

  render () {
    const { unreadCount} = this.state
    return (
      <View  style={styles.draggableContainer}>
          <Animated.View
              {...this.panResponder.panHandlers}
              style={[styles.circle,this.state.pan.getLayout()]}>
              <Image style={styles.image} source={Images.kf}></Image>
              <Text style={styles.text}>管家</Text> 
              {
                  unreadCount == 0 
                  ?
                  null
                  :
                  <View style={styles.msgNum}>
                    <Text style={styles.msgText}>{unreadCount}</Text> 
                </View>
              }
              
          </Animated.View>
      </View>
    )
  }
}
