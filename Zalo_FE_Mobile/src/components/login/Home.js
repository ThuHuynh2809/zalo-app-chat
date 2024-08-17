import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
// import Carousel from 'react-native-snap-carousel'
import auth from '@react-native-firebase/auth';

const {width} = Dimensions.get('screen');

const data = [
  {
    id: 1,
    img: require('../../../assets/img/header.png'),
  },
  {
    id: 2,
    img: require('../../../assets/img/header.png'),
  },
  {
    id: 3,
    img: require('../../../assets/img/header.png'),
  },
];

export const Home = ({navigation}) => {
  const renderItem = ({item}) => (
    <View style={{marginBottom: 0}}>
      {/* <Text> {item.name} </Text> */}
      <Image
        source={item.img}
        style={{height: 400, width: width, resizeMode: 'contain'}}
      />
    </View>
  );

  // useEffect(() => {
  //   const unregisterAuthObserver = onAuthStateChanged(authetication, u => {
  //     if (u) {
  //       // User is signed in, see docs for a list of available properties
  //       // https://firebase.google.com/docs/reference/js/firebase.User

  //       // console.log(userCredential.user.uid);
  //       const getUser = async (db, id) => {
  //         //get info user by id
  //         const docRef = doc(db, 'users', id);
  //         const docSnap = await getDoc(docRef);

  //         if (docSnap.exists()) {
  //           // return docSnap.data();
  //           console.log('Document data:', docSnap.data());
  //           //set user
  //           depatch(SetUser(docSnap.data()));
  //           navigation.navigate('HomeTabs');
  //           //redict home page
  //         } else {
  //           // doc.data() will be undefined in this case
  //           console.log('No such document!');
  //         }
  //       };

  //       getUser(db, u.uid);
  //     } else {
  //       // User is signed out
  //       // ...
  //       console.log('sign out');
  //     }
  //   });

  //   return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.txtZaloX}>QQ Chat</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        snapToAlignment="center"></FlatList>
      <View style={styles.btn_container}>
        <Pressable
          style={styles.btnLogin}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={styles.txtLogin}> Đăng nhập </Text>
        </Pressable>
        <Pressable
          style={styles.btnSignIn}
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text style={styles.txtSignIn}> Đăng ký </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
