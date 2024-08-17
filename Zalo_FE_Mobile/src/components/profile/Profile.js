import { Image, Pressable, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from './style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faClockRotateLeft, faEllipsis, faMusic, faFileImport, faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux'
import { getUserById } from '../../reduxToolkit/slice/authSlice'

export const Profile = ({ navigation }) => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth.user);

    // hàm lấy thông tin người dùng
    useEffect(() => {
        const fetchUser = async () => {
            const user_id = await AsyncStorage.getItem('user_id');
            if (user_id) {
                dispatch(getUserById(user_id));
            }
        };
        fetchUser();
    }, [dispatch]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.btnBack} onPress={() => { navigation.navigate('Me') }}>
                    <FontAwesomeIcon color='#F1FFFF' size={22} icon={faArrowLeft} />
                </Pressable>
                <Pressable style={styles.btnLoad} onPress={() => { navigation.navigate('Profile') }}>
                    <FontAwesomeIcon color='#F1FFFF' size={22} icon={faClockRotateLeft} />
                </Pressable>
                <Pressable style={styles.btnMenu} onPress={() => { navigation.navigate('') }}>
                    <FontAwesomeIcon color='#F1FFFF' size={22} icon={faEllipsis} />
                </Pressable>
            </View>
            <View style={styles.body}>
                <Image source={require('../../../assets/img/avt.jpg')} style={styles.imgAvata}></Image>
                <Text style={styles.txtViewNameInfo}>{user?.data.firstName} {user?.data.lastName}</Text>
                <View style={styles.viewMenuList}>
                    <View style={styles.viewMenu}>
                        <FontAwesomeIcon color='blue' size={22} icon={faMusic} />
                        <Text style={styles.txtMenu}>Nhạc chờ</Text>
                    </View>
                    <View style={styles.viewMenu}>
                        <FontAwesomeIcon color='blue' size={22} icon={faFileImport} />
                        <Text style={styles.txtMenu}>Nhập từ Facebook</Text>
                    </View>
                </View>
                <View style={styles.viewNhatKy}>
                    <FontAwesomeIcon color='blue' size={100} icon={faCirclePlay} />
                    <Text style={styles.txtNhatKy}>Hôm nay {user?.data.firstName} {user?.data.lastName} có gì vui?</Text>
                    <Text style={styles.txtNhatKy1}>Đây là Nhật ký của bạn - Hãy làm đầy Nhật ký với những dấu ấn cuộc đời và kỷ niệm đáng nhớ nhé!</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Pressable style={styles.btnEditProfile} onPress={() => { navigation.navigate('EditProfile') }}>
                    <Text style={styles.txtEditProfile}>Chỉnh sửa hồ sơ</Text>
                </Pressable>

            </View>
        </SafeAreaView>
    )
}