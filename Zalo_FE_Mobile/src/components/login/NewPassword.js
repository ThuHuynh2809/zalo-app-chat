import React, {Component, useState} from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Fonts from '../../common/assets/fonts';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowCircleLeft,
  faEye,
  faEyeSlash,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { SetNewPassword } from '../../reduxToolkit/slice/authSlice';

const NewPassword = ({navigation, route}) => {
  const [getPassWordVisible, setPassWordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {token} = route.params || {}
  const dispatch = useDispatch();

  const handleSetNewPassword = async () => {
    // Xử lý logic reset password ở đây
    if (password === '' || confirmPassword === '') {
      Alert.alert("Vui lòng nhập mật khẩu và xác nhận mật khẩu.");
      return;
    } else if (password !== confirmPassword) {
      Alert.alert("Mật khẩu không khớp.");
      return;
    }
  
    const formValues = {
      token: token,
      password: password
    }
  
    // Tiến hành tạo mật khẩu mới
    await dispatch(SetNewPassword(formValues));
  };

  return (
    <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
      <View style={{padding: 20}}>
        <Pressable onPress={() => navigation.goBack(null)}>
          <FontAwesomeIcon icon={faArrowCircleLeft} size={30} color="#0057ff" />
        </Pressable>
      </View>
      <View style={{position: 'relative', bottom: 30}}>
        <View style={styles.loginIcon}>
          <Image
            style={{height: 320, width: 320, resizeMode: 'contain'}}
            source={require('../../common/assets/images/files/reset.png')}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.loginLblCon}>
            <Text style={styles.loginLbl}>Reset Password</Text>
          </View>
          <View style={styles.formCon}>
            <View style={[styles.textBoxCon]}>
              <View style={styles.at}>
                <FontAwesomeIcon icon={faLock} size={20} color="gray" />
              </View>
              <View style={[styles.passCon]}>
                <View style={styles.textCon}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={'New Password'}
                    placeholderTextColor={'#aaa'}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={getPassWordVisible ? false : true}
                  />
                </View>
                <View style={styles.show}>
                  <TouchableOpacity
                    onPress={() => {
                      setPassWordVisible(!getPassWordVisible);
                    }}>
                    {getPassWordVisible ? (
                      <FontAwesomeIcon
                        style={styles.imageEye}
                        icon={faEye}
                        size={24}
                        color="gray"
                      />
                    ) : (
                      <FontAwesomeIcon
                        style={styles.imageEye}
                        icon={faEyeSlash}
                        size={24}
                        color="gray"
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={[styles.textBoxCon, {marginTop: 30}]}>
              <View style={styles.at}>
                <FontAwesomeIcon icon={faLock} size={20} color="gray" />
              </View>
              <View style={[styles.passCon]}>
                <View style={styles.textCon}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={'Confirm Password'}
                    placeholderTextColor={'#aaa'}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={getPassWordVisible ? false : true}
                  />
                </View>
                <View style={styles.show}>
                  <TouchableOpacity
                    onPress={() => {
                      setPassWordVisible(!getPassWordVisible);
                    }}>
                    {getPassWordVisible ? (
                      <FontAwesomeIcon
                        style={styles.imageEye}
                        icon={faEye}
                        size={24}
                        color="gray"
                      />
                    ) : (
                      <FontAwesomeIcon
                        style={styles.imageEye}
                        icon={faEyeSlash}
                        size={24}
                        color="gray"
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={{marginTop: 30}}>
            <Pressable style={styles.LoginBtn} onPress={handleSetNewPassword}>
              <Text style={styles.loginBtnLbl}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: '#fff',
    flex: 1,
  },
  loginIcon: {
    alignSelf: 'center',
  },
  formCon: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  container: {
    paddingHorizontal: 20,
  },
  loginLblCon: {
    position: 'relative',
    bottom: 40,
  },
  loginLbl: {
    color: '#000',
    fontSize: 40,
    fontFamily: Fonts.type.NotoSansExtraBold,
  },
  at: {
    alignSelf: 'center',
    width: '10%',
  },
  show: {
    alignSelf: 'center',
    width: '10%',
    position: 'relative',
    right: 20,
    zIndex: 10,
  },
  textBoxCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCon: {
    width: '90%',
  },
  passCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    borderBottomColor: '#aaa',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    color: '#000',
    fontSize: 16,
    fontFamily: Fonts.type.NotoSansMedium,
    height: 40,
  },
  forgotAction: {
    paddingVertical: 20,
  },
  registerCon: {flexDirection: 'row', justifyContent: 'center', paddingTop: 10},
  registerLbl: {color: '#0057ff', fontFamily: Fonts.type.NotoSansSemiBold},
  registerNew: {
    color: '#aaa',
    fontFamily: Fonts.type.NotoSansSemiBold,
  },
  forgotLbl: {
    color: '#0057ff',
    textAlign: 'right',
    fontFamily: Fonts.type.NotoSansSemiBold,
  },
  LoginBtn: {
    backgroundColor: '#0057ff',
    borderRadius: 20,
  },
  loginBtnLbl: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Fonts.type.NotoSansBlack,
    color: '#fff',
    paddingVertical: 10,
  },
  devider: {
    borderBottomColor: '#aaa',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 20,
  },
  or: {
    color: '#aaa',
    textAlign: 'center',
    backgroundColor: '#fff',
    width: 60,
    alignSelf: 'center',
    fontFamily: Fonts.type.NotoSansSemiBold,
    position: 'relative',
    bottom: 13,
  },
  deviderCon: {
    paddingVertical: 10,
  },
  googleIconCon: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 20,
    paddingHorizontal: 30,
  },
  googleLbl: {
    color: '#000',
    textAlign: 'center',
    paddingHorizontal: 30,
    fontFamily: Fonts.type.NotoSansBlack,
  },
  imageEye: {
    padding: 5,
    height: '100%',
    width: 45,
    position: 'absolute',
    right: 15,
    top: -15,
  },
});
