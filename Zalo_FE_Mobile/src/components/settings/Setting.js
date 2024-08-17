import { Pressable, ScrollView, Text, View } from 'react-native'
import React from 'react'
import { styles } from './style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRightFromBracket, faBrush, faChevronLeft, faChevronRight, faCircleInfo, faCircleNotch, faCloudArrowDown, faMagnifyingGlass,  faPhone, faShieldVirus, faUserGear, faUserLock } from '@fortawesome/free-solid-svg-icons'
import { faAddressBook, faBell, faCircleQuestion, faClock, faCommentDots } from '@fortawesome/free-regular-svg-icons'
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../reduxToolkit/slice/authSlice'

export const Setting = ({navigation}) => {

    const dispatch = useDispatch();
  
    const handleLogout = () => {
      dispatch(logoutUser());
    };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.pressBack} onPress={()=> {navigation.navigate('Me')}}>
          <FontAwesomeIcon icon={faChevronLeft} style={{marginLeft: 10}} color='#F5F8FF' size={20} />
          <Text style={styles.txtInHeader}>Cài đặt</Text> 
        </Pressable>
        <FontAwesomeIcon style={{marginLeft: 230}} color='#F1FFFF' size={23} icon={faMagnifyingGlass} />
      </View>

      <ScrollView style={styles.body}>        
        <Pressable style={styles.pressShield}  onPress={()=>{alert('Tài khoản và bảo mật')}}>
          <FontAwesomeIcon style={{marginLeft: 20}} size={22} color='#1A66D4' icon={faShieldVirus} />
          <Text style={[styles.txtViewShiled, styles.viewShiled]}>Tài khoản và bảo mật</Text>
          <FontAwesomeIcon size={15} color='#6E6E6E' style={{marginLeft: 126}} icon={faChevronRight}/>
        </Pressable> 

        {/* Làm màu kẻ vạch ngang */}
        <View style={styles.line}>
          <View style={styles.line1} >
            <Text> </Text>
          </View>
          <View style={styles.line2}>
            <Text> </Text>
          </View>
        </View>
        
        <Pressable style={styles.pressPrivacy}  onPress={()=>{alert('Quyền riêng tư')}}>
          <FontAwesomeIcon style={{marginLeft: 20}} size={22} color='#1A66D4' icon={faUserLock} />
          <Text style={[styles.txtViewShiled, styles.viewShiled]}>Quyền riêng tư</Text>
          <FontAwesomeIcon size={15} color='#6E6E6E' style={{marginLeft: 175}} icon={faChevronRight}/>
        </Pressable>

        <Pressable style={styles.pressData}  onPress={()=>{alert('Dung lượng và dữ liệu')}}>
          <FontAwesomeIcon style={{marginLeft: 20}} size={22} color='#1A66D4' icon={faCircleNotch} />
          <View style={styles.viewShiled}>
            <Text style={styles.txtViewShiled}>Dung lượng và dữ liệu</Text>
            <Text style={styles.txtViewData}>Quản lý dữ liệu Zalo X của bạn</Text>
          </View>
          <FontAwesomeIcon size={15} color='#6E6E6E' style={{marginLeft: 92}} icon={faChevronRight}/>
        </Pressable>

         {/* Làm màu kẻ vạch ngang */}
        <View style={styles.line}>
          <View style={styles.line1} >
            <Text> </Text>
          </View>
          <View style={styles.line2}>
            <Text> </Text>
          </View>
        </View>

        <Pressable style={styles.pressRestore}  onPress={()=>{alert('Sao lưu và khôi phục')}}>
          <FontAwesomeIcon style={{marginLeft: 20}} size={22} color='#1A66D4' icon={faCloudArrowDown} />
          <View style={styles.viewShiled}>
            <Text style={styles.txtViewShiled}>Sao lưu và khôi phục</Text>
            <Text style={styles.txtViewData}>Bảo vệ tin nhắn khi cài lại Zalo</Text>
          </View>
          <FontAwesomeIcon size={15} color='#6E6E6E' style={{marginLeft: 94}} icon={faChevronRight}/>
        </Pressable>

        <Pressable style={styles.pressNoti}  onPress={()=>{alert('Thông báo')}}>
          <FontAwesomeIcon style={{marginLeft: 20}} size={22} color='#1A66D4' icon={faBell} />
          <Text style={[styles.txtViewShiled, styles.viewShiled]}>Thông báo</Text>
          <FontAwesomeIcon size={15} color='#6E6E6E' style={{marginLeft: 208}} icon={faChevronRight}/>
        </Pressable>

         {/* Làm màu kẻ vạch ngang */}
         <View style={styles.line}>
          <View style={styles.line1} >
            <Text> </Text>
          </View>
          <View style={styles.line2}>
            <Text> </Text>
          </View>
        </View>

        <Pressable style={styles.pressMess}  onPress={()=>{alert('Tin nhắn')}}>
          <FontAwesomeIcon style={{marginLeft: 20}} size={22} color='#1A66D4' icon={faCommentDots} />
          <Text style={[styles.txtViewShiled, styles.viewShiled]}>Tin nhắn</Text>
          <FontAwesomeIcon size={15} color='#6E6E6E' style={{marginLeft: 225}} icon={faChevronRight}/>
        </Pressable>

         {/* Làm màu kẻ vạch ngang */}
         <View style={styles.line}>
          <View style={styles.line1} >
            <Text> </Text>
          </View>
          <View style={styles.line2}>
            <Text> </Text>
          </View>
        </View>

        <Pressable style={styles.pressCall}  onPress={()=>{alert('Cuộc gọi')}}>
          <FontAwesomeIcon style={{marginLeft: 20}} size={22} color='#1A66D4' icon={faPhone} />
          <Text style={[styles.txtViewShiled, styles.viewShiled]}>Cuộc gọi</Text>
          <FontAwesomeIcon size={15} color='#6E6E6E' style={{marginLeft: 223}} icon={faChevronRight}/>
        </Pressable>

         {/* Làm màu kẻ vạch ngang */}
         <View style={styles.line}>
          <View style={styles.line1} >
            <Text> </Text>
          </View>
          <View style={styles.line2}>
            <Text> </Text>
          </View>
        </View>

        <Pressable style={styles.pressContacts}  onPress={()=>{alert('Nhật ký')}}>
          <FontAwesomeIcon style={{marginLeft: 20}} size={22} color='#1A66D4' icon={faClock} />
          <Text style={[styles.txtViewShiled, styles.viewShiled]}>Nhật ký</Text>
          <FontAwesomeIcon size={15} color='#6E6E6E' style={{marginLeft: 233}} icon={faChevronRight}/>
        </Pressable>
        
         {/* Làm màu kẻ vạch ngang */}
         <View style={styles.line}>
          <View style={styles.line1} >
            <Text> </Text>
          </View>
          <View style={styles.line2}>
            <Text> </Text>
          </View>
        </View>

        <Pressable style={styles.pressDiary}  onPress={()=>{alert('Danh bạ')}}>
          <FontAwesomeIcon style={{marginLeft: 20}} size={22} color='#1A66D4' icon={faAddressBook} />
          <Text style={[styles.txtViewShiled, styles.viewShiled]}>Danh bạ</Text>
          <FontAwesomeIcon size={15} color='#6E6E6E' style={{marginLeft: 227}} icon={faChevronRight}/>
        </Pressable>
        
         {/* Làm màu kẻ vạch ngang */}
         <View style={styles.line}>
          <View style={styles.line1} >
            <Text> </Text>
          </View>
          <View style={styles.line2}>
            <Text> </Text>
          </View>
        </View>

        <Pressable style={styles.pressThemes}  onPress={()=>{alert('Giao diện và ngôn ngữ')}}> 
          <FontAwesomeIcon style={{marginLeft: 20}} size={22} color='#1A66D4' icon={faBrush} />
          <Text style={[styles.txtViewShiled, styles.viewShiled]}>Giao diện và ngôn ngữ</Text>
          <FontAwesomeIcon size={15} color='#6E6E6E' style={{marginLeft: 112}} icon={faChevronRight}/>
        </Pressable>

        <Pressable style={styles.pressDetail}  onPress={()=>{alert('Thông tin về Zalo X')}}> 
          <FontAwesomeIcon style={{marginLeft: 20}} size={22} color='#1A66D4' icon={faCircleInfo} />
          <Text style={[styles.txtViewShiled, styles.viewShiled]}>Thông tin về Zalo X</Text>
          <FontAwesomeIcon size={15} color='#6E6E6E' style={{marginLeft: 139}} icon={faChevronRight}/>
        </Pressable>

        <Pressable style={styles.pressSupport}  onPress={()=>{alert('Liên hệ hỗ trợ')}}> 
          <FontAwesomeIcon style={{marginLeft: 20}} size={22} color='#1A66D4' icon={faCircleQuestion} />
          <Text style={[styles.txtViewShiled, styles.viewShiled]}>Liên hệ hỗ trợ</Text>
          <FontAwesomeIcon size={18} color='#6E6E6E' style={{marginLeft: 178}} icon={faCommentDots}/>
        </Pressable>

        <Pressable style={styles.pressSwitchAcc}  onPress={()=>{alert('Chuyển tài khoản')}}> 
          <FontAwesomeIcon style={{marginLeft: 20}} size={22} color='#1A66D4' icon={faUserGear} />
          <Text style={[styles.txtViewShiled, styles.viewShiled]}>Chuyển tài khoản</Text>
          <FontAwesomeIcon size={15} color='#6E6E6E' style={{marginLeft: 155}} icon={faChevronRight}/>
        </Pressable>

        {/* Làm màu kẻ vạch ngang */}
        <View style={styles.line}>
          <View style={styles.line1} >
            <Text> </Text>
          </View>
          <View style={styles.line2}>
            <Text> </Text>
          </View>
        </View>

        <View style={styles.viewLogout}> 
          <Pressable style={styles.pressLogout} onPress={handleLogout}> 
            <FontAwesomeIcon icon={faArrowRightFromBracket} size={20} />
            <Text style={{fontSize: 20, fontWeight: '500'}}>  Đăng xuất</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

