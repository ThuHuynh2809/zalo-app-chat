import { FlatList, Image, Pressable, TextInput, Text, View, ScrollView, TouchableOpacity, Button } from "react-native";
import React, { useEffect } from 'react';
import { styles } from './style';
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faCheckSquare, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { TabActions } from "@react-navigation/native";
import { NavigationContainer } from '@react-navigation/native';
import { useState } from "react";
import Images from "../../themes/Images";
import Avatar from "../avatar/Avatar";
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import socketClient from "../../socket/socketClient";
import { fetchRequestList, fetchUser } from "../../reduxToolkit/slice/mainSlice";

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

export const Request = ({ navigation }) => {
  const dispatch = useDispatch();
  const { requestList } = useSelector((state) => state.main.requestList);

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

  useEffect(() => {
    dispatch(fetchRequestList());
    async function getSocket() {
      return await socketClient.getClientSocket();
    }
    async function handleRequest() {
      const socket = await getSocket();
      if (socket) {
        socket.on('request_accepted', (data) => {
          dispatch(fetchRequestList());
          dispatch(fetchUser());
        });
        socket.on('new_friend_request', (data) => {
          dispatch(fetchRequestList());
        });
      }
    }
    handleRequest();
  }, [dispatch]);

  useEffect(() => {
    console.log("Request List: ", requestList?.data)
    if (requestList) {
      let requestFr = [];
      requestList.data.map((item) => {
        requestFr.push({
          request_id: item?._id,
          id: item.sender?._id,
          name: `${item.sender?.firstName} ${item.sender?.lastName}`,
          avatar: Images?.avatar3,
        })
      })
      setDataBanBe(requestFr);
    }
  }, [requestList])


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

  const acceptFriend = async (request_id) => {
    console.log('asaaas');
    socket.emit('accept_request', { request_id });
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

        <View style={styles.body4}>
          {dataBanBe.length === 0 ? (
            <Text style={styles.emptyListText}>Danh sách yêu cầu kết bạn trống</Text>
          ) : (
            <FlatList
              data={dataBanBe}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity style={styles.item}>
                    <View style={[styles.left_item]}>
                      <Image style={[styles.avatar_left]} source={item.avatar} />
                      {/* {item.status === 1 ? <View style={styles.dot_online} /> : <></>} */}
                    </View>
                    <View style={styles.info}>
                      <Text style={styles.name}>{item.name}</Text>
                    </View>
                    <View style={styles.call}>
                      <Button title="Đồng ý" onPress={() => acceptFriend(item.request_id)}></Button>


                    </View>
                  </TouchableOpacity>
                )
              }} />
          )}
        </View>

      </SafeAreaView>
    </SafeAreaView>
  )
}