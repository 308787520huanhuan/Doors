import React, {PropTypes} from 'react'
import {
  View,
  ScrollView,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Alert,
  ListView
} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/walletScreenStyle'
import {Images, Metrics, Colors} from '../Themes'
import walletActions from '../Redux/walletRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Toast, {DURATION} from 'react-native-easy-toast'


// I18n
import I18n from 'react-native-i18n'

class walletScreen extends React.Component {

  // 构造函数
  constructor (props) {
    super(props)

    this._dataSource = new ListView.DataSource({
     rowHasChanged: (r1, r2) => r1 !== r2,
   });

    this.state = {
      visibleHeight: Metrics.screenHeight,
      dataSource: this._dataSource.cloneWithRows([]),
    }
  }

  updateDataSource (rows) {
    this.setState({
        dataSource: this._dataSource.cloneWithRows(rows),
    },()=>{
      // this._pullToRefreshListView.beginRefresh();
    })
  }

  componentDidMount () {
    //请求数据
    this.props.attemptGetWallet(this.props.token)
  }
  //操作成功之后
  componentWillReceiveProps(nextProps){
    if(nextProps.wallet.error != null){
      this.refs.toast.show(nextProps.wallet.error)
    }
    let refreshedDataList = nextProps.wallet.walletList;
    if (refreshedDataList == null)
      return;

    this.updateDataSource(refreshedDataList.rows);

  }

  renderMonthRecharges(monthRecharges) {
    console.info('renderMonthRecharges')
    console.info(monthRecharges)
    if (monthRecharges == null) {
      return null;
    }
    let date = monthRecharges.date;
    let recharges = monthRecharges.list;
    return (<View key={date}>
          <View style={{flex:1,justifyContent:'center',backgroundColor:Colors.lightWhite,height:32,}}>
            <Text style={{marginLeft:10,fontSize:14,fontWeight:'bold',color:Colors.lightBlack}}>{date}</Text>
          </View>
          {recharges.map((recharge) => {
            const type = recharge.type == 1? "-" : "+";
            const img = recharge.type == 1? <Image source={Images.sale} style={Styles.listIcon}/> : <Image source={Images.charge} style={Styles.listIcon}/>;
            const text = recharge.type == 1? "购买了"+recharge.goods_name: "充值D币金额";
            return (
                <View key={recharge.id} style={Styles.listContent}>
                  {img}
                  <View style={{flex:1,height:74,justifyContent:'space-between',marginLeft:10}}>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',alignItems:'flex-end',}}>
                      <Text style={{flex:1,fontSize:14,fontWeight:'bold', color:Colors.dimGray,textAlign:'left'}}>{text}</Text>
                      <Text style={{flex:1,fontSize:20,fontWeight:'bold', color:Colors.darkBlack,textAlign:'right',paddingRight:10}}>{type}{recharge.money}</Text>
                    </View>
                    <Text style={{flex:1,fontSize:14,color:Colors.darkGray1,}}>{recharge.add_time}</Text>
                  </View>
                </View>)
            }
        )}
</View>)
  }

  renderRecharges(recharges) {
    return (
      recharges.map((r)=>{
        return this.renderMonthRecharges(r)
      })
    )
  }

  render () {
    const { dataList } = this.props.wallet

    if(dataList == null){
      return null
    }

    return (
      <View contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]} >

        <View style={Styles.topPart}>
          <View style={{width:1,height:60}}></View>
          <View style={Styles.coinContainer}>
            <Text style={Styles.coin2}></Text>
            <Text style={Styles.coin1}>{this.props.d_coin}</Text>
            <Text style={Styles.coin2}>D币</Text>
          </View>
          <View style={{width:1,height:60}}></View>
            {/* <View style={{height:1,marginTop:-1,backgroundColor:'#ff0000'}}></View> */}
          <View style={Styles.operatContent}>
            <View style={Styles.each}>
              <TouchableHighlight onPress={() => NavigationActions.pop()}>
                <Text style={Styles.operBtn}>去购物</Text>
              </TouchableHighlight>
            </View>
            <View style={Styles.each}>
              <TouchableHighlight onPress={() => NavigationActions.recharge()}>
                <Text style={Styles.operBtn}>去充值</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <View style={Styles.opList}>
          <ScrollView style={Styles.scrollView}>
          {
            dataList.length == 0 ? (<View contentContainerStyle={{justifyContent: 'center'}} style={Styles.noRecord}>
                  <Text style={Styles.warming} href="pageTitle">您还没有账单数据</Text>
              </View>) : (
                    this.renderRecharges(dataList)
                )
          }

        </ScrollView>
        </View>
      </View>
    )
  }
}
walletScreen.propTypes = {
  dispatch: PropTypes.func,
  attemptGetWallet: PropTypes.func
}

const mapStateToProps = state => {
  return {
    d_coin:state.user.user.d_coin,
    token:state.user.token,
    wallet:state.wallet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptGetWallet: (token) => dispatch(walletActions.getWalletListRequest(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(walletScreen)
