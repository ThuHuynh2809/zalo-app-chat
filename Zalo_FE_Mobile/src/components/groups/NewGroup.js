import { FlatList, Image, Pressable, TextInput, Text, View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect } from 'react';
import { styles } from './style';
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faVideo, faPhone, faChevronRight, faMagnifyingGlass, faUserPlus, faUserGroup, faAddressBook, faCakeCandles, faPlus, faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { TabActions } from "@react-navigation/native";
import { NavigationContainer } from '@react-navigation/native';
import { useState } from "react";
import Images from "../../themes/Images";
import Avatar from "../avatar/Avatar";
import { io } from 'socket.io-client';
import { fetchRecommendFriends, fetchUser } from '../../reduxToolkit/slice/mainSlice';
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import socketClient from "../../socket/socketClient";

const socket = io('http://10.0.2.2:3000');

/*
* Giao diện danh bạ zalo
*/
banBe = [
  {
    id: 0,
    name: "Alex",
    statusOn: 1,
    avatar: Images.avatar1,
    moment: 1,
    lastMessage: "You sent a sticker",
    time: "5:30 PM",
    status: 2
  },
  {
    id: 1,
    name: "Jeff",
    statusOn: 1,
    avatar: Images.avatar2,
    moment: 0,
    lastMessage: "You sent a sticker",
    time: "5:30 PM",
    status: 0
  },
  {
    id: 2,
    name: "Wilma",
    statusOn: 0,
    avatar: Images.avatar3,
    moment: 1,
    lastMessage: "You sent a sticker",
    time: "5:30 PM",
    status: 1
  },
  {
    id: 3,
    name: "Lind",
    statusOn: 1,
    avatar: Images.avatar1,
    moment: 1,
    lastMessage: "You sent a sticker",
    time: "5:30 PM",
    status: 1
  },
  {
    id: 4,
    name: "Alex",
    statusOn: 0,
    avatar: Images.avatar2,
    moment: 0,
    lastMessage: "You sent a sticker",
    time: "5:30 PM",
    status: 0
  },
  {
    id: 5,
    name: "Jeff",
    statusOn: 1,
    avatar: Images.avatar3,
    moment: 1,
    lastMessage: "You sent a sticker",
    time: "5:30 PM",
    status: 1
  },

  {
    id: 6,
    name: "Wilma",
    statusOn: 0,
    avatar: Images.avatar3,
    moment: 1,
    lastMessage: "You sent a sticker",
    time: "5:30 PM",
    status: 1
  },
  {
    id: 7,
    name: "X",
    statusOn: 0,
    avatar: Images.avatar3,
    moment: 1,
    lastMessage: "You sent a sticker",
    time: "5:30 PM",
    status: 1
  },
  {
    id: 8,
    name: "Y",
    statusOn: 0,
    avatar: Images.avatar3,
    moment: 1,
    lastMessage: "You sent a sticker",
    time: "5:30 PM",
    status: 1
  },
]

export const NewGroup = ({ navigation }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.main.users);

  const [colorbtn2, setcolor2] = useState('#FFFFFF');
  const [colorbtn1, setcolor1] = useState('blue');
  const [colorbtn3, setcolor3] = useState('#FFFFFF');
  const [colorbtn4, setcolor4] = useState('#E5E5E5');
  const [colorbtn5, setcolor5] = useState('#FFFFFF');
  const [btn1, setbtn1] = useState(true);
  const [btn2, setbtn2] = useState(false);
  const [btn3, setbtn3] = useState(false);
  const [btn4, setbtn4] = useState(false);
  const [btn5, setbtn5] = useState(false);
  const [fullData, setFullData] = useState(dataBanBe);
  const [searchQuery, setSearchQuery] = useState("");
  const [dataBanBe, setDataBanBe] = useState([]);
  const [dataNhom, setDataNhom] = useState(nhom);
  const [dataOA, setDataOA] = useState(oa);
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState([]);

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      let userList = [];
      users.data.map((item) => {
        userList.push({
          id: item._id,
          name: `${item.firstName} ${item.lastName}`,
          avatar: Images.avatar3
        })
      })
      setDataBanBe(userList);
    }
  }, [users])

  const handleSearch = async (e) => {
    console.log(e);
  };

  const newGroup = async () => {
    async function getSocket () {
        return await socketClient.getClientSocket();
    }

    const userId = await AsyncStorage.getItem('user_id');

    const socket = await getSocket();
    if (socket) {
        socket.emit('create_group_chat', {
            groupName: groupName,
            participants: members,
            admin: userId,
        })
        socket.on('group_chat_created', (data) => {
            setMembers([]);
            setGroupName('');
        })
    }
  }

  const addToList = (id) => {
    setMembers((prevMembers) => {
        if (prevMembers.includes(id)) {
          return prevMembers.filter(memberId => memberId !== id);
        } else {
          return [...prevMembers, id];
        }
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <Pressable onPress={() => navigation.goBack()}>
          <FontAwesomeIcon style={{ marginLeft: 15 }} color='#F1FFFF' size={27} icon={faArrowLeft} />
        </Pressable>
        <TextInput style={styles.txtInHeader}
          placeholder='Tìm kiếm'
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(query) => handleSearch(query)}
        />
        <FontAwesomeIcon style={{ marginLeft: 60 }} color='#F1FFFF' size={27} icon={faMagnifyingGlass} />
      </View>
      <SafeAreaView style={styles.body}>

        <View style={styles2.viewAcc}>
            <TextInput
                style={styles2.inputAcc}
                value={groupName}
                onChangeText={text => {
                    setGroupName(text);
                }}
                placeholder="Tên nhóm">
            </TextInput>
        </View>
        
        <View style={styles2.body}>
          <FlatList
            data={dataBanBe}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                    style={[
                        styles.item,
                        members.includes(item.id) ? { backgroundColor: '#009AFA' } : {}
                    ]}
                    onPress={()=>{addToList(item.id)}}
                >
                  <View style={[styles.left_item]}>
                    <Image style={[styles.avatar_left]} source={item.avatar} />
                    {/* {item.status === 1 ? <View style={styles.dot_online} /> : <></>} */}
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )
            }} />
        </View>

        <View style={styles2.ask}>
            <TouchableOpacity>
                <Text style={{ fontSize: 15, color: 'gray' }}>Tạo nhóm mới</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles2.login}
                disabled={groupName.length == 0}
                onPress={newGroup}
            >
                <FontAwesomeIcon icon={faArrowRight} size={20} color="white" />
            </TouchableOpacity>
        </View>

      </SafeAreaView>
    </SafeAreaView>
  )
}

const styles2 = StyleSheet.create({
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

    body: {
        height: '80%'
    }
  });