import React, { PropTypes } from 'react'
import { ScrollView, View, Image, Text, Dimensions, TouchableHighlight, TouchableOpacity, InteractionManager} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import ImageViewer from 'react-native-image-zoom-viewer'
import Toast, {DURATION} from 'react-native-easy-toast'
// import Lightbox from '../Common/Lightbox'
// import LightboxOverlay from '../Common/LightboxOverlay'

import GoodsActions from '../Redux/GoodsRedux'
import AnimatedActions from '../Redux/AnimatedRedux'
import CollectActions from '../Redux/collectRedux'
import SceneActions from '../Redux/SceneRedux'
import {Images, Metrics, Colors} from '../Themes'

let resolveAssetSource = require('resolveAssetSource');

// Styles
import styles from './Styles/KPGoodsListScreenStyle'
import OnlineServer from '../Components/OnlineServer'

// import QiYu from 'react-native-qiyu'
// const openSales = function(goodsInfo,user) {
// // 'id':string 用户id,
// // 'user_type':string 用户类型（ 0客户、7销售、6客服、5买手、4运营、3财务、2管理员、1CEO）
// // 'username':string 用户名,
// // 'nickname':string 昵称,
// // 'email':string 邮箱,
// // 'phone':string 电话,
// // 'photo':string 头像地址,
// // 'integral':int 积分
//   var userData = [
//     {
//       key:"real_name",
//       value:user.nickname,
//     },
//     {
//       key:"mobile_phone",
//       hidden:true
//     },
//     {
//       key:"sex",
//       label:"性别",
//       value:user.sex == 1 ?"男":"女"
//     },
//     {

//     },
//     {
//       key:"score",
//       label:"积分",
//       value:user.integral
//     },
//     {
//       key:"avatar",
//       value:user.photo,
//       "href":user.photo
//     },
//   ]
//   var params = {
//       userId:user.id,
//       data:JSON.stringify(userData)
//   }
//   //'[{\"key\":\"real_name\", \"value\":\"土豪\"},
//   //{\"key\":\"mobile_phone\", \"hidden\":true},
//   // {\"key\":\"email\", \"value\":\"13800000000@163.com\"},
//   // {\"index\":0, \"key\":\"account\", \"label\":\"账号\", \"value\":\"zhangsan\", \"href\":\"http://example.domain/user/zhangsan\"},
//   // {\"index\":1, \"key\":\"sex\", \"label\":\"性别\", \"value\":\"先生\"},
//   // {\"index\":5, \"key\":\"reg_date\", \"label\":\"注册日期\", \"value\":\"2015-11-16\"},
//   // {\"index\":6, \"key\":\"last_login\", \"label\":\"上次登录时间\", \"value\":\"2015-12-22 15:38:54\"}]'
//   QiYu.setUserInfo(params);

//   var params = {
//     sessionTipTextColor: '#f3f3f3',
//     sessionTipTextFontSize: 14,
//     customMessageTextColor: '#000000',
//     serviceMessageTextColor: '#000000',
//     messageTextFontSize: 16,
//     // tipMessageTextColor: '#f3f3f3',
//     // tipMessageTextFontSize: 16,
//     inputTextColor: '#000000',
//     inputTextFontSize: 16,
//     // sessionBackgroundImage: 'session_bg',
//     sessionTipBackgroundColor: '#000000',
//     customerHeadImage: user.photo,
//     // customerHeadImage:"",
//     // serviceHeadImage: 'http://iyuantu.cn/pc/images/logo1.png',
//     sessionMessageSpacing: 2,
//     showHeadImage: true,
//     showAudioEntry: false,
//     showEmoticonEntry: false,
//     autoShowKeyboard: false
//   }
//   QiYu.setCustomUIConfig(params);

//   var params = {
//     source: {
//       sourceTitle: 'Doors客户',
//       sourceUrl: '',
//       sourceCustomInfo: user.id,
//     },
//     commodityInfo: {
//       commodityInfoTitle: goodsInfo.name,
//       commodityInfoDesc: goodsInfo.description,
//       pictureUrl:  goodsInfo.images[0],
//       commodityInfoUrl: "",
//       note: goodsInfo.id,
//       show: false
//     },
//     sessionTitle: 'Doors',
//     groupId: 0,
//     staffId: 0
//   }
//   QiYu.openServiceWindow(params);
// }

