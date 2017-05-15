/**
 * @providesModule Lightbox
 */
'use strict'

import React, { Children, cloneElement, PropTypes } from 'react'
import {
  Animated,
  TouchableHighlight,
  View,
  Dimensions
} from 'react-native'
import TimerMixin from 'react-timer-mixin'

import LightboxOverlay from './LightboxOverlay'

const { width, height } = Dimensions.get('window')
const vp_height = height

// var Lightbox = React.createClass({
class Lightbox extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      isOpen: false,
      origin: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      layoutOpacity: new Animated.Value(1)
    }

    this.open = this.open.bind(this)
    this.onClose = this.onClose.bind(this)
  }

  getContent () {
    if (this.props.renderContent) {
      return this.props.renderContent()
    } else if (this.props.activeProps) {
      return cloneElement(
        Children.only(this.props.children),
        this.props.activeProps
      )
    }
    return this.props.children
  }

  getOverlayProps () {
    return {
      isOpen: this.state.isOpen,
      origin: this.state.origin,
      renderHeader: this.props.renderHeader,
      swipeToDismiss: this.props.swipeToDismiss,
      springConfig: this.props.springConfig,
      backgroundColor: this.props.backgroundColor,
      children: this.getContent(),
      onClose: this.onClose
    }
  }

  open () {
    this._root.measure((ox, oy, width, height, px, py) => {
      this.props.onOpen(this)

      this.setState({
        isOpen: (this.props.navigator ? true : false),
        isAnimating: true,
        origin: {
          width,
          height,
          x: px,
          y: (this.props.lanxy) ? vp_height : py
        }
      }, () => {
        if (this.props.navigator) {
          var route = {
            component: LightboxOverlay,
            passProps: this.getOverlayProps()
          }
          var routes = this.props.navigator.getCurrentRoutes()
          routes.push(route)
          this.props.navigator.immediatelyResetRouteStack(routes)
        } else {
          this.setState({
            isOpen: true
          })
        }
        TimerMixin.setTimeout(() => {
          this.state.layoutOpacity.setValue(0)
        })
      })
    })
  }

  onClose () {
    this.state.layoutOpacity.setValue(1)
    this.setState({
      isOpen: false
    }, this.props.onClose)
    if (this.props.navigator) {
      var routes = this.props.navigator.getCurrentRoutes()
      routes.pop()
      this.props.navigator.immediatelyResetRouteStack(routes)
    }
  }

  render () {
    // measure will not return anything useful if we dont attach a onLayout handler on android
    return (
      <View
        ref={component => this._root = component}
        style={this.props.style}
        onLayout={() => {}}
      >
        <Animated.View style={{opacity: 1}}>
          <TouchableHighlight
            underlayColor={this.props.underlayColor}
            onPress={this.open}
          >
            {this.props.children}
          </TouchableHighlight>
        </Animated.View>
        {this.props.navigator ? false : <LightboxOverlay {...this.getOverlayProps()} />}
      </View>
    )
  }
// });
}

Lightbox.propTypes = {
  activeProps: PropTypes.object,
  renderHeader: PropTypes.func,
  renderContent: PropTypes.func,
  underlayColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  springConfig: PropTypes.shape({
    tension: PropTypes.number,
    friction: PropTypes.number
  }),
  swipeToDismiss: PropTypes.bool,
  lanxy: PropTypes.bool
}

Lightbox.defaultProps = {
  swipeToDismiss: true,
  lanxy: false,
  onOpen: () => {},
  onClose: () => {}
}

module.exports = Lightbox
