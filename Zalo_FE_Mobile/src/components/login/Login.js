import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons'; 
import auth from '@react-native-firebase/auth';
import Contex from '../../store/Context';
import { Alert } from 'react-native';
import { isValidEmail, isValidPassword } from '../../utilies/Validations';
import { signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { getDatabase, ref, get } from '@react-native-firebase/database';
import { SetUser } from '../../store/Actions';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { login, loginUser } from '../../reduxToolkit/slice/authSlice';

const Login = ({ navigation }) => {

  const [getPassWordVisible, setPassWordVisible] = useState(false);

  //states for validatingpp
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  //states to store email/password

  const [email, setEmail] = useState('doanthanhhao0204@gmail.com');
  const [password, setPassword] = useState('123456');

  //false: chua bamlogin
  //true: khong cho ng dung bam nut  login
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();

  const isValidationOK = () => {
    email.length > 0 &&
      password.length > 0 &&
      isValidEmail(email) == true &&
      isValidPassword(password) == true;
  };

  const handleLoginWithEmail = async () => {
    if (!email || !password) {
      Alert.alert('Please enter your email and password!!!');
    } else {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log(user);
          if (user) {
            navigation.navigate('MainScreen', { screen: 'Messages' });
          }
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  };

  const handleLoginFireBase = async () => {
    if (status) {
      Alert.alert("Đang xử lý login...");
    }

    setStatus(true);
    //send email, pass to server
    const loginFunc = async (mail, pass) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth(), mail, pass);
        const db = getDatabase();
        const userRef = ref(db, `users/${userCredential.user.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          depatch(SetUser(snapshot.val()));
          setStatus(false);
          navigation.navigate("MainScreen", { screen: "Messages" });
        } else {
          console.log("No such document!");
          setStatus(false);
        }
      } catch (error) {
        console.error(error);
        alert("Email hoặc mật khẩu không chính xác!");
        setStatus(false);
      }
    };

    console.log(email);
    console.log(password);
    loginFunc(email, password);
  };

  const handleLogin = async () => {

    if (!email || !password) {
      Alert.alert('Please enter your email and password!!!');
    } else {
      await axios.post('http://10.0.2.2:3000/auth/login', {
        email: email,
        password: password,
      })
        .then(response => {
          console.log(response.data);
          const token = response.data.user_id;
          AsyncStorage.setItem('authToken', token);
          // console.log(token);
          dispatch(login(token));
          if (response.status = 200) {
            navigation.navigate('MainScreen', { screen: 'Messages' });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  const handleLogin1 = () => {
    const formValues = {
      email: email,
      password: password,
    };
    if (!email || !password) {
      Alert.alert('Please enter your email and password!!!');
    } else if (!isValidEmail(email)) {
      Alert.alert('Email not in correct format');
    } else if (!isValidPassword(password)) {
      Alert.alert('Password must be at least 6 characters');
    } else {
      dispatch(loginUser(formValues));
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topTag}>
        <TouchableOpacity
          style={{ alignItems: 'center', marginLeft: 5 }}
          onPress={() => {
            navigation.goBack();
          }}>
          <FontAwesomeIcon icon={faArrowLeft} size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.textTopTag}>Đăng nhập</Text>
      </View>

      <View style={styles.textRemind}>
        <Text style={{ fontSize: 15 }}>
          Vui lòng nhập email và mật khẩu để đăng nhập
        </Text>
      </View>

      {/* input login*/}
      <View style={styles.input}>
        <View style={styles.viewAcc}>
          <TextInput
            style={styles.inputAcc}
            value={email}
            onChangeText={text => {
              setErrorEmail(
                isValidEmail(text) == true ? '' : 'Email not in correct format',
              );
              setEmail(text);
            }}
            placeholder="example@gmail.com"></TextInput>
        </View>
        {/* password */}
        <View style={styles.viewPassword}>
          <TextInput
            style={styles.inputPassword}
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
            placeholder="Enter your password"
            secureTextEntry={getPassWordVisible ? false : true}></TextInput>
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

        {/* recover password */}
        <View style={styles.recoverPassword}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ResetPassword')
            }}>
            <Text style={{ fontSize: 15, color: 'blue', marginTop: 15 }}>
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Ask */}
      <View style={styles.ask}>
        <TouchableOpacity>
          <Text style={{ fontSize: 15, color: 'gray' }}>Câu hỏi thường gặp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.login}
          disabled={isValidationOK() == false}
          onPress={handleLogin1}>
          <FontAwesomeIcon icon={faArrowRight} size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%',
  },
  //phan moi
  topTag: {
    display: 'flex',
    width: '100%',
    height: 45,
    backgroundColor: '#009AFA',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  textTopTag: {
    alignItems: 'center',
    marginRight: '40%',
    fontSize: 18,
    color: 'white',
  },

  textRemind: {
    width: '100%',
    height: 50,
    backgroundColor: '#b8b1b1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },

  viewPassword: {
    marginTop: 20,
    marginBottom: 10,
    width: '95%',
    height: 40,
    flexDirection: 'row',
  },

  viewAcc: {
    marginTop: 10,
    width: '95%',
    height: 40,
  },

  inputPassword: {
    width: '100%',
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    fontSize: 16,
    marginTop: 14,
  },

  inputAcc: {
    width: '100%',
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    fontSize: 16,
    marginTop: 14,
  },

  imageEye: {
    padding: 5,
    height: '100%',
    width: 40,
    position: 'absolute',
    right: 0,
    marginTop: 15,
  },

  recoverPassword: {
    marginTop: 20,
    marginBottom: 10,
    width: '95%',
    height: 40,
    flexDirection: 'row',
  },

  ask: {
    marginLeft: '5%',
    width: '95%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  login: {
    marginBottom: 20,
    marginRight: '5%',
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#2360c2',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
