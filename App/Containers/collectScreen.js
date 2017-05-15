import React, {PropTypes} from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Alert,
  ListView
} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/orderListScreenStyle'
import {Images, Metrics} from '../Themes'
import collectActions from '../Redux/collectRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Toast, {DURATION} from 'react-native-easy-toast'
import CheckBox from 'react-native-checkbox'
// import GiftedListView from 'react-native-gifted-listview'
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview'
import OnlineServer from '../Components/OnlineServer'

// I18n
import I18n from 'react-native-i18n'

class collectScreen extends React.Component
{
  // 构造函数
  constructor (props)
  {
    super(props)

    this._dataSource = new ListView.DataSource({
     rowHasChanged: (r1, r2) => r1 !== r2,
   });

    this.state = {
      visibleHeight: Metrics.screenHeight,
      modalVisible:false,
      dataSource: this._dataSource.cloneWithRows([]),
    }
  }

  updateDataSource (rows)
  {
    this.setState({
        dataSource: this._dataSource.cloneWithRows(rows),
    },()=>{
      // this._pullToRefreshListView.beginRefresh();
    })
  }

  componentDidMount () {
    //请求数据
    this.props.attemptGetCollectList(this.props.token,1,1000)
  }
  //操作成功之后
  componentWillReceiveProps(nextProps){
    if(nextProps.collect.success != null){
      this.refs.toast.show(nextProps.collect.success)
    }

    let refreshedDataList = nextProps.collect.collectList;
    if (refreshedDataList == null || refreshedDataList.rows == null)
      return;

    this.updateDataSource(refreshedDataList.rows);

    if(nextProps.collect.error != null){
      this.refs.toast.show(nextProps.collect.error)
    }
  }

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  //删除地址
  deleteCollect = (id) =>
  {
    var ids = [id];
    Alert.alert(
      '取消关注',
      '确定不再关注该商品？',
      [
        {text: '取消', onPress: () => console.log('Cancel Pressed!')},
        {text: '确定', onPress: () => this.props.attemptDeleteCollect(ids,this.props.token)},
      ]
    )
  }

  _renderTopStatusBar(goodsStatus) {
    var status = "";
    switch (goodsStatus) {
      case 2:
        status = "已下架"
        break;
    }
    return (
      <View style={Styles.statusBar}>
        <Text style={Styles.statusBarTitle}>Doors</Text>
        <Text style={Styles.statusBarStatus}>{status}</Text>
      </View>
    )
  }

  _renderGoods(goodsId, image, goodsName) {
    const { interaction } = this.state;
    return (
      <TouchableHighlight onPress={()=>NavigationActions.kpGoodsScreen({goodsId: goodsId,page:"collection"})}>
        <View style={Styles.goods}>
              <Image source={{uri:interaction?"":image}} style={Styles.goodsIcon}/>
          <View style={Styles.goodsInfo}>
               <Text style={Styles.goodsName}>{goodsName}</Text>
               <Text numberOfLines={2} style={Styles.goodsDetail}>扥阿发大森ad发扥大S发动发放扥大S发放分三扥三扥三扥扥阿发大森ad发扥大S发动发放扥大S发放分三扥三扥三扥</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  _renderOperateBar(id, goodsId, goodsStatus) {
      var operate;//(0已取消、1待付款、2待发货、3已发货、4完成
      var payType,payText;
      var track = <TouchableOpacity  style={[Styles.buttonDefault,Styles.buttonLevel3]} onPress={() => {this.deleteCollect(goodsId)} }>
                      <Text style={[Styles.buttonTitleDefault,Styles.buttonTitleLevel3]}>取消关注</Text>
                  </TouchableOpacity>
      switch (goodsStatus) {
          case 1:
            operate = <View style={Styles.operateBar}>
                      {track}
                      <TouchableOpacity activeOpacity={0.7} style={[Styles.buttonDefault,Styles.buttonLevel1]} onPress={() => {OnlineServer.open()}}>
                          <Text style={[Styles.buttonTitleDefault,Styles.buttonTitleLevel1]}>我要购买</Text>
                      </TouchableOpacity>
                    </View>
            break;
          case 2:
            operate = <View style={Styles.operateBar}>
                    {/*<TouchableOpacity activeOpacity={0.7} style={[Styles.buttonDefault,Styles.buttonLevel4]} onPress={()=>{this.deleteCollect(id)}}>
                        <Text style={[Styles.buttonTitleDefault,Styles.buttonTitleLevel4]}>取消关注</Text>
                    </TouchableOpacity>*/}
                       <TouchableOpacity activeOpacity={0.7} style={[Styles.buttonDefault,Styles.buttonLevel4]}>
                          <Text style={[Styles.buttonTitleDefault,Styles.buttonTitleLevel4]}>已下架</Text>
                      </TouchableOpacity> 
                    </View>
            break;
        }

      return operate;
  }

  _renderRow = (rowData, sectionID, rowID) => {

    return (
      <View style={Styles.orderItem}>
        {this._renderTopStatusBar(rowData.status)}
        {this._renderGoods(rowData.goods_id,rowData.icon,rowData.name)}
        {this._renderOperateBar(rowData.id, rowData.goods_id, rowData.status)}
      </View>
    );
  }

  render ()
  {
    const { collectList } = this.props.collect

    if(collectList.counts == null)
    {
      return null
    }

    if(collectList.counts == 0)
    {
      return (
        <View contentContainerStyle={{justifyContent: 'center'}} style={[Styles.noAddress, {height: this.state.visibleHeight}]}>
          <Text style={Styles.warming} href="pageTitle">您还没有关注任何商品哦！</Text>
          <TouchableHighlight style={Styles.noAddAddress} underlayColor='#ca8b1f' onPress={() => NavigationActions.pop()}>
            <Text style={Styles.btnTextAction}>先去逛一逛</Text>
          </TouchableHighlight>
      </View>
      )
    }

    return (
      <View contentContainerStyle={{justifyContent: 'center'}} style={{height:this.state.visibleHeight,backgroundColor:"#eee",paddingTop:65}}>
          <PullToRefreshListView
            ref={ (component) => this._pullToRefreshListView = component }
            viewType={PullToRefreshListView.constants.viewType.listView}
            contentContainerStyle={{backgroundColor: 'gray', }}
            style={{marginTop: 0 }}
            initialListSize={100}
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            pageSize={100}
            renderRow={this._renderRow}
            // onRefresh={this._onRefresh}
            pullUpDistance={35}
            pullUpStayDistance={50}
            pullDownDistance={35}
            pullDownStayDistance={50}
          />
        <Toast ref='toast' />
      </View>
    )
  }
}

collectScreen.propTypes = {
  dispatch: PropTypes.func
}

const mapStateToProps = state => {
  return {
    token:state.user.token,
    collect:state.collect
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptGetCollectList: (token,page,pageSize) => dispatch(collectActions.getCollectListRequest(token,page,pageSize)),
    attemptDeleteCollect:(goods_id,token) => dispatch(collectActions.deleteCollectRequest(goods_id,token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(collectScreen)
