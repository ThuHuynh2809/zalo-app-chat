import React, { useContext, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'; // Import icon cho tên người dùng, email và mật khẩu
import { SetUser } from '../../store/Actions';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Alert } from 'react-native';
import Contex from '../../store/Context';
import SimpleToast from 'react-native-simple-toast';
import axios from 'axios';
import { registerUser } from '../../reduxToolkit/slice/authSlice';
import { useDispatch } from 'react-redux';


const Register = ({ navigation, route }) => {
  //store
  // const { state, depatch } = useContext(Contex);
  // const {user} = state;
  //states to store email/password
  const [firstName, setFirstName] = useState('David');
  const [lastName, setLastName] = useState('Chau');
  const [email, setEmail] = useState('daviddz2k2@gmail.com');
  const [password, setPassword] = useState('123456');
  const [retypePassword, setRetypePassword] = useState('');
  const [userDataTemp, setUserDataTemp] = useState(null);
  const dispatch = useDispatch();

  //register new account

  // const handleCreateAccount = async () => {
  //   //valid email
  //   var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  //   if (!email.match(regex)) {
  //     Alert.alert('Email không đúng định dạng!!');
  //     return;
  //   } else if (password.length <= 6 || retypePassword.length <= 6) {
  //     Alert.alert('Mật khẩu phải nhiều hơn 6 ký tự!');

  //     return;
  //   } else if (password != retypePassword) {
  //     Alert.alert('Mật khẩu không trùng khớp!!');

  //     return;
  //   } else if (firstName.length === 0 || lastName.length === 0) {
  //     Alert('Họ và Tên không được bỏ trống');

  //     return;
  //   }

  //   await auth().createUserWithEmailAndPassword(email, password)
  //   .then((userCredential) => {
  //     // Signed in
  //     var user = userCredential.user;

  //     if(user){
  //       console.log(user);
  //     }
  //   }).catch(err => {
  //     console.log(err.message);
  //   });
  // }

  const handleCreateAccount = async () => {
    // Kiểm tra tính hợp lệ của dữ liệu
    //valid email
    var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!email.match(regex)) {
      Alert.alert("Email không đúng định dạng!!");
      return;
    } else if (password.length < 5 || retypePassword.length < 5) {
      Alert.alert("Mật khẩu phải nhiều hơn 4 ký tự!");

      return;
    } else if (password != retypePassword) {
      Alert.alert("Mật khẩu không trùng khớp!!");

      return;
    } else if (name.length === 0) {
      Alert("Họ và Tên không được bỏ trống");
      return;
    }

    try {
      // Đăng ký tài khoản sử dụng Firebase Auth
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      const data = {
        id: user.uid,
        name: name,
        email: email,
        password: password,
      };
      // gửi xác thực email 
      await user.sendEmailVerification();

      if (user) {
        // Lưu thông tin người dùng vào Firebase Realtime Database
        await database().ref('users/' + data.id)
          .set(data)
          .then(() => SimpleToast.show('Register Success'));

        // Lưu thông tin người dùng vào store
        depatch(SetUser(data));

        // Chuyển hướng đến trang chính
        navigation.navigate("MainScreen", { screen: "Messages" });
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Đã có lỗi xảy ra, vui lòng thử lại sau');
    }
  };

  const handleSendOTP = async () => {
    const url = 'http://10.0.2.2:3000/auth/register';
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    }

    try {
      const response = await axios.post(url, user);
      if (response.status === 200) {
        console.log('OTP sent successfully');
        navigation.navigate('VerifyEmail', { email: email });
      } else {
        console.error('Failed to send OTP:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  }

  const handleSendOTP1 = async () => {
    const formValues = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    if (dispatch(registerUser(formValues))) {
      console.log('send opt success');
      navigation.navigate('VerifyEmail', { email: email });
    }
  }


  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={{ alignItems: 'center', marginLeft: 10, marginRight: 20 }}
          onPress={() => {
            navigation.goBack();
          }}>
          <FontAwesomeIcon icon={faArrowLeft} size={20} color="white" />
        </TouchableOpacity>

        <Text style={styles.textTop}>Tạo tài khoản</Text>
      </View>
      <View style={styles.textRemind}>
        <Text style={{ fontSize: 12 }}>
          Vui lòng nhập thông tin vào form dưới đây để đăng ký
        </Text>
      </View>

      {/* body */}
      <ScrollView style={styles.body}>
        {/* name */}
        <View style={styles.inputText}>
          <Text style={{ fontSize: 18, color: 'black', marginBottom: 8 }}>
            FirstName:
          </Text>

          <TextInput
            style={styles.input}
            variant="standard"
            placeholder="Nhập họ "
            value={firstName}
            onChangeText={text => {
              setFirstName(text);
            }}
          />
        </View>

        <View style={styles.inputText}>
          <Text style={{ fontSize: 18, color: 'black', marginBottom: 8 }}>
            LastName:
          </Text>

          <TextInput
            style={styles.input}
            variant="standard"
            placeholder="Nhập tên"
            value={lastName}
            onChangeText={text => {
              setLastName(text);
            }}
          />
        </View>

        <View style={styles.inputText}>
          <Text style={{ fontSize: 18, color: 'black', marginBottom: 8 }}>
            Email:
          </Text>

          <TextInput
            style={styles.input}
            variant="standard"
            placeholder="Nhập email..."
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
          />
        </View>

        <View style={styles.inputText}>
          <Text style={{ fontSize: 18, color: 'black', marginBottom: 8 }}>
            Mật khẩu:
          </Text>

          <TextInput
            style={styles.input}
            variant="standard"
            placeholder="Nhập mật khẩu..."
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
          />
        </View>

        {/* <View style={styles.inputText}>
          <Text style={{ fontSize: 18, color: 'black', marginBottom: 8 }}>
            Nhập lại mật khẩu:
          </Text>

          <TextInput
            style={styles.input}
            variant="standard"
            placeholder="Nhập lại mật khẩu"
            onChangeText={text => {
              setRetypePassword(text);
            }}
          />
        </View> */}
      </ScrollView>
      {/* footer */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={{ width: 200, fontSize: 15, color: 'gray' }}>
            Tiếp tục nghĩa là bạn đồng ý với các điều khoản sử dụng Zalo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnRegister}
          onPress={handleSendOTP1}>
          <FontAwesomeIcon icon={faArrowRight} size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },

  header: {
    height: 60,
    backgroundColor: '#009AFA',
    alignItems: 'center',
    flexDirection: 'row',
  },

  textTop: {
    fontSize: 20,
    color: 'white',
  },

  textRemind: {
    width: '100%',
    height: 50,
    backgroundColor: '#DCD7C9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  body: {
    flex: 1,
    flexDirection: 'column',
  },

  footer: {
    height: 60,
    marginTop: 20,
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
  },

  btnRegister: {
    backgroundColor: '#2360c2',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 100,
  },

  textError: {
    color: 'red',
    fontSize: 20,
    marginBottom: 5,
  },

  inputText: {
    fontWeight: 18,
    borderBottomColor: '#F9F9F9',
    marginHorizontal: 15,
    marginTop: 15,
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    fontSize: 16,
  },
});
