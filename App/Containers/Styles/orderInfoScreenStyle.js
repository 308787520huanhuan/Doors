import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  container:{
    paddingTop:65,
    paddingBottom:31,
    backgroundColor:"#eee"
  },
  orderNumberContent:{
    backgroundColor:Colors.snow,
    flexDirection:'row',
    justifyContent:"space-between",
    paddingHorizontal:10,
    height:40,
    alignItems:'center',
    marginBottom:10
  },
  red:{
    color:Colors.error,
    fontSize:13
  },
  locationContent:{
    backgroundColor:Colors.snow,
    padding:10,
    flexDirection:'row',
    marginBottom:10,
  },
  locationInfoContent:{
    marginLeft:5,
    flex:1
  },
  userPhoneContent:{
    flexDirection:'row'
  },
  userPhone:{
    lineHeight:20
  },
  phoneText:{
    marginLeft:30
  },
  addressDetail:{
    height:30,
    marginTop:6,
    color:"#555",
    fontSize:12
  },
  goodsContent:{
    backgroundColor:Colors.snow,
    paddingVertical:10,
    marginBottom:10
  },
  logoContent:{
    flexDirection:'row'
  },
  logoText:{
    marginLeft:10
  },
  logoImg:{
    width:15,
    height:15
  },
  goodsInfoContent:{
    flexDirection:'row',
    padding:10,
    backgroundColor:Colors.lightWhite
  },
  goodsImg:{
    width:50,
    height:60,
    borderColor:"#ddd",
    borderWidth:1,
    marginRight:10
  },
  goodsInfoTextContent:{
    flex:1,
    height:60
  },
  goodsTitle:{
    height:40,
    fontSize:13
  },
  subInfo:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  goodsNum:{
    fontSize:13,
    color:"#555"
  },
  btnInner:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderWidth:0.4,
    borderColor:"#888",
    height:35,
    borderRadius:3
  },
  linkImg:{
    width:20,
    height:20
  },
  payText:{
    color:"#555",
    fontSize:13
  },
  payTypeContent:{
    paddingHorizontal:10,
    marginBottom:10,
    backgroundColor:Colors.snow
  },
  betweenContent:{
    flexDirection:'row',
    height:40,
    alignItems:'center',
    justifyContent:'space-between'
  },
  gray:{
    color:"#555"
  },
  borderBottom:{
    borderBottomWidth:0.5,
    borderColor:"#ddd"
  },
  invoiceContent:{
    paddingBottom:10
  },
  invoiceText:{
    fontSize:12,
    color:"#555",
    lineHeight:20
  },
  height30:{
    height:25
  },
  fontSize18:{
    fontSize:18
  },
  operateRow:{
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    zIndex:1,
    backgroundColor:Colors.snow,
    paddingHorizontal:10,
    paddingVertical:6,
    flexDirection:'row',
    justifyContent:'flex-end',
    borderTopWidth:1,
    borderColor:"#ddd"
  },
  opeBtn:{
    // borderColor:"#ddd",
    // borderWidth:1,
    // paddingHorizontal:6,
    // paddingVertical:6,
    // marginLeft:5
    backgroundColor: Colors.white,
    borderColor: Colors.red,
    borderWidth: 1,
    borderRadius: 4,
    width:100,
    height:34,
    marginLeft:20,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  btnColor:{
    borderColor:Colors.error,
    backgroundColor:Colors.error
  },
  buttonTitleDefault: {
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
    // backgroundColor:'#00ff00'
  },
  textColor:{
    color:Colors.snow
  }
})
