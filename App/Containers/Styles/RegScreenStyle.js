import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: Colors.black
  },
  topPart:{
    position:'relative',
    marginBottom:16
  },
  backHistory:{
    position:'absolute',
    left:0,
    width:20,
    height:20
  },
  pageTitle:{
    color:Colors.golden,
    alignSelf: 'center',
    fontWeight:"800"
  },
  row:{
    paddingLeft:10,
    paddingRight:10,
    position:'relative'
  },
  input:{
    borderWidth:1,
    borderColor:Colors.golden,
    height:35,
    color:Colors.snow,
    fontSize:14,
    backgroundColor:'#00ff00'
  },
  cd: {
    width:120,
    height:35,
    paddingLeft:10,
    paddingRight:10,
    marginTop:-35,
    backgroundColor:Colors.golden,
  },

  warningInfo:{
    color:Colors.wrong,
    marginBottom:10,
    marginTop:10,
    left:-10,
    fontSize:12,
  },
  step3Warn:{
    color:'gray',
    left:-10,
    marginBottom:10,
    marginTop:10
  },
  regBtn:{
    marginTop:32,
    backgroundColor:Colors.golden,
    height:35,
    borderRadius:0
  },
  btnText:{
    color:'white',
    fontSize:14,
    alignSelf:'center',
    lineHeight:28
  },
  valBtn:{
    position:'absolute',
    width:120,
    right:10,
    top:0
  },
  valBtnNone:{
    right:-300
  }
})
