import { FlatList, Image, Pressable, TextInput, Text, View, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect } from 'react';
import { styles } from './style';
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faVideo, faPhone, faChevronRight, faMagnifyingGlass, faUserPlus, faUserGroup, faAddressBook, faCakeCandles } from "@fortawesome/free-solid-svg-icons";
import { TabActions } from "@react-navigation/native";
import { NavigationContainer } from '@react-navigation/native';
import { useState } from "react";
import Images from "../../themes/Images";
import Avatar from "../avatar/Avatar";
import { NewGroup } from '../recommend/NewGroup';
import { io } from 'socket.io-client';
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
nhom = []
oa = [
  {
    id: 1,
    name: 'OA 1',
    avatar: require('../../../assets/img/avt.jpg'),
    status: 'Đang hoạt đoong'
  },
]

export const Contacts = ({ navigation }) => {

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
  const [dataBanBe, setDataBanBe] = useState(banBe);
  const [dataNhom, setDataNhom] = useState(nhom);
  const [dataOA, setDataOA] = useState(oa);


  const handleSearch = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toString();
    const filterData = fullData.filter((user) => {
      return contains(user, formattedQuery);
    });
    setDataBanBe(filterData);
  }
  const contains = ({ name }, query) => {
    if (name.includes(query)) {
      return true;
    }
    return false;
  }


  const getGroup = async () => {
    socket.on('user_group_chats', async (data) => {
      let group = [];
      data.map((item) => {
        group.push({
          id: item._id,
          name: item.groupName,
          avatar: require('../../../assets/img/avt.jpg'),
          status: 'Đang hoạt đoong'
        })
      })
      setDataNhom(group);
    })
    const userId = await AsyncStorage.getItem('user_id');
    socket.emit('get_user_group_chats', {userId});
  }

  const groupTab = () => {
    setDataBanBe(dataNhom)
  }

  useEffect(() => {
    getGroup();
    listenNewGroup();
  }, [])

  const listenNewGroup = async () => {
    const socketCli = await getSocket();
    socketCli.on('group_chat_created', async (data) => {
      setDataNhom((prev) => {
        return [...prev, {
          id: data._id,
          name: data.groupName,
          avatar: require('../../../assets/img/avt.jpg'),
          status: 'Đang hoạt đoong'
        }]
      })
    })
  }

  async function getSocket () {
    return await socketClient.getClientSocket();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <FontAwesomeIcon style={{ marginLeft: 15 }} color='#F1FFFF' size={27} icon={faMagnifyingGlass} />
        <TextInput style={styles.txtInHeader}
          placeholder='Tìm kiếm'
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(query) => handleSearch(query)}
        />
        <Pressable onPress={() => { navigation.navigate('Recommend') }}>
          <FontAwesomeIcon style={{ marginLeft: 60 }} color='#F1FFFF' size={22} icon={faUserPlus} />
        </Pressable>
      </View>
      <SafeAreaView style={styles.body}>
        <View style={styles.body1}>
          <View style={{ width: '30%', marginLeft: 10, alignItems: 'center' }}>
            <TouchableOpacity style={styles.button1}
              onPress={() => {
                setcolor1('blue');
                setcolor2('#FFFFFF');
                setcolor3('#FFFFFF');
                setbtn1(true);
                setbtn2(false);
                setbtn3(false);
                setDataBanBe(banBe);
              }}>
              <Text style={{ marginTop: 10, fontSize: 18, color: '#000000' }}>Bạn bè</Text>
            </TouchableOpacity>
            <View style={{ backgroundColor: colorbtn1, marginTop: 7, width: '100%', height: 2 }}></View>
          </View>
          <View style={{ width: '30%', alignItems: 'center' }}>
            <TouchableOpacity style={styles.button2}
              onPress={() => {
                setcolor1('#FFFFFF');
                setcolor2('blue');
                setcolor3('#FFFFFF');
                setbtn1(false);
                setbtn2(true);
                setbtn3(false);
                groupTab();
              }}>
              <Text style={{ marginTop: 10, fontSize: 18, color: '#000000' }}>Nhóm</Text>
            </TouchableOpacity>
            <View style={{ backgroundColor: colorbtn2, marginTop: 7, width: '100%', height: 2 }}></View>
          </View>
          <View style={{ width: '30%', marginRight: 10, alignItems: 'center' }}>
            <TouchableOpacity style={styles.button3}
              onPress={() => {
                setcolor1('#FFFFFF');
                setcolor2('#FFFFFF');
                setcolor3('blue');
                setbtn1(false);
                setbtn2(false);
                setbtn3(true);
                setDataBanBe(oa);
              }}>
              <Text style={{ marginTop: 10, fontSize: 18, color: '#000000' }}>OA</Text>
            </TouchableOpacity>
            <View style={{ backgroundColor: colorbtn3, marginTop: 7, width: '100%', height: 2 }}></View>
          </View>
        </View>
        {!btn2 ? (
          <View style={styles.body2}>
            <View style={{ padding: 10, justifyContent: 'center', backgroundColor: '#FFFFFF', width: '100%', height: '30%', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ marginLeft: 10, backgroundColor: 'blue', borderRadius: 15, height: '90%', width: '10%' }}>
                <FontAwesomeIcon style={{ marginLeft: 6, marginTop: 3 }} color='#F1FFFF' size={27} icon={faUserGroup} />
              </View>
              <Text onPress={() => navigation.navigate('Request')} style={{ marginLeft: 15, fontSize: 18, color: '#000000', width: '80%' }}>Lời mời kết bạn</Text>
            </View>

            <View style={{ padding: 10, justifyContent: 'center', backgroundColor: '#FFFFFF', width: '100%', height: '30%', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ marginLeft: 10, backgroundColor: 'blue', borderRadius: 15, height: '90%', width: '10%' }}>
                <FontAwesomeIcon style={{ marginLeft: 6, marginTop: 3 }} color='#F1FFFF' size={27} icon={faAddressBook} />
              </View>
              <View style={{ width: '83%' }}>
                <Text style={{ marginLeft: 15, fontSize: 18, color: '#000000', width: '80%' }}>Danh bạ máy</Text>
                <Text style={{ marginLeft: 15, fontSize: 14, color: 'gray', width: '80%' }}>Các liên hệ có dùng Zalo</Text>
              </View>
            </View>

            <View style={{ padding: 10, justifyContent: 'center', backgroundColor: '#FFFFFF', width: '100%', height: '30%', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ marginLeft: 10, backgroundColor: 'blue', borderRadius: 15, height: '90%', width: '10%' }}>
                <FontAwesomeIcon style={{ marginLeft: 6, marginTop: 3 }} color='#F1FFFF' size={27} icon={faCakeCandles} />
              </View>
              <View style={{ width: '83%' }}>
                <Text style={{ marginLeft: 15, fontSize: 18, color: '#000000', width: '80%' }}>Lịch sinh nhật</Text>
                <Text style={{ marginLeft: 15, fontSize: 14, color: 'gray', width: '80%' }}>Thep dõi sinh nhật của bạn bè</Text>
              </View>
            </View>
            <View style={{ width: '100%', height: '5%', backgroundColor: '#E5E5E5' }}>
            </View>
          </View>
        ) : (
          <View style={{...styles.body2, height: 65}}>
            <View style={{ padding: 10, justifyContent: 'center', backgroundColor: '#FFFFFF', width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ marginLeft: 10, backgroundColor: 'blue', borderRadius: 15, height: '90%', width: '10%' }}>
                <FontAwesomeIcon style={{ marginLeft: 6, marginTop: 3 }} color='#F1FFFF' size={27} icon={faUserGroup} />
              </View>
              <Text onPress={() => navigation.navigate('NewGroup')} style={{ marginLeft: 15, fontSize: 18, color: '#000000', width: '80%' }}>Tạo nhóm mới</Text>
            </View>
          </View>
        )}
        <View style={styles.body3}>
          <View style={styles.viewAll}>
            <TouchableOpacity style={[styles.button4, { backgroundColor: colorbtn4 }]}
              onPress={() => {
                setcolor4('#E5E5E5')
                setcolor5('#FFFFFF')
                setbtn4(true)
                setbtn5(false)
                setDataBanBe(banBe);
              }}>
              <Text style={{ fontSize: 14, color: '#000000' }}>Tất cả </Text>
              <Text style={{ marginLeft: 5, fontSize: 14, color: '#000000' }}>8</Text>

              {/* <Text style={{ fontSize: 14, color: '#000000' }}>Tất cả ({size.banBe})</Text>
              <Text style={{ marginLeft: 5, fontSize: 14, color: '#000000' }}>{size.banBe}</Text> */}
            </TouchableOpacity>
          </View>
          <View style={styles.viewAll}>
            <TouchableOpacity style={[styles.button4, { backgroundColor: colorbtn5 }]}
              onPress={() => {
                setcolor4('#FFFFFF')
                setcolor5('#E5E5E5')
                setbtn4(false)
                setbtn5(true)
                setDataBanBe(banBe);
              }}>
              <Text style={{ fontSize: 14, color: '#000000' }}>Mới truy cập</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body4}>
          <FlatList
            data={dataBanBe}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ChatDetails2', { itemId: item.id })}>
                  <View style={[styles.left_item]}>
                    <Image style={[styles.avatar_left]} source={item.avatar} />
                    {/* {item.status === 1 ? <View style={styles.dot_online} /> : <></>} */}
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                  </View>
                  <View style={styles.call}>
                    <TouchableOpacity>
                      <FontAwesomeIcon color='gray' size={22} icon={faPhone} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <FontAwesomeIcon style={{ marginLeft: 20 }} color='gray' size={22} icon={faVideo} />
                    </TouchableOpacity>

                  </View>
                </TouchableOpacity>
              )
            }} />
        </View>

      </SafeAreaView>
    </SafeAreaView>
  )
}