import { Metrics, Colors, Fonts } from '../../Themes'

export default {
  row:{
    flexDirection:'row',
    height:47
  },
  text: {
    ...Fonts.style.h5,
    fontSize:14,
    flex:9,
    marginLeft: 10,
    color: '#ffffff',
    lineHeight:47
  },
  leftImg:{
    width:25,
    height:25,
    marginTop:10,
    marginLeft:10
  },
  rightImg:{
    width:10,
    marginRight:10,
    height:10,
    marginTop:17
  },
  line: {
    width:300,
    height:1,
    backgroundColor:'#1a1a1a',
    marginLeft:2
  }
}
