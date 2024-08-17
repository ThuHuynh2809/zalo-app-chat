import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView
} from "react-native";

import Fonts from "../../common/assets/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowCircleLeft, faAt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { ForgotPassword } from "../../reduxToolkit/slice/authSlice";

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();

  const handleResetPassword1 = async () => {
    // Xử lý logic reset password ở đây
    if (email === "") {
      setError("Vui lòng nhập email của bạn.");
      return;
    }
    const formValues = {
      email: email
    }
    // Tiến hành reset password
    const resetPassword = await dispatch(ForgotPassword(formValues));
    const token = resetPassword.token;
    console.log("token frontend ", token);
    navigation.navigate('NewPassword', {token: token});


  };

  const handleResetPassword = async () => {
    // Xử lý logic reset password ở đây
    if (email === "") {
      setError("Vui lòng nhập email của bạn.");
      return;
    }
    const formValues = {
      email: email
    }
  
    try {
      // Tiến hành reset password
      const resetPasswordResponse = await dispatch(ForgotPassword(formValues));
  
      // Trích xuất token từ phản hồi
      const token = resetPasswordResponse.data.token;
      console.log("token frontend ", token);
  
      // Điều hướng đến màn hình NewPassword và chuyển token qua
      navigation.navigate('NewPassword', {token: token});
    } catch (error) {
      console.error("Có lỗi xảy ra khi thực hiện reset password:", error);
      // Xử lý lỗi tại đây
    }
  };

  return (
    <ScrollView style={styles.mainCon}>
      <View style={{ padding: 20 }}>
        <Pressable onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faArrowCircleLeft} size={30} color="#0057ff" />
        </Pressable>
      </View>
      <View style={{ position: 'relative', bottom: 30 }}>
        <View style={styles.loginIcon}>
          <Image style={{ height: 320, width: 320, resizeMode: 'contain' }} source={require('../../common/assets/images/files/forgot.png')} />
        </View>
        <View style={styles.container}>
          <View style={styles.loginLblCon}>
            <Text style={styles.loginLbl}>Forgot Password?</Text>
          </View>
          <View style={styles.forgotDes}>
            <Text style={styles.forgotDesLbl}>
              Don't worry! It happens, please enter the address associated
              with your account
            </Text>
          </View>
          <View style={styles.formCon}>
            <View style={styles.textBoxCon}>
              <View style={styles.at}>
                <FontAwesomeIcon icon={faAt} size={20} color="#000" />
              </View>
              <View style={styles.textCon}>
                <TextInput
                  style={styles.textInput}
                  placeholder={'Email ID'}
                  placeholderTextColor={'#aaa'}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
            </View>
              {error !== '' && <Text style={styles.errorText}>{error}</Text>}
          </View>

          <View style={[styles.loginCon, { marginTop: 40 }]}>
            <Pressable
              style={styles.LoginBtn}
              onPress={handleResetPassword}>
              <Text style={styles.loginBtnLbl}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

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

  textBoxCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCon: {
    width: '90%',
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

  forgotDes: {
    position: 'relative',
    bottom: 35,
  },
  forgotDesLbl: {
    color: '#000',
    fontFamily: Fonts.type.NotoSansRegular,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    fontFamily: Fonts.type.NotoSansRegular,
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default ResetPasswordScreen;
