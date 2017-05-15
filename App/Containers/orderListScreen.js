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
  Dimensions,
  StyleSheet,
  ListView,
  InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/orderListScreenStyle'
import {Images, Metrics} from '../Themes'
import orderListActions from '../Redux/orderRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Toast, {DURATION} from 'react-native-easy-toast'
import CheckBox from 'react-native-checkbox'
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview'

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
// I18n
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/Ionicons';

let  ORDER_TABS = [
  {
      tabName:"待付款",
      tabIcon:"",
      tabLabel:"ios-wait-pay",
      id:1,
  },
  {
      tabName:"待收货",
      tabIcon:"",
      tabLabel:"ios-wait-delivery",
      id:2,
  },
  {
      tabName:"已完成",
      tabIcon:"",
      tabLabel:"ios-complete",
      id:3,
  },
  {
      tabName:"全部",
      tabIcon:"",
      tabLabel:"ios-all",
      id:0,
  },
]
const OrderTabBar = React.createClass({
  tabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
  },

  // componentDidMount() {
  //   this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  // },
  //
  // setAnimationValue({ value}) {
  //   this.tabIcons.forEach((icon, i) => {
  //     const progress = Math.min(1, Math.abs(value - i))
  //     icon.setNativeProps({
  //       style: {
  //         color: this.iconColor(progress),
  //       },
  //     });
  //   });
  // },

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 59 + (204 - 59) * progress;
    const green = 89 + (204 - 89) * progress;
    const blue = 152 + (204 - 152) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  },

  render() {
    let activeColor = '#fcc15d';
    let inactiveColor = '#ffffff';
    return <View style={[Styles.tabs, this.props.style, ]}>
      {this.props.tabs.map((tab, i) => {
        return <TouchableOpacity key={i} onPress={() => this.props.goToPage(i)} style={Styles.tab}>
          {/* <Icon
            name={tab}
            size={24}
            color={this.props.activeTab === i ? activeColor : inactiveColor}
            ref={(icon) => { this.tabIcons[i] = icon; }}
          /> */}
          <Text style={{fontSize:14, color:this.props.activeTab === i ? activeColor : inactiveColor}}>{ORDER_TABS[i].tabName}</Text>
        </TouchableOpacity>;
      })}
    </View>;
  },
});

class orderListScreen extends React.Component {
  // 构造函数
  constructor (props) {
    super(props);

    this._dataSource = new ListView.DataSource({
     rowHasChanged: (r1, r2) => r1 !== r2,
   });

   this.state = {
      filter: 1,//0全部、1待支付、 2待收货、3售后（已完成）,
      visibleHeight: Metrics.screenHeight,
      dataSource: this._dataSource.cloneWithRows([]),
      interaction:true,
      noOrder:false,
   }
  }

  //更改filter
  changeFilter({i,from}) {
    let {id} = ORDER_TABS[i];
    //等setState执行成功之后再刷新列表
    this.setState({filter: id}, () => {
      this.updateDataSource(this.props.order.orderList.rows);
    });
  }

  updateDataSource (rows) {
    let validRows = this.state.filter == 0 ? rows : rows.filter((row,i)=>row.order_status == this.state.filter);
    this.setState({
        dataSource: this._dataSource.cloneWithRows(validRows),
        noOrder: validRows.length == 0
    },() => {
      // this._pullToRefreshListView.beginRefresh();
    })
  }

  componentDidMount () {
      this.props.attemptGetOrderList(this.props.token,0,1,1000);

      InteractionManager.runAfterInteractions(()=>this.setState({interaction:false}))
  }
  //操作成功之后
  componentWillReceiveProps(nextProps){
    if(nextProps.order.success != null){
      this.refs.toast.show(nextProps.order.success)
    }

    let refreshedDataList = nextProps.order.orderList;
    if (refreshedDataList == null)
      return;

    this.updateDataSource(refreshedDataList.rows);

    if(nextProps.order.error != null){
      this.refs.toast.show(nextProps.order.error)
    }
  }
  // 确认收货
  handlerRecevied(id){
    console.info(id)
    Alert.alert(
      '订单列表',
      '确定已经收到该商品？',
      [
        {text: '取消', onPress: () => console.log('Cancel Pressed!')},
        {text: '确定', onPress: () => this.props.attemptConfirmReceived(id,this.props.token)},
      ]
    )
  }

