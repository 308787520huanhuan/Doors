import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default {
  container: {
    flexDirection:'column',
    paddingTop: 30,
    backgroundColor: '#232324'
  },
  topPart:{
    position:'relative',
    marginBottom:30
  },
  pageTitle:{
    color:Colors.golden,
    alignSelf: 'center',
    fontWeight:"800"
  },
  backHistory:{
    position:'absolute',
    left:0,
    width:20,
    height:20
  },
  userInfo:{
    marginTop: 30,
    height:153
  },
  logo: {
    alignSelf: 'center',
    width:50,
    height:50
  },
  infoText:{
    color:Colors.snow,
    alignSelf: 'center',
    marginTop:20,
    marginBottom:15
  },
  level:{
    alignSelf:'center',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center'
  },
  userLevel1:{
    width:10,
    height:10,
    marginRight:5
  },
  levelText:{
    color:Colors.golden
  },
  opList:{
    flex:1,
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:'#232324',
    // paddingTop:10,
    paddingBottom:10
  }
}
