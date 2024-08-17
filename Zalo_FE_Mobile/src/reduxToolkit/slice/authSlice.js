import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    isLoading: false,
    token: '',
    email: '',
    error: false,
    users: [],
    user: {},
    auth: '',
  },
  reducers: {
    authInfor(state, action) {
      state.auth = action.payload.userId;
    },
    updateIsLoading(state, action) {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    },
    logIn(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    logOut(state) {
      state.isLoggedIn = false;
      state.token = '';
    },
    updateRegisterEmail(state, action) {
      state.email = action.payload.email;
    },
    getUsers(state, action) {
      state.users = action.payload;
    },
    getUserByID(state, action) {
      state.user = action.payload;
    },
    updateUserProfileSuccess(state, action) {
      state.user = action.payload;
    }
  },
});

export const {
  authInfor,
  updateIsLoading,
  logIn,
  logOut,
  updateRegisterEmail,
  getUsers,
  getUserByID,
  updateUserProfileSuccess
} = authSlice.actions;

export const updateUserProfile = (userId, updatedUserData) => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const url = `http://10.0.2.2:3000/users/updateMe/${userId}`;
    console.log('Request URL:', url);
    console.log('Request Data:', updatedUserData);

    const response = await axios.patch(
      url,
      updatedUserData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Gửi token trong headers
        },
      }
    );

    if (response.status === 200 && response.data.status === 'success') {
      console.log('Response Data:', response.data);
      dispatch(updateUserProfileSuccess(response.data.data));
      Alert.alert('Profile updated successfully!');
    } else {
      console.log('Error updating profile:', response.data.message);
      Alert.alert('Error updating profile!');
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error('Error updating profile: Endpoint not found');
      Alert.alert('Error updating profile: Endpoint not found!');
    } else if (error.response && error.response.status === 401) {
      console.error('Error updating profile: Unauthorized');
      Alert.alert('Error updating profile: Unauthorized!');
    } else {
      console.error('Error updating profile:', error.message);
      Alert.alert('Error updating profile!');
    }
  }
};


export const loginUser = formValues => async dispatch => {
  try {
    const response = await axios.post(
      'http://10.0.2.2:3000/auth/login',
      {...formValues},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    dispatch(logIn({token: response.data.token}));
    await AsyncStorage.setItem('user_id', response.data.user_id);
    await AsyncStorage.setItem('token', response.data.token);
    const user = await AsyncStorage.getItem('user_id');
    dispatch(authInfor({userId: user}));
    console.log('userlogin: ', user);
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = () => async dispatch => {
  const user = await AsyncStorage.getItem('user_id');
  console.log('userlogout: ', user);
  await AsyncStorage.removeItem('user_id');
  await AsyncStorage.removeItem('token');
  dispatch(logOut());
};

export const registerUser = formValues => {
  return async dispatch => {
    try {
      const response = await axios.post(
        'http://10.0.2.2:3000/auth/register',
        {...formValues},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      dispatch(updateRegisterEmail({email: response.data.email}));
      console.log(response.data.email);
    } catch (err) {
      console.log(err);
    }
  };
};

export const VerifyEmaill = formValues => {
  return async dispatch => {
    try {
      const response = await axios.post(
        'http://10.0.2.2:3000/auth/verify',
        {...formValues},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        Alert.alert('Xác thực thành công!');
        const token = response.data.token;
        dispatch(logIn({token: token}));

        await AsyncStorage.setItem('user_id', response.data.user_id);
        const user = await AsyncStorage.getItem('user_id');

        console.log('userlogin: ', user);
      } else if (response.status === 400) {
        Alert.alert('Mã OTP không chính xác!');
      } else {
        const errorData = response.data;
        Alert.alert('Error: ' + errorData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllUsers = () => {
  return async dispatch => {
    try {
      const response = await axios.get(
        'http://10.0.2.2:3000/users/getAllUsers',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      dispatch(getUsers(response.data));
    } catch (error) {
      console.log(error);
      // Xử lý lỗi nếu cần
    }
  };
};

export const getUserById = userId => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        `http://10.0.2.2:3000/users/getUser/${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        },
      );

      dispatch(getUserByID({user :response.data}));
      AsyncStorage.setItem('userData', JSON.stringify(response.data));
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const ForgotPassword = formValues => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(
        'http://10.0.2.2:3000/auth/forgot-password',
        {
          ...formValues,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // Trả về phản hồi của axios để có thể truy cập vào dữ liệu
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const SetNewPassword = formValues => {
  return async dispatch => {
    try {
      const response = await axios.post(
        'http://10.0.2.2:3000/auth/reset-password',
        {
          ...formValues,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        Alert.alert('Đổi mật khẩu thành công!');
        const token = response.data.token;
        dispatch(logIn({token: token}));

        await AsyncStorage.setItem('user_id', response.data.user_id);
        const user = await AsyncStorage.getItem('user_id');

        console.log('userlogin: ', user);
      } else {
        Alert.alert('Đổi mật khẩu không thành công!');
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export default authSlice.reducer;
