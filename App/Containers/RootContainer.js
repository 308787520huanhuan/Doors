import React, { Component } from 'react'
import {ScrollView, Image, View, Text, StatusBar, Animated } from 'react-native'
import NavigationRouter from '../Navigation/NavigationRouter'
import { connect } from 'react-redux'
import ReduxPersist from '../Config/ReduxPersist'
// import * as wechat from 'react-native-wechat'
import FloatingButton from '../Components/FloatingButton'
import SceneActions from '../Redux/SceneRedux'
// Styles
import styles from './Styles/RootContainerStyle'

class RootContainer extends Component {
  constructor (props) {
      super(props);
      this.state = {
        status:0,
        sceneKey:"",
      }
  }

  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
    }
  }

  componentWillReceiveProps(nextProps){
    console.info("RouterContainer componentWillReceiveProps:"+","+nextProps.scene.sceneKey)
    this.setState({status:nextProps.startup.status})
    this.setState({sceneKey:nextProps.scene.sceneKey})
  }

  shouldComponentUpdate(nextProps,nextState) {
    const {sceneKey} = nextProps.scene;
    if (this.props.scene.sceneKey == sceneKey)
      return false;

    return true;
  }

  _isShowFloatingButton() {
      // console.info("isShowFloatingButton:"+this.state.sceneKey)

      const {status,sceneKey} = this.state;
      if (status < 2) {
        return false;
      }
      if (sceneKey == "" || sceneKey == "login" || sceneKey == "reg") {
        return false;
      }

      return true;
  }

  render () {
    console.info("RootContainer render()");
    return (
      <View style={styles.applicationView}>
          <NavigationRouter />
          <StatusBar   barStyle='light-content' />
          {this._isShowFloatingButton()?<FloatingButton user={this.props.user} />:null}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    startup:state.startup,
    user:state.user,
    scene:state.scene,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
