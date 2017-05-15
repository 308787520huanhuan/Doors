import { StyleSheet, Dimensions} from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding,
  },

  image: {
    width: Metrics.screenWidth,
    height: 196,
  },

  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderBottomWidth:5,
    borderBottomColor:Colors.darkBlack
  },

  enTitle: {
    fontSize: 22,
    textAlign: 'center',
    paddingTop: 54,
    fontWeight: 'bold',
    color: 'white',
  },

  chTitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20,
    color: 'white',
    // shadowOffset: {
    //   width: 0,
    //   height: 0
    // },
    // shadowRadius: 1,
    // shadowColor: 'black',
    // shadowOpacity: 0.8
  },

  url: {
    opacity: 0.5,
    fontSize: 10,
    position: 'absolute',
    color: 'white',
    left: 5,
    bottom: 5
  }
})
