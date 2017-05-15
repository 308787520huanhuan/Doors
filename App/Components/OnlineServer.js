import QiYu from 'react-native-qiyu'
const OnlineServer  = {
  open : function () {
    var params = {
      sessionTipTextColor: '#CC00FF',
      sessionTipTextFontSize: 16,
      //访客文本消息字体颜色
      customMessageTextColor: '#555',
      //客服文本消息字体颜色
      serviceMessageTextColor: '#CC00FF',
      messageTextFontSize: 20,
      tipMessageTextColor: '#CC00FF',
      tipMessageTextFontSize: 20,
      //输入框字体颜色
      inputTextColor: '#555',
      inputTextFontSize: 20,
      sessionBackgroundImage: 'session_bg',
      sessionTipBackgroundColor: '#000000',
      customerHeadImage: 'customer_head',
      serviceHeadImage: 'service_head',
      sessionMessageSpacing: 2,
      showHeadImage: true,
      showAudioEntry: false,
      showEmoticonEntry: false,
      autoShowKeyboard: false
    }
    QiYu.setCustomUIConfig(params)

    QiYu.openServiceWindow(
      {
        sourceTitle: '网易七鱼ReactNative',
        sourceUrl: 'http://www.qiyukf.com',
        sourceCustomInfo: '我是来自自定义的信息',

        commodityInfoTitle: 'ReactNative商品',
        commodityInfoDesc: '这是来自网易七鱼ReactNative的商品描述',
        pictureUrl: 'http://qiyukf.com/res/img/companyLogo/blmn.png',
        commodityInfoUrl: 'http://www.qiyukf.com',
        note: '￥1888',
        show: true,

        sessionTitle: 'Doors客服'
      }
    )
  },
  getUnreadMesg : function(){
    var num;
    QiYu.getUnreadCountCallback((unreadCount)=>{
        num =  unreadCount;
        console.info("里面")
    });
    console.info("qiyu::::::::::::::")
    return num
  }
}
module.exports = OnlineServer