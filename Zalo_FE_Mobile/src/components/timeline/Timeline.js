import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { styles } from "./style";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronRight,
  faMagnifyingGlass,
  faPlus,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";
import { faBell, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import Avatar from "../avatar/Avatar";
import Images from "../../themes/Images";

const data = [
  {
    id: 0,
    name: "Alex",
    statusOn: 1,
    avatar: Images.avatar1,
    moment: 1,
  },

  {
    id: 1,
    name: "Jeff",
    statusOn: 1,
    avatar: Images.avatar2,
    moment: 0,
  },

  {
    id: 2,
    name: "Wilma",
    statusOn: 0,
    avatar: Images.avatar3,
    moment: 1,
  },

  {
    id: 3,
    name: "Lind",
    statusOn: 1,
    avatar: Images.avatar1,
    moment: 1,
  },

  {
    id: 4,
    name: "Alex",
    statusOn: 0,
    avatar: Images.avatar2,
    moment: 0,
  },

  {
    id: 5,
    name: "Jeff",
    statusOn: 1,
    avatar: Images.avatar3,
    moment: 1,
  },

];

export const Timeline = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* <Text>Discovery</Text> */}
        <FontAwesomeIcon
          style={{ marginLeft: 15 }}
          color="#F1FFFF"
          size={27}
          icon={faMagnifyingGlass}
        />
        <TextInput
          style={styles.txtInHeader}
          placeholder="Tìm kiếm"
        ></TextInput>

        <Pressable>
          <FontAwesomeIcon
            style={{ marginLeft: 15 }}
            color="#F1FFFF"
            size={22}
            icon={faPenToSquare}
          />
        </Pressable>

        <Pressable>
          <FontAwesomeIcon
            style={{ marginLeft: 22 }}
            color="#F1FFFF"
            size={22}
            icon={faBell}
          />
        </Pressable>
      </View>

      <ScrollView style={styles.body}>
        <Pressable style={styles.pressTodayFeel}>
          <Image
            source={require("../../../assets/img/avt.jpg")}
            style={{ height: 50, width: 50, marginLeft: 15, borderRadius: 25 }}
          ></Image>
          <Text style={{ marginLeft: 10, fontSize: 18, opacity: 0.8 }}>
            Hôm nay bạn thế nào?
          </Text>
        </Pressable>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.horizontal_container}>
        <View style={styles.my_story_container}>
          <View style={styles.my_story} >
            <TouchableOpacity>
              <FontAwesomeIcon color="white" size={22} icon={faPlus} />
            </TouchableOpacity>
          </View>
          <Text style={styles.text_horizontal}>Your Story</Text>
        </View>
        {data.map((item, index) => {
          return (
            <Avatar data={item} key={index} />
          )
        })}
      </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};
