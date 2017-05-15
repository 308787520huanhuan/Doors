import React from 'react'
import { TouchableOpacity, Text} from 'react-native'
import styles from './Styles/NavItemsStyle'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors, Metrics } from '../Themes'

const openDrawer = () => {
  NavigationActions.refresh({
    key: 'drawer',
    open: true
  })
}

const openSearch = () => {
  NavigationActions.search()
}
const openModal = () => {
  NavigationActions.refresh({
    key: 'invite',
    show:true,
    open: false
  })
}

export default {
  backButton () {
    return (
      <TouchableOpacity onPress={NavigationActions.pop}>
        <Icon name='angle-left'
          size={Metrics.icons.small}
          color={Colors.snow}
          style={styles.navButtonLeft}
        />
      </TouchableOpacity>
    )
  },

  shareButton () {
    return (
      <TouchableOpacity onPress={openModal}>
        <Icon name='share'
          size={Metrics.icons.small}
          color={Colors.snow}
          style={styles.navButtonRight}
        />
      </TouchableOpacity>
    )
  },

  hamburgerButton () {
    return (
      <TouchableOpacity onPress={openDrawer}>
        <Icon name='bars'
          size={Metrics.icons.small}
          color={Colors.snow}
          style={styles.navButtonLeft}
        />
      </TouchableOpacity>
    )
  },

  searchButton () {
    return (
      <TouchableOpacity onPress={openSearch}>
        <Icon name='search'
          size={Metrics.icons.small}
          color={Colors.snow}
          style={styles.navButtonRight}
        />
      </TouchableOpacity>
    )
  },

  nullButton () {
    return (
      <TouchableOpacity>
        <Text></Text>
      </TouchableOpacity>
    )
  }

}