class KPGoodsListScreen extends React.Component {

  constructor (props) {
    console.info('KPGoodsListScreen constructor');
    super(props)
    this.state = {
      pageNum: 1,
      interaction: true,
      isShowGoodsInfo: false,
      currentGoodsId: 0,
      currentGoods:{
        id:0,
        index:0,
        size:0
      }
    }
  }
  componentDidMount () {
    this.props.updateScene("kpGoodsListScreen")

    this.props.moveWithScrollView(0,false);
    // this.props.goodsListRequest(this.props.token, this.props.classId);
    // InteractionManager.runAfterInteractions(()=>this.setState({interaction:false}))

    this.props.goodsListRequest(this.props.token, this.props.classId);
    InteractionManager.runAfterInteractions(()=>{
      // this.setState({interaction:false}}
      this.props.goodsListRequest(this.props.token, this.props.classId);
    })
  }

  componentWillUnmount () {
    this.props.moveWithScrollView(this.props.swapNavBar.lastScrollY,true);
  }

  componentWillReceiveProps(nextProps) {
    //const { list } = nextProps.subClass;
    this.setState({isShowGoodsInfo:nextProps.isShowGoodsInfo});
  }

  addCollect = () => {
    this.props.addCollectRequest(this.props.token,this.state.currentGoodsId,(data) => {

        if (data.error_code == null) {
          this.refs.toast.show("关注成功");
        } else {
          this.refs.toast.show(data.message);
        }
    })
  }

  tryShowGoodsInfo (goodsId) {
    this.setState({currentGoodsId:goodsId},() => {
        const goodsInfo = this.props.goodsInfo[goodsId];
        const size = goodsInfo != null ? goodsInfo.images.length:0;

        var currentGoods = Object.assign(this.state.currentGoods,{size:size});
        this.setState({currentGoods:currentGoods})

        this.props.goodsInfoRequest(this.props.token, goodsId);
    })
  }

  tryHideGoodsInfo () {
    this.props.hideGoodsInfo();
  }

  onPageChange (index) {
    var currentGoods = Object.assign(this.state.currentGoods,{index:index});
    this.setState({currentGoods:currentGoods})
  }

  renderGoodsList() {
    const {interaction} = this.state;
    const {goodsList,classId} = this.props;

    if (goodsList == null || goodsList == undefined)
      { return null }

    const classGoodsList = goodsList[classId];
    if (classGoodsList == null || classGoodsList == undefined)
      { return null }

    let classGoodsPage = classGoodsList[this.state.pageNum];
    if (classGoodsPage == null) {
        { return null }
    }
    return (
      <ScrollView style={styles.container}>
        {classGoodsPage.map((goods, i) => (
          <View key={i}>
            <TouchableHighlight onPress={() => this.tryShowGoodsInfo(goods.id)}>
              <Image
                source={{uri: goods.icon}}
                defaultSource={Images.noImage}
                style={styles.image} />
            </TouchableHighlight>
            <View style={styles.textContainer}>
              <Text numberOfLines={3} style={styles.content}><Text style={styles.title}>{'【'+goods.name+'】'}</Text>{goods.description}</Text>
            </View>
            <View style={styles.sperate}></View>
          </View>
      ))}
      </ScrollView>
    )
  }

