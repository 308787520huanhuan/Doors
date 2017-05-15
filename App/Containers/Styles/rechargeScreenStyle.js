import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default {
  container: {
    flex: 1,
    flexDirection:'column',
    paddingTop: Metrics.navBarHeight,
    position:'relative',
    backgroundColor: Colors.snow
  },
  topPart:{
      // backgroundColor:'#ff0000'
  },

  spinnerContent:{
    position:'absolute',
    alignItems:'center',
    left:0,
    right:0,
    top:0,
    bottom:0,
    justifyContent:'center',
    flexDirection:'column'
  },
  input:{
    marginHorizontal:10,
    marginVertical:10,
    paddingLeft:10,
    borderWidth:0.5,
    borderColor:"#aaa",
    height:46,
    borderRadius:5,
    fontSize:14,
    color:'#888888',
  },
  operatContent:{
    marginTop:20,
    paddingLeft:10,
    paddingRight:10,
    // backgroundColor:'#fff000'
  },
  gray:{
    color:"#888888",
    fontSize:14,
  },
  marginTop:{
    marginTop:10
  },
  payWaysContent:{
    flex:1,
    borderTopColor:"#aaa",
    borderTopWidth:0.5,
  },
  eachWay:{
    flexDirection:'row',
    height:57,
    alignItems:'center',
    // backgroundColor:'#ff0000'
  },
  payWaysIcon:{
    width:30,
    height:30,
    marginRight:10
  }
}
