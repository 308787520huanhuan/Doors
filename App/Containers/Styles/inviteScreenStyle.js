import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default {
  container: {
    flexDirection:'column',
    paddingTop: 64,
    backgroundColor: "#eee"
  },
  topPart:{
    alignSelf:'center',
    paddingVertical:50
  },
  codeImg:{
    width:100,
    height:100,
    borderWidth:1,
    borderColor:"#fff"
  },
  codeText:{
    alignSelf:'center',
    fontSize:12,
    color:"#666",
    marginTop:10
  },
  inviteCode:{
    alignSelf:'center',
    fontSize:30,
    color:Colors.golden
  },
  bottomPart:{
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    paddingBottom:50,
    paddingHorizontal:20
  },
  bottomInfo:{
    fontSize:13,
    color:"#666",
    alignSelf:'center',
    lineHeight:30
  },
  //遮罩层
  modalStyle0: {
    backgroundColor:'#000',
    opacity:0.5
  },
  modalStyle:{
    alignItems: 'center',
    justifyContent:'center',
    position:'absolute',
    left:0,
    right:0,
    bottom:0,
    top:0
  },
  // modal上子View的样式
  subView:{
    flex:1,
    marginHorizontal:40,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent:'center',
  },
  topView:{
    flexDirection:'row',
    backgroundColor:'#fff',
    //alignSelf: 'stretch',
    justifyContent:'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor:'#ccc',
    paddingVertical:30,
    paddingRight:30,
    height:150,
  },
  eachView:{
    marginLeft:30
  },
  shareWayText:{
    color:"#555",
    alignSelf:'center',
    lineHeight:25
  },
  shareWay:{
    width:50,
    height:50,
    alignSelf: 'center'
  },
  // 按钮
  buttonView:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:10,
    backgroundColor:'#fff',
    alignSelf: 'stretch',
    justifyContent:'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor:'#ccc',
  },
  buttonStyle:{
    flex:1,
    height:44,
    alignItems: 'center',
    justifyContent:'center',
  },
  buttonText:{
    fontSize:16,
    color:'#3393F2',
    textAlign:'center',
  }
}