  renderTopBar(name) {
    return (
        <View style={{position:'absolute',top:Metrics.navBarHeight,width:Metrics.screenWidth,backgroundColor:'transparent',flexDirection:'row',justifyContent:'center'}}>
        <Text style={{fontWeight: 'bold',color:Colors.white,fontSize:17,}}>{'【'+name+'】'}</Text>
        </View>
    )
  }
  renderBottomBar(goodsInfo) {
    const {index,size} = this.state.currentGoods;
    return (
      <View style={{
        position: 'absolute',
      width: Metrics.screenWidth,
      bottom: 0,paddingHorizontal:10,
    flexDirection:'column',justifyContent:'flex-end'}}>
        <Text style={{color: Colors.white,}}>{(index+1)+'/'+size+'  '+goodsInfo.description}</Text>
        <View style={{marginTop:6,flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
          <TouchableHighlight onPress={this.addCollect}>
            <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',marginBottom:10}}>
              <Image style={{width:30,height:30}} source={Images.collection1}></Image>
              <Text style={{marginTop:4,fontSize:12,color:Colors.darkGray1}}>关注</Text>
            </View>
          </TouchableHighlight>
          {/*<TouchableOpacity activeOpacity={0.7} onPress={() => OnlineServer}>
            <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
              <Image  style={{width:30,height:30}} source={Images.message}></Image>
              <Text style={{marginTop:4,fontSize:12,color:Colors.darkGray1}}>管家</Text>
            </View>
          </TouchableOpacity>*/}
        </View>
      </View>
    )
  }

  renderGoodsInfo() {
    if (this.props.goodsInfo == null || this.props.goodsInfo == undefined) {
      {return null}
    }

    let goodsInfo = this.props.goodsInfo[this.state.currentGoodsId]
    if (goodsInfo == null) {
      {return null}
    }

    var images = []
    goodsInfo.images.map((image) => images.push({url: image}))

    return (
      <View style={[styles.overlay,{zIndex:1000,marginTop:0}]}>
        <ImageViewer
        style={{flex: 20}}
        saveToLocalByLongPress={false}
        leaveStayTime={100} leaveDistance={10}
        imageWidth={Metrics.screenWidth}
        imageHeight={Metrics.screenHeight * 3 / 3}
        cropWidth={Metrics.screenWidth}
        cropHeight={Metrics.screenHeight}
        imageUrls={images}
        failImageSource={Images.noImage}
        // renderHeader={() => this.renderGoodsTitle(goodsInfo.name) }
        renderIndicator= {()=>null}
        onCharge={(index)=>this.onPageCharge(index)}
        onClick={() => this.tryHideGoodsInfo()} />

        {this.renderTopBar(goodsInfo.name)}
        {this.renderBottomBar(goodsInfo)}
        <Toast ref='toast' style={{zIndex:10001}}/>
      </View>
    )
  }

  render () {
    return (
      <View style={{width:Metrics.screenWidth, height:Metrics.screenHeight}}>
          {this.renderGoodsList()}
          {this.state.isShowGoodsInfo ? this.renderGoodsInfo():null}
      </View>
    )
  }
}

KPGoodsListScreen.propTypes = {
  goodsList: PropTypes.object,
  goodsListRequest: PropTypes.func,
  goodsInfo: PropTypes.object,
  goodsInfoRequest: PropTypes.func,
  addCollectRequest: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    token: state.user.token,
    subClass:state.goods.subClass,
    goodsList: state.goods.goodsList,
    goodsInfo: state.goods.goodsInfo,
    isShowGoodsInfo: state.goods.isShowGoodsInfo,
    swapNavBar: state.animated.swapNavBar,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // getGoodsList:
    moveWithScrollView:(scrollY,inOnTime)=>dispatch(AnimatedActions.moveWithScrollView(scrollY,inOnTime)),
    goodsListRequest: (token, classId, page, pageNum) => dispatch(GoodsActions.goodsListRequest(token, classId, page, pageNum)),
    //请求第三级的分类列表
    getSubClass: (token, classId) => dispatch(GoodsActions.getSubClass(token,classId)),
    goodsInfoRequest: (token, goodsId) => dispatch(GoodsActions.goodsInfoRequest(token, goodsId)),
    hideGoodsInfo: () => dispatch(GoodsActions.showGoodsInfo(false)),
    addCollectRequest: (token,goodsId,onResult) => dispatch(CollectActions.addCollectRequest(token,goodsId,onResult)),
    updateScene:(sceneKey)=>dispatch(SceneActions.updateScene(sceneKey)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KPGoodsListScreen)
