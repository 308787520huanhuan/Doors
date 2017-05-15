import React, {PropTypes} from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/AddressScreenStyle'
import {Images, Metrics} from '../Themes'
import addressActions from '../Redux/addressRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Toast, {DURATION} from 'react-native-easy-toast'
import CheckBox from 'react-native-checkbox'


// I18n
import I18n from 'react-native-i18n'

class addressScreen extends React.Component {

  // 构造函数
  constructor (props) {
    super(props)
    this.state = {
      phone: '',
      verification: '',
      invitation:'',
      checked:false,
      visibleHeight: Metrics.screenHeight
    }
  }
  //获得收货地址列表
  componentDidMount () {

    this.props.attemptGetAddress(this.props.token)

    //请求列表失败 报错
    if(this.props.address.error != null){
        Alert.alert("地址列表",this.props.error)
    }
  }

  //操作成功之后
  componentWillReceiveProps(nextProps){
    if(nextProps.address.success != null){
      this.refs.toast.show(nextProps.address.success)
    }
    if(nextProps.address.error != null){
      this.refs.toast.show(nextProps.address.error)
    }
  }
  //设置为默认地址
  handleChecked = (data) =>{
    var is_default = data.is_default == 0 ? 1 : 0
    this.props.setDefaultAddress(data.id,this.props.token,data.consignee,data.consignee_phone,data.consignee_address,is_default,2)
  }
  //删除地址
  deleteAddress = (id) =>{
    Alert.alert(
      '删除地址',
      '确定删除当前地址？',
      [
        {text: '取消', onPress: () => console.log('Cancel Pressed!')},
        {text: '确定', onPress: () => this.props.attemptDeleteAddress(id,this.props.token)},
      ]
    )
  }
  render () {
    const { addressList } = this.props.address

    if(addressList == null){
      return null
    }

    if(addressList.length == 0){
      return (
        <View contentContainerStyle={{justifyContent: 'center'}} style={[Styles.noAddress, {height: this.state.visibleHeight}]}>
          <Image source={Images.location} style={Styles.location}/>
          <Text style={Styles.warming} href="pageTitle">您还没有收货地址哦！</Text>
          <TouchableHighlight style={Styles.noAddAddress} underlayColor='#ca8b1f' onPress={() => NavigationActions.addAddress({id: '',model:'add'})}>
            <Text style={Styles.btnText}>新建地址</Text>
          </TouchableHighlight>
      </View>
      )
    }

    return (
      <View contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container,{height: this.state.visibleHeight}]}>
        <ScrollView style={Styles.scrollView}>
          {
            addressList.map((c) => (
                <View style={Styles.scrollList} key={c.id}>
                  <View style={Styles.toInfo}>
                      <Text style={Styles.userName}>{c.consignee}</Text>
                      <Text style={Styles.phone}>{c.consignee_phone}</Text>
                  </View>
                  <View style={Styles.detailContent}>
                    <Text style={Styles.addressDetail}>{c.consignee_address}</Text>
                  </View>
                  <View style={Styles.bottomContent}>
                    <View style={Styles.bottomContentLeft}>
                      <CheckBox label='默认地址' checked={c.is_default == 0 ? true:false} labelStyle={Styles.checkLabel} checkboxStyle={Styles.checkboxStyle} containerStyle={Styles.containerStyle} uncheckedImage={Images.checked} checkedImage={Images.check} onChange={()=>{this.handleChecked(c)}}/>
                    </View>
                    <View style={Styles.bottomContentRight}>
                      <TouchableHighlight onPress={() => NavigationActions.addAddress({id: c.id,model:'edit'})} underlayColor='#fff'>
                        <View style={{flexDirection: 'row',paddingRight:10,alignItems:'center',justifyContent:'center'}}>
                        <Image source={Images.edit} style={Styles.operation}/>
                        <Text style={Styles.operationText}>编辑</Text>
                        </View>
                      </TouchableHighlight>

                      <TouchableHighlight onPress={()=>{this.deleteAddress(c.id)}} underlayColor='#fff'>
                          <View style={{flexDirection: 'row',alignItems:'center',justifyContent:'center'}}>
                          <Image source={Images.delete} style={Styles.operation}/>
                          <Text style={Styles.operationText}>删除</Text>
                          </View>
                      </TouchableHighlight>
                      {/* <TouchableHighlight onPress={()=>{this.deleteAddress(c.id)}} underlayColor='#fff'>
                        <Text style={Styles.operationText}>删除</Text>
                      </TouchableHighlight> */}
                    </View>
                  </View>
                </View>
            )
          )
          }
        </ScrollView>
        <View style={Styles.addBtnTextContent}>
            <TouchableHighlight style={Styles.AddAddress} underlayColor='#ca8b1f' onPress={() => NavigationActions.addAddress({id: '',model:'add'})}>
                <Text style={Styles.addBtnText}>新建地址</Text>
            </TouchableHighlight>
        </View>
        <Toast ref='toast' />
      </View>
    )
  }
}
addressScreen.propTypes = {
  dispatch: PropTypes.func,
  attemptDeleteAddress: PropTypes.func,
  setDefaultAddress: PropTypes.func,
  attemptGetAddress: PropTypes.func
}

const mapStateToProps = state => {
  return {
    token:state.user.token,
    address:state.address
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptGetAddress: (token) => dispatch(addressActions.getAddressRequest(token)),
    setDefaultAddress: (id,token,consignee,consignee_phone,consignee_address,is_default,model) => dispatch(addressActions.setDefaultAddress(id,token,consignee,consignee_phone,consignee_address,is_default,model)),
    attemptDeleteAddress: (id,token) => dispatch(addressActions.deleteAddressRequest(id,token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(addressScreen)
