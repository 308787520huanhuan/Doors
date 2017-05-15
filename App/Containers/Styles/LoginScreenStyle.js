import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    paddingTop: 150,
    backgroundColor: Colors.black
  },
  content: {
  	 flexDirection: 'column'
  },
  logoSwap: {
  	flex: 1
  },
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: 120
  },
  form: {
    flex: 1,
    alignSelf: 'center'
  },
  text: {
    color: Colors.snow
  },
  btn: {
  	width: 230,
  	height: 36,
  	marginBottom: 20
  }

})
