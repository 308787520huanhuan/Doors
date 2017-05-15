import { StyleSheet, Dimensions} from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    height: Metrics.screenHeight,
    marginTop: Metrics.navBarHeight,
    backgroundColor: 'white'
  },
  overlay: {
    zIndex: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    opacity: 1,
    backgroundColor: '#000000'
  },

  image: {
    height: 287,
    resizeMode: 'cover',
  },

  textContainer: {
    height: 66,
    backgroundColor:Colors.white,
    paddingTop:10,
    paddingHorizontal:10
  },

  title: {
    color: Colors.dimGray,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  content: {
    color: Colors.darkGray1,
    fontSize: 14,
  },
  sperate: {
    height:10,
    backgroundColor:Colors.lightWhite
  }
})
