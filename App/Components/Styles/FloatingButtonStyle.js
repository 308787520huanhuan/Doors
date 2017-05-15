// @flow

import { StyleSheet ,Dimensions } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export let CIRCLE_RADIUS = 30;
export let MARGIN_RIGHT_BOTTOM = 20;

export default StyleSheet.create({
  container: {
    // flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    // backgroundColor: 'transparent',
    // backgroundColor: 'green',
  },

  mainContainer: {
      flex    : 1
  },
  dropZone    : {
      height         : 100,
      backgroundColor:'#2c3e50'
  },
  text: {
    marginLeft: 5,
    marginRight: 5,
    position    : 'absolute',
    right:15,
    bottom:10,
    fontWeight:'900',
    backgroundColor:'transparent',
    color: '#fff'
  },
  image        : {
    width: 40,
    height: 40,
  },
  draggableContainer: {
      position    : 'absolute',
      width       : 0,
      height      : 0,
      top         : 0,
      left        : 0,
      // backgroundColor:'green'
  },
  circle      : {
      // backgroundColor     : '#1abc9c',
      width               : CIRCLE_RADIUS*2,
      height              : CIRCLE_RADIUS*2,
      borderRadius        : CIRCLE_RADIUS,
      backgroundColor:'#000',
      alignItems:'center',
      top                 : Metrics.screenHeight - CIRCLE_RADIUS*2 - MARGIN_RIGHT_BOTTOM,
      left                : Metrics.screenWidth - CIRCLE_RADIUS*2 - MARGIN_RIGHT_BOTTOM,
  },
  msgNum:{
      position: 'absolute',
      right:0,
      top:-10,
      backgroundColor:'red',
      width:30,
      height:30,
      alignItems:'center',
      borderRadius:15
  },
  msgText:{
    fontSize:16,
    color:'#fff',
    lineHeight:25
  }
})
