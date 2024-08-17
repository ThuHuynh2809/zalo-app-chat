import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { logIn, loginUser } from '../../reduxToolkit/slice/authSlice';
import { VerifyEmaill } from '../../reduxToolkit/slice/authSlice';

const VerifyEmail = ({ navigation,  route }) => {
  const { email } = route.params || {};
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();

  const handleVerifyEmail = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:3000/auth/verify', {
        email: email,
        otp: otp,
      });

      if (response.status === 200) {
        Alert.alert('Xác thực thành công!');
        const token = response.data.token;
        dispatch(loginUser(token));
        // navigation.navigate('MainScreen', { screen: 'Messages' });
      } else if (response.status === 400) {
        Alert.alert('Mã OTP không chính xác!');
      } else {
        const errorData = response.data;
        Alert.alert('Error: ' + errorData.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Có lỗi xảy ra!');
    }
  };

  const handleVerifyEmail1 = async () => { 
    const formValues = {
      email: email,
      otp: otp,
    };
    dispatch(VerifyEmaill(formValues));
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Mã OTP"
        onChangeText={text => setOtp(text)}
        value={otp}
      />
      <Button title="Xác thực" onPress={handleVerifyEmail1} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default VerifyEmail;
