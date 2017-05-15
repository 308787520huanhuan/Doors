import React from 'react'
import {View, Text, Dimensions, PixelRatio, StyleSheet, TouchableOpacity} from 'react-native'

import Parallax from 'react-native-parallax'
import {Images} from '../Themes'
import styles from './Styles/KPClassListPageStyle'

var PIXEL_RATIO = PixelRatio.get()
var PARALLAX_FACTOR = 0.3

export default class KPClassListPage extends React.Component {
  chineseName (name) {
    return name.split('-')[0]
  }
  englishName (name) {
    return name.split('-')[1]
  }
  render () {
    const items = this.props.items
    return (
      <Parallax.ScrollView
      scrollEventThrottle={16}
      onScroll={(e) => this.props.onScroll(e)}
      style={{backgroundColor:'#101010'}}
      >
        {Array.from(items, (item) => (

          <Parallax.Image
            key={item.id}
            ref={"image"+item.id}
            style={styles.image}
            overlayStyle={styles.overlay}
            source={{uri: item.icon}}
            defaultSource={Images.noImage}
            onPress={() => this.props.onPress(item.id,this.chineseName(item.name))}
            parallaxFactor={PARALLAX_FACTOR}
              >

            <Text style={styles.enTitle}>{this.englishName(item.name)}</Text>
            <Text style={styles.chTitle}>{this.chineseName(item.name)}</Text>
            </Parallax.Image>
          ))}
      </Parallax.ScrollView>
    )
  }
}
