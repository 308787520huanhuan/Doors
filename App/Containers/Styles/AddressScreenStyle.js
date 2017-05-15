import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  container:{
    paddingTop:65,
    paddingBottom:70,
    position:'relative'
  },
  noAddress: {
    backgroundColor: Colors.snow,
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
  AddAddress:{
    backgroundColor:Colors.wrong,
    height:40
  },
  addBtnTextContent:{
    paddingHorizontal:20,
    paddingVertical:20,
    position:'absolute',
    bottom:0,
    zIndex:1,
    left:0,
    right:0,
    backgroundColor:Colors.snow
  },
  addBtnText:{
    color:Colors.snow,
    alignSelf:'center',
    lineHeight:35
  },
  scrollView:{
    backgroundColor:"#eee"
  },
  scrollList:{
    paddingTop:10,
    paddingHorizontal:10,
    marginBottom:10,
    borderBottomWidth:1,
    borderColor:"#eee",
    backgroundColor:Colors.snow
  },
  toInfo:{
    height:56,
    flexDirection:'row',
    alignItems:'center'
  },
  userName:{
    flex:1,
    color:'#101010',
    fontSize:16,

    // backgroundColor:'#ff0000'
  },
  phone: {
    flex:2,
    color:'#101010',
    fontSize:16,
    textAlign:'left',
    // backgroundColor:'#ff0000'
  },
  detailContent:{
    height:40,
    borderBottomWidth:1,
    borderColor:'#eee',
    // backgroundColor:'#ff0000'
  },
  addressDetail:{
    color:"#888",
    fontSize:13,
    marginVertical:10
  },
  checkLabel:{
    color:'#101010',
    fontSize:14,
    marginLeft:-5
  },
  checkboxStyle:{
    width:15,
    height:15,
  },
  containerStyle:{
    flexDirection:'row',
  },
  bottomContent:{
    height:46,
    flexDirection:'row',
    justifyContent:'space-between',
    // alignItems:'center'
  },
  bottomContentLeft: {
    // backgroundColor:'#ff0000',
    justifyContent:'center',
  },
  bottomContentRight:{
    flexDirection:'row',
    alignItems:'center'
  },
  operation:{
    width:15,
    height:15,
  },
  operationText:{
    fontSize:14,
    color:"#101010",
    marginLeft:6,

    textAlign:'right',
    // backgroundColor:'#ff0000'
  }
})
