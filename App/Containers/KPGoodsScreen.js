import React, {PropTypes} from 'react'
import {
  View,
  Image,
  TouchableHighlight,
  Text,
  Dimensions,
  Modal
} from 'react-native'
import {connect} from 'react-redux'
import {Actions as NavigationActions} from 'react-native-router-flux'
import ImageViewer from 'react-native-image-zoom-viewer'
import GoodsActions from '../Redux/GoodsRedux'
import CollectActions from '../Redux/collectRedux'
// Styles
import styles from './Styles/KPGoodsScreenStyle'
import Toast, {DURATION} from 'react-native-easy-toast'
import {Images, Metrics} from '../Themes'
import OnlineServer from '../Components/OnlineServer'
// import QiYu from 'react-native-qiyu'
// const openSales = function(userId, categoryId, subcategoryId, productId) {
//   var params = {
//     sessionTipTextColor: '#CC00FF',
//     sessionTipTextFontSize: 20,
//     customMessageTextColor: '#CC00FF',
//     serviceMessageTextColor: '#CC00FF',
//     messageTextFontSize: 20,
//     tipMessageTextColor: '#CC00FF',
//     tipMessageTextFontSize: 20,
//     inputTextColor: '#CC00FF',
//     inputTextFontSize: 20,
//     // sessionBackgroundImage: 'session_bg',
//     sessionTipBackgroundColor: '#000000',
//     // customerHeadImage: 'customer_head',
//     // serviceHeadImage: 'service_head',
//     sessionMessageSpacing: 2,
//     showHeadImage: true,
//     showAudioEntry: false,
//     showEmoticonEntry: false,
//     autoShowKeyboard: false
//   }
//   QiYu.setCustomUIConfig(params);

//   console.log('setCustomUIConfig')

//   var params = {
//     source: {
//       sourceTitle: '网易七鱼ReactNative',
//       sourceUrl: 'http://www.qiyukf.com',
//       sourceCustomInfo: '我是来自自定义的信息'
//     },
//     commodityInfo: {
//       commodityInfoTitle: 'ReactNative商品',
//       commodityInfoDesc: '这是来自网易七鱼ReactNative的商品描述',
//       pictureUrl: 'http://qiyukf.com/res/img/companyLogo/blmn.png',
//       commodityInfoUrl: 'http://www.qiyukf.com',
//       note: '￥1000',
//       show: true
//     },
//     sessionTitle: '网易七鱼',
//     groupId: 0,
//     staffId: 0
//   }
//   QiYu.openServiceWindow(params);
// }

class KPGoodsScreen extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.goodsInfoRequest(this.props.token, this.props.goodsId)
  }

  //操作成功之后
  // componentWillReceiveProps(nextProps){
  //   if(nextProps.address.success != null){
  //     this.refs.toast.show(nextProps.address.success)
  //   }
  //   if(nextProps.address.error != null){
  //     this.refs.toast.show(nextProps.address.error)
  //   }
  // }

  addCollect = () => {
  this.props.addCollectRequest(this.props.token,this.props.goodsId,(data)=> {
      if (date.error_code == null) {
        this.refs.toast.show("关注成功");
      } else {
        this.refs.toast.show("关注失败");
      }
  })
  }

  onPageChange() {}

  render() {
    if (this.props.goodsInfo == null || this.props.goodsInfo == undefined) {
      return null
    }

    const { page } =  this.props;

    let goodsInfo = this.props.goodsInfo[this.props.goodsId]
    if (goodsInfo == null) {
      return null
    }

    var images = []
    goodsInfo.images.map((image) => images.push({url: image}))
    console.info(images)
    return (
      <View style={{
        flex: 1,
        width: Metrics.screenWidth,
        height: Metrics.screenHeight,
        backgroundColor: '#000000'
      }}>
        <ImageViewer
          style={{flex: 20}}
          saveToLocalByLongPress={false}
          leaveStayTime={100}
          leaveDistance={10}
          imageWidth={Metrics.screenWidth}
          imageHeight={Metrics.screenHeight * 2 / 3}
          cropWidth={Metrics.screenWidth}
          cropHeight={Metrics.screenHeight}
          imageUrls={images}
          onClick={() => {
            NavigationActions.pop({
              refresh: {
                duration: 0
              }
            })
        }} />

        <View style={{flex: 1,position: 'absolute',bottom: 0,width: Metrics.screenWidth,height: Metrics.screenHeight / 6, zIndex: 1}}>
          <Text style={{color: 'white',left: 15}}>{goodsInfo.description}</Text>
          <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
            <TouchableHighlight>
              {
                page == "collection"
                ?
                <Image source={Images.collection} style={{opacity:0}}></Image>
                :
                <Image source={Images.collection}></Image>

              }

            </TouchableHighlight>
            {/*<TouchableHighlight onPress={openSales}>
              <Image source={Images.message}></Image>
            </TouchableHighlight>*/}
          </View>
        </View>
        <Toast ref='toast' />
      </View>
    )
  }
}

KPGoodsScreen.propTypes = {
  goodsInfo: PropTypes.object,
  goodsInfoRequest: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    goodsInfo: state.goods.goodsInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCollectRequest: (token,goodsId,onResult) => dispatch(CollectActions.addCollectRequest(token,goodsId,onResult)),
    goodsInfoRequest: (token, goodsId) => dispatch(GoodsActions.goodsInfoRequest(token, goodsId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KPGoodsScreen)
