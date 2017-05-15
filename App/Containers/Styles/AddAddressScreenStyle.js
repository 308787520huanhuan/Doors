import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  container:{
    paddingTop:68
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
  eachcontent:{
    paddingHorizontal:10,
    borderBottomWidth:1,
    borderColor:"#eee",

    flexDirection:"row"
  },
  labelTex:{
    color:"#101010",
    fontSize:14,
    fontWeight:'bold',
    lineHeight:45,
    flex:2
  },
  textInputStyle:{
    flex:7,
    paddingLeft:0,
    borderWidth:1,
    borderColor:"#fff",
    fontSize:16,
    // backgroundColor:'#ff0000'
  },
  radioStyle:{
    flex:7,
    flexDirection:"row",
    paddingLeft:10,
    width:100,
    // backgroundColor:'#ff0000'
  }
})
