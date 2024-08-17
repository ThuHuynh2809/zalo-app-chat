import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { styles } from "./styles";

const Avatar = ({ data, shownName = "true" }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.avatar_container, 
       {
        borderWidth: data.moment === 1 ? 1 : 0
       }
      ]}>
        <Image source={data.avatar} style={[styles.avatar, 
          {
            height: data.moment === 1 ? 90 : 100, width: data.moment === 1 ? 50 : 60
          }
        ]} />
        {data.statusOn === 1 ? <View style={styles.dot_online} /> : <></>}
      </View>
      {shownName ? <Text style={styles.text}>{data.name}</Text> : <></>}
    </View>
  );
};

export default Avatar;

