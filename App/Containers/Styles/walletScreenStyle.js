import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default {
  container: {
    // flexDirection:'column',
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.darkBlack
  },
  topPart:{
    backgroundColor:Colors.darkBlack
  },
  coinContainer: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'flex-end',
    // backgroundColor:'#ff0000'
  },
  coin1:{
    flex:4,
    height:46,
    //  backgroundColor:'#ffff00',
    textAlign:'center',
    color:'#ffffff',
    fontSize:40,
  },
  coin2:{
    flex:1,
    height:21,
    // backgroundColor:'#ff00ff',
    textAlign:'left',
    color:'#8f8f8f',
    fontSize:16
  },
  pageTitle:{
    alignSelf: 'center',
    color:'#ffffff',
    lineHeight:120,
    fontSize:40
  },
  operatContent: {
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor: Colors.darkBlack
  },
  each:{
    flex:2,
    paddingLeft:10,paddingRight:10,
  },
  opList:{
    backgroundColor:Colors.lightWhite,
    flex:1
  },
  operBtn:{
    color:Colors.white,
    alignSelf: 'center',
    lineHeight:40,
    fontSize:16,
    fontWeight:'bold'
  },
  eachTitle:{
    paddingLeft:20,
    lineHeight:30,
    backgroundColor:"#dbdbdb"
  },
  listContent:{
    flexDirection:'row',
    alignItems: 'center',
    backgroundColor:'#ffffff',
    borderBottomColor:"#dbdbdb",
    borderBottomWidth:1,
    paddingLeft:10,
  },
  listIcon:{
    width:50,height:50,
    borderRadius:15,
  },
  color9:{
    color:"#999"
  },
  color6:{
    color:"#666"
  },
  timeText:{
    fontSize:12,
    marginLeft:15
  },
  info:{
    fontSize:12
  },
  noRecord: {
    backgroundColor: Colors.white,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  location:{
    width:50,
    height:50
  },
  warming:{
    fontWeight:'bold',
    marginBottom:15,
    marginTop:15,
  },
  btnText:{
    paddingVertical:8,
    paddingHorizontal:10,
    borderWidth:1,
    borderColor:Colors.black,
    borderRadius:3
  },
}
