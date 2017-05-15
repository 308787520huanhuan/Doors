
//var Swipeout = require('react-native-swipeout')
import React, {Component,PropTypes} from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/searchScreenStyle'
import {Images, Metrics, Colors} from '../Themes'
import searchActions from '../Redux/searchRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Toast, {DURATION} from 'react-native-easy-toast'
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons'
import { Kohana } from 'react-native-textinput-effects'
import Swipeout from 'react-native-swipeout'


// I18n
import I18n from 'react-native-i18n'

class searchScreen extends React.Component
{
  // 构造函数
  constructor (props)
  {
    super(props)
    this.state =
    {
      visibleHeight: Metrics.screenHeight,

      //显示历史搜索
      historyShow:true,
      key:""
    }
  }

   //获得收货地址列表
  componentDidMount ()
  {
    //请求搜索历史
    this.props.getHistory(this.props.token);

    //请求热搜品牌
    this.props.getHot(this.props.token);
  }

  //初始化之前请求数据
  componentWillMount () {
    this.setState({
        historyShow:true,
      })
  }
  handleSearch = (key) =>
  {
    this.setState({
      key:key
    },()=>{
      this._search();
    })
  }

  handleInputSearch = (text) =>
  {
    this.setState({
      key:text
    })
  }

  handleClearHistroy = (key) => {
    const token = this.props.token;
    if( key ){
      this.props.deleteLog(token,2,key)
    }
    else
    {
      this.props.deleteLog(token,1,"")
    }
  }
  _search = () => {
    const token = this.props.token
    const key = this.state.key
    this.setState({
      historyShow:false
    })
    this.props.searchRequest(token,key)
  }


  render () {
    //如果是编辑地址并且还没有得到地址详情
    const { hotList,historyList,goodsList} = this.props.search;
    const { historyShow,key } = this.state;
    if( historyShow && (hotList == null || historyList == null )){
      return null
    }

    if( !historyShow && goodsList == null ){
      return null
    }
    return (
      <View contentContainerStyle={{justifyContent: 'center'}} style={[Styles.content,{height: this.state.visibleHeight}]}>
        <View style={Styles.topSearch}>
            {/*<TouchableHighlight onPress={() => NavigationActions.pop()}>
              <Image source={Images.backHistory1} style={Styles.backHistory}/>
            </TouchableHighlight>*/}
            <TouchableOpacity onPress={() => NavigationActions.pop()}>
              <Icon name='angle-left'
                size={35}
                color={Colors.snow}
                style={Styles.navButtonLeft}
              />
            </TouchableOpacity>
            <Kohana
              style={{ backgroundColor: '#fff',height:35,marginLeft:10}}
              label={'请输入关键字'}
              value={key}
              onChangeText={this.handleInputSearch}
              onSubmitEditing={this._search}
              iconClass={MaterialsIcon}
              blurOnSubmit={true}
              returnKeyType ='done'
              iconName={'search'}
              iconColor={'#999'}
              labelStyle={{ color: '#999',fontWeight:'normal',top:-8,fontSize:14}}
              inputStyle={{ color: '#999'}}
            />
        </View>
        {
          historyShow
          ?
          //显示搜索历史
          <ScrollView style={Styles.historyList} keyboardShouldPersistTaps>
            <View style={[Styles.hotSearchContent,Styles.borderB]}>
                <Text style={Styles.historyTitle}>热搜品牌</Text>
                <ScrollView style={Styles.hotListScroll} horizontal={true}>
                  {
                    hotList.map((c) => (
                      <TouchableHighlight key={c} onPress={()=>{this.handleSearch(c)}} underlayColor='#fff'>
                        <View style={Styles.eachHotView}>
                            <Text style={Styles.eachHot}>{c}</Text>
                        </View>
                      </TouchableHighlight>
                      )
                    )
                  }
                </ScrollView>
            </View>
            {
              //历史搜索
              historyList.length > 0
              ?
              <View style={Styles.hotSearchContent}>
              <View style={Styles.borderB}>
                <Text style={Styles.historyTitle}>历史搜索</Text>
              </View>
              <ScrollView style={Styles.hotListScroll}>
                {
                    historyList.map((c) => (
                      <Swipeout right={[
                        {
                          text: '删除',
                          backgroundColor:'red',
                          onPress:()=>{
                              this.handleClearHistroy(c)
                          }
                        }
                      ]} backgroundColor={'#fff'} key = {c}>
                          <TouchableHighlight key={c} onPress={()=>{this.handleSearch(c)}} underlayColor='#fff'>
                            <View style={Styles.borderB}>
                                <Text style={Styles.eachHistory} key={c}>{c}</Text>
                            </View>
                          </TouchableHighlight>
                        </Swipeout>
                      )
                    )
                  }

              </ScrollView>
              <View style={Styles.deleteContent}>
                <TouchableHighlight onPress={()=>{this.handleClearHistroy()}} underlayColor='#fff'>
                  <View style={Styles.deleteSubContent}>
                        <Icon name='trash-o' size={15} style={Styles.trash}/>
                        <Text style={Styles.deleteText}>清空历史搜索</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
            :
            null
            }

          </ScrollView>
        :
        //显示商品列表
        <ScrollView style={Styles.goodsList} keyboardShouldPersistTaps>
          {
            goodsList.length == 0
            ?
            <View style={Styles.noDataView}>
              <Text style={Styles.noData}>未找到相关内容</Text>
            </View>
            :
            //显示搜索结果 左右结构
            <View style={Styles.goodsList}>
              {
                goodsList.map((goods, i) =>
                  {
                    if (i%2 == 0 ){
                      let j = i + 1
                      let rightGood = goodsList[j]
                      return (
                        <View style={Styles.eachGoodsRow} key={i}>
                          <View key={i} style={Styles.leftGood}>
                            <TouchableHighlight onPress={()=>NavigationActions.kpGoodsScreen({goodsId: goods.id,page:"search"})}>
                              <Image
                                source={{uri: goods.icon}}
                                style={Styles.goodsIcon}
                                />
                            </TouchableHighlight>
                            <Text style={Styles.goodsName}>{goods.name}:{Styles.description}</Text>
                          </View>
                          <View key={j} style={Styles.rightGood}>
                            {
                              rightGood 
                              ?
                                <View key={j} style={Styles.rightGood}>
                                  <TouchableHighlight onPress={()=>NavigationActions.kpGoodsScreen({goodsId: rightGood.id,page:"search"})}>
                                    <Image
                                      source={{uri: rightGood.icon}}
                                      style={Styles.goodsIcon}
                                      />
                                  </TouchableHighlight>
                                  <Text style={Styles.goodsName}>{rightGood.name}:{Styles.description}</Text>
                                </View>
                              :
                              null
                            }
                          </View>
                        </View>
                      )
                    }
                })
            }
            </View>
          }
        </ScrollView>
        }

        <Toast ref='toast' />
      </View>
    )
  }
}
searchScreen.propTypes = {
  // address: PropTypes.object,
  // attemptAddAddress: PropTypes.func,
  // attemptEditAddress: PropTypes.func,
  // attemptGetAddressInfo: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    state:state,
    token: state.user.token,
    search: state.search,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getHot: (token) => dispatch(searchActions.getHot(token)),
    getHistory: (token) => dispatch(searchActions.getHistory(token)),
    searchRequest: (token,key) => dispatch(searchActions.searchRequest(token,key)),
    deleteLog: (token,model,key) => dispatch(searchActions.deleteHistoryLog(token,model,key)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(searchScreen)
