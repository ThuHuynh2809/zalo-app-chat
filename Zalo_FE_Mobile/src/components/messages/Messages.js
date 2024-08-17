import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  TextInput,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faMagnifyingGlass,
  faPlus,
  faQrcode,
} from '@fortawesome/free-solid-svg-icons';
import Images from '../../themes/Images';
import Avatar from '../avatar/Avatar';
import Colors from '../../themes/Colors';
import { getAllUsers, logOut } from '../../reduxToolkit/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../reduxToolkit/slice/mainSlice';
import { io } from 'socket.io-client';

const socket = io('http://10.0.2.2:3000');

export const Messages = ({ navigation }) => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.main.users);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    console.log('users: ', users?.data);
    // dispatch(logOut());
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ChatDetails', { itemId: item._id })}>
      <View style={[styles.left_item]}>
        <Image style={[styles.avatar_left]} source={Images.avatar1} />
        {item.status == 'online' ? <View style={styles.dot_online} /> : <></>}
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
      </View>
      <View style={styles.right_item}>
        <Text
          style={[
            styles.item_time,
            {
              color:
                item.status === 1 ? Colors.black_unread : Colors.gray,
            },
          ]}>
          {item.time}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <FontAwesomeIcon
          style={{ marginLeft: 15 }}
          color="#F1FFFF"
          size={27}
          icon={faMagnifyingGlass}
        />
        <TextInput
          style={styles.txtInHeader}
          placeholder="Tìm kiếm"
          onChangeText={setValue}></TextInput>

        <Pressable>
          <FontAwesomeIcon
            style={{ marginLeft: 18 }}
            color="#F1FFFF"
            size={22}
            icon={faPlus}
          />
        </Pressable>

        <Pressable>
          <FontAwesomeIcon
            style={{ marginLeft: 20 }}
            color="#F1FFFF"
            size={22}
            icon={faQrcode}
          />
        </Pressable>
      </View>

      {/* dùng cho data từ bên server */}
      <FlatList
        data={users?.data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        initialScrollIndex={0} 
      /> 
    </SafeAreaView>
  );
};
