import {StyleSheet, Dimensions} from 'react-native'
import {Colors, Metrics} from '../../Themes'

export default StyleSheet.create({
  tabContent: {
    flexDirection: 'row',
    backgroundColor: Colors.black,
    justifyContent: 'space-around',
    paddingTop: 60
  },
  tabImg: {
    width: 70,
    height: 70
  },
  thumbnail:{
    marginTop:5
  },
///////////////
  statusBar: {
    height: 45,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems:'center',
    backgroundColor:Colors.white
  },

  statusBarTitle: {
    color: Colors.darkDark,
    fontSize:16,
    fontWeight: 'bold'
  },

  statusBarStatus: {
    color: Colors.red,
    fontSize: 14,
  },
///////////////
  infoBar: {
    height:42,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
    backgroundColor:'#fff'
  },

  infoBarTextDefault: {
    color:Colors.darkBlack,
    fontSize: 14
  },

  infoBarTextSum: {
    marginLeft:5,
  },

  infoBarTextPaid: {
    fontSize: 18,
    fontWeight: 'bold'
  },
///////////////
  goods: {
    height:100,
    paddingLeft: 10,
    paddingVertical: 5,
    backgroundColor: Colors.lightWhite,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  goodsIcon: {
    width: 64,
    height: 64,
    borderColor: Colors.lightWhite,
    borderWidth: 1,
  },
  goodsInfo: {
      height:64,width: Metrics.screenWidth - 94,
      marginLeft: 10,
      flexDirection:'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
  },
  goodsName: {
    color:Colors.darkBlack,
    fontSize:16,
    fontWeight: 'bold'
  },
  goodsDetail: {
    marginTop: 6,
    color: Colors.darkGray0,
    fontSize:12,
    textAlign:'left',
  },
  ///////////////
  operateBar: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.white,
    height:48,
  },

  buttonDefault: {
    backgroundColor: Colors.red,
    borderColor: Colors.red,
    borderWidth: 1,
    borderRadius: 4,
    width:100,
    height:34,
    marginLeft:20,
    flexDirection:'column',
    justifyContent:'center'
  },

  buttonTitleDefault: {
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
    // backgroundColor:'#00ff00'
  },

  buttonLevel1: {
    width:100,
  },
  buttonLevel2: {
  },
  buttonLevel3: {
    backgroundColor: Colors.white,
  },
  buttonLevel4: {
    backgroundColor: Colors.white,
    borderColor: Colors.darkGray0,
  },
  buttonTitleLevel1: {
    color: Colors.white
  },
  buttonTitleLevel2: {
    color: Colors.white
  },
  buttonTitleLevel3: {
    color: Colors.red
  },
  buttonTitleLevel4: {
    backgroundColor: Colors.white,
    borderColor: Colors.darkGray0,
    color: Colors.darkGray0
  },

  defaultView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  defaultViewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    paddingTop: 8,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    backgroundColor: Colors.darkBlack
  },
  noAddress: {
    backgroundColor: Colors.snow,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  warming:{
    fontWeight:'bold',
    marginBottom:15,
    marginTop:15,
  },
  btnTextAction:{
    paddingVertical:8,
    paddingHorizontal:10,
    borderWidth:1,
    borderColor:Colors.black,
    borderRadius:3
  },
})