  //删除订单
  // handlerDelete(id){
  //   Alert.alert(
  //     '订单列表',
  //     '确定删除该订单？',
  //     [
  //       {text: '取消', onPress: () => console.log('Cancel Pressed!')},
  //       {text: '确定', onPress: () => this.props.handlerDelete(id,this.props.token)},
  //     ]
  //   )
  // }

  _getOrderById(id) {
    const { orderList } = this.props.order;

    return orderList.rows.find((order)=> order.id == id);
  }

  _renderTopStatusBar(orderStatus,amountPaid) {
    var status = "";
    switch (orderStatus) {
      case 0:
          status = '已取消';
          break;
      case 1:
        if(amountPaid == 0){
            status = '待付订金'
        }else{
          status = '待结尾款'
        }
        break;
      case 2:
      case 3:
        status = '待收货';
        break;
      case 4:
        status = '已完成';
        break;
    }
    return (
      <View style={Styles.statusBar}>
        <Text style={Styles.statusBarTitle}>Doors</Text>
        <Text style={Styles.statusBarStatus}>{status}</Text>
      </View>
    )
  }

  _renderGoods(id,image, goodsName) {
    const { interaction } = this.state;
    return (
      <TouchableHighlight onPress={()=>NavigationActions.orderInfo({id: id})}>
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

  _renderBottomInfoBar(quantity, amount, amountPaid) {
    return (
      // <View style={Styles.infoBar}>
      //     <Text style={Styles.infoBarText}>共&nbsp;{quantity}&nbsp;件商品
      //     &nbsp;&nbsp;&nbsp;&nbsp;合计：¥<Text style={Styles.leftTitle}>{amount}</Text>.00
      //     &nbsp;&nbsp;&nbsp;&nbsp;实付款：¥<Text style={Styles.leftTitle}>{amountPaid}</Text>.00
      //     </Text>
      // </View>
      <View style={Styles.infoBar}>
          <View style={{flex:2,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
            <Text style={Styles.infoBarTextDefault}>共{quantity}件商品</Text>
            <Text style={[Styles.infoBarTextDefault,Styles.infoBarTextSum]}> {'合计：¥'+amount+'.00'}</Text>
          </View>
          <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
            <Text style={Styles.infoBarTextDefault}>{'实付款：'}</Text>
            <Text style={[Styles.infoBarTextDefault,Styles.infoBarTextPaid]}>{'¥'+amountPaid+'.00'}</Text>
          </View>
      </View>
    )
  }

  _renderOperateBar(id, orderStatus,amountPaid) {
      var operate;//(0已取消、1待付款、2待发货、3已发货、4完成
      var payType,payText;

      var track = <TouchableOpacity  style={[Styles.buttonDefault,Styles.buttonLevel3]} onPress={()=>NavigationActions.trackOrderScreen({id: id})}>
                      <Text style={[Styles.buttonTitleDefault,Styles.buttonTitleLevel3]}>订单追踪</Text>
                  </TouchableOpacity>
      switch (orderStatus) {
          case 1:
            //还未支付订金
            if(amountPaid == 0){
                payText = "支付订金"
                payType = 1
            }else{
              payType = 2
              payText = "支付尾款"
            }
            operate = <View style={Styles.operateBar}>
                      {track}
                      <TouchableOpacity activeOpacity={0.7} style={[Styles.buttonDefault,Styles.buttonLevel1]} onPress={()=>NavigationActions.payScreen({order:this._getOrderById(id),model:payType})}>
                          <Text style={[Styles.buttonTitleDefault,Styles.buttonTitleLevel1]}>{payText}</Text>
                      </TouchableOpacity>
                    </View>
            break;
          case 2:
          case 3:
            operate = <View style={Styles.operateBar}>
                        {track}
                        <TouchableOpacity activeOpacity={0.7} style={[Styles.buttonDefault,Styles.buttonLevel2]} onPress={()=>this.handlerRecevied(id)}>
                            <Text style={[Styles.buttonTitleDefault,Styles.buttonTitleLevel2]}>确认收货</Text>
                        </TouchableOpacity>
                    </View>
            break;
          case 4:
            operate = <View style={Styles.operateBar}>
                    {/*<TouchableOpacity activeOpacity={0.7} style={[Styles.buttonDefault,Styles.buttonLevel4]} onPress={()=>this.handlerDelete(id)}>
                        <Text style={[Styles.buttonTitleDefault,Styles.buttonTitleLevel4]}>删除订单</Text>
                    </TouchableOpacity>*/}
                      <TouchableOpacity activeOpacity={0.7} style={[Styles.buttonDefault,Styles.buttonLevel4]}>
                          <Text style={[Styles.buttonTitleDefault,Styles.buttonTitleLevel4]}>查看物流</Text>
                      </TouchableOpacity>
                    </View>
            break;
        }

      return operate;
  }

  _renderRow = (rowData, sectionID, rowID) => {
    return (
      <View style={Styles.thumbnail}>
        {this._renderTopStatusBar(rowData.order_status,rowData.amount_paid)}
        {this._renderGoods(rowData.id,rowData.image,rowData.goods_name)}
        {this._renderBottomInfoBar(rowData.quantity,rowData.amount_payable,rowData.amount_paid)}
        {this._renderOperateBar(rowData.id, rowData.order_status,rowData.amount_paid)}
      </View>
    );
  }

  _onRefresh = () => {
    // //console.log('outside _onRefresh start...')
    // timer.clearTimeout('refresh');
    // //simulate request data
    // timer.setTimeout('refresh',() => {
    //     let refreshedDataList = this.props.order.orderList;
    //     if (refreshedDataList == null)
    //       return;
    //     this.setState({
    //         dataList: refreshedDataList.rows,
    //         dataSource: this._dataSource.cloneWithRows(refreshedDataList.rows),
    //     })
    //     this._pullToRefreshListView.endRefresh()
    // }, 3000)
     this._pullToRefreshListView.endRefresh();
  }

  _onLoadMore = () => {

  }

  renderEmpty() {
      const {noOrder} = this.state;
      return (noOrder===true?(<Image style={{
            position: 'absolute',
            top:(Metrics.screenHeight-200)/2-100,left:(Metrics.screenWidth-200)/2,
            width:200,height:200}}
          source={Images.noOrder}></Image>):(null))
  }

  renderOrderList(id,tabLabel) {
    return (
      <View key={id} style={{backgroundColor: '#f2f4f5',width:Metrics.screenWidth,height:Metrics.screenHeight}}>
        {this.renderEmpty()}
        <PullToRefreshListView
          key={id}
          tabLabel={tabLabel}
          ref={ (component) => this._pullToRefreshListView = component }
          viewType={PullToRefreshListView.constants.viewType.listView}
          // contentContainerStyle={{backgroundColor: '#f2f4f5', }}
          style={{marginTop: 0 }}
          initialListSize={100}
          enableEmptySections={true}
          dataSource= {this.state.dataSource}
          pageSize={100}
          renderRow={this._renderRow}
          onRefresh={this._onRefresh}
          pullUpDistance={35}
          pullUpStayDistance={50}
          pullDownDistance={35}
          pullDownStayDistance={50}
        />
      </View>
    )
  }

  render () {
  const state = this.state
  const loading = state.page==1 ? true : false
  return (
    <ScrollableTabView
      style={{marginTop: Metrics.navBarHeight, height: Metrics.screenHeight}}
      initialPage={0}
      tabBarTextStyle={{fontSize: 16}}
      renderTabBar={() => <OrderTabBar goToPage={(i)=>this.changeFilter(i)}/>}
      onChangeTab = {(i)=>this.changeFilter(i)}
      >
            {
              ORDER_TABS.map((c) => (
                      // <PullToRefreshListView
                      //   key={c.id}
                      //   tabLabel={c.tabLabel}
                      //   ref={ (component) => this._pullToRefreshListView = component }
                      //   viewType={PullToRefreshListView.constants.viewType.listView}
                      //   contentContainerStyle={{backgroundColor: 'white', }}
                      //   style={{marginTop: 0 }}
                      //   initialListSize={100}
                      //   enableEmptySections={true}
                      //   dataSource= {this.state.dataSource}
                      //   pageSize={100}
                      //   renderRow={this._renderRow}
                      //   onRefresh={this._onRefresh}
                      //   pullUpDistance={35}
                      //   pullUpStayDistance={50}
                      //   pullDownDistance={35}
                      //   pullDownStayDistance={50}
                      // />
                      this.renderOrderList(c.id,c.tabLabel)
              ))
            }

    </ScrollableTabView>
  )
  }
}

orderListScreen.propTypes = {
  dispatch: PropTypes.func,
  attemptConfirmReceived: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    token:state.user.token,
    order:state.order
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptGetOrderList: (token,filter,page) => dispatch(orderListActions.getOrderListRequest(token,filter,page)),
    attemptConfirmReceived: (id,token) => dispatch(orderListActions.confirmReceived(id,token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(orderListScreen)
