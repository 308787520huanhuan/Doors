import React, { Component, PropTypes } from 'react'
import {View, Text, TouchableOpacity,Image } from 'react-native'
import styles from './Styles/DrawerButtonStyles'
import { Images } from '../Themes'

import ExamplesRegistry from '../Services/ExamplesRegistry'

// Example
ExamplesRegistry.add('Drawer Button', () =>
  <DrawerButton
    text='Example left drawer button'
    onPress={() => window.alert('Your drawers are showing')}
  />
)

class DrawerButton extends Component {

  render () {
    var textColor,leftPart,rightPart,style,topLine
    //是否有边框
    if(this.props.borderBottom){
      style = [styles.row,{borderBottomWidth:1,borderColor:"#eee"}]
    }else{
      style = styles.row
    }

    //字体颜色
    if(this.props.color){
      textColor = [styles.text,{color:this.props.color}]
    }else{
      textColor = styles.text
    }
    //左边图片
    if(this.props.leftImg){
      var leftSrc = this.props.leftImg,leftSrcImg = Images[leftSrc]
      leftPart = <Image source={leftSrcImg} style={styles.leftImg} />
    }
    //右边图片
    if(this.props.rightIcon){
      var src = this.props.rightIcon,imgSrc = Images[src]
      rightPart = <Image source={imgSrc} style={styles.rightImg} />
    }
    //上面的线
    if(this.props.topLine){
      topLine = <View style={styles.line}></View>
    }

    return (
      <View>
        {topLine}
        <TouchableOpacity onPress={this.props.onPress} style={style}>
          {leftPart}
          <Text style={textColor}>{this.props.text}</Text>
          {rightPart}
        </TouchableOpacity>

        <View style={styles.line}></View>
      </View>
    )
  }
}

DrawerButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  color:PropTypes.string,
  leftImg:PropTypes.string,
  rightIcon:PropTypes.string,
  borderBottom:PropTypes.string
}

export default DrawerButton
