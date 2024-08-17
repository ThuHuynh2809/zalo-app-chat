import { Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faArrowLeft, faClockRotateLeft, faEllipsis, faImage,
    faPhone, faBirthdayCake, faTransgender, faBook,
} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, updateUserProfile } from '../../reduxToolkit/slice/authSlice';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import Images from '../../themes/Images';

export const EditProfile = ({ navigation }) => {
    const dispatch = useDispatch();
    //   const {user} = useSelector((state) => state.auth.user);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phone, setPhone] = useState('');
    const [userId, setUserId] = useState(null);
    const [avatar, setAvatar] = useState('');
    const defaultAvatar = Images.avatar1; // URL ảnh mặc định
    const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);

    const fetchUser = async () => {
        const user_id = await AsyncStorage.getItem('user_id');
        setUserId(user_id); // Lưu userId vào state
        if (user_id) {
            const userData = await dispatch(getUserById(user_id)).unwrap();
            if (userData) {
                setFirstName(userData.firstName || '');
                setLastName(userData.lastName || '');
                setGender(userData.gender || '');
                setDateOfBirth(userData.dateOfBirth || '');
                setPhone(userData.phone || '');
                setAvatar(userData.avatar || defaultAvatar);
            }
        }
    };

    useEffect(() => {
        fetchUser();
    }, [dispatch]);

    const handleUpdateProfile = async () => {
        if (!userId) {
            Alert.alert('Error', 'User ID not found');
            return;
        }

        const updatedUserData = {
            firstName,
            lastName,
            gender,
            dateOfBirth,
            phone,
            avatar
        };
        dispatch(updateUserProfile(userId, updatedUserData))
            .unwrap()
            .then(async () => {
                await fetchUser(); // Load lại dữ liệu sau khi update thành công
                Alert.alert('Success', 'Profile updated successfully!');
                navigation.goBack();
            })
            .catch((error) => {
                console.error('Error updating profile:', error);
                Alert.alert('Error', 'Failed to update profile.');
            });

    };

    const toggleGenderDropdown = () => {
        setIsGenderDropdownOpen(!isGenderDropdownOpen);
    };

    const selectGender = (selectedGender) => {
        setGender(selectedGender);
        setIsGenderDropdownOpen(false);
    };

    const pickImage = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
                copyTo: 'cachesDirectory',
            });
            console.log(res);
            const uri = res[0].fileCopyUri.replace('//', '');
            const name = res[0].name;
            const type = res[0].type;

            handleSubmitFile({ uri, name, type });
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                console.error('Unknown error: ', err);
            }
        }
    };

    const handleSubmitFile = async file => {

        const formData = new FormData();
        // convert the file to base64 for sending
        formData.append('file', {
            uri: file.uri,
            name: file.name,
            type: file.type
        });

        console.log('file', file);

        // send the file to the server
        try {
            const response = await axios.post(
                'http://10.0.2.2:3000/messages/upload-file',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',

                    },
                },
            );
            if (response) {
                console.log('File uploaded successfully');
                // Update avatar url
                setAvatar(response.data.data.url);
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Pressable style={styles.btnBack} onPress={() => { navigation.goBack(fetchUser()); }}>
                        <FontAwesomeIcon color='#F1FFFF' size={22} icon={faArrowLeft} />
                    </Pressable>
                    <Text style={styles.txtHeader}>Chỉnh sửa hồ sơ</Text>
                    <Pressable style={styles.btnLoad} onPress={() => { navigation.navigate('EditProfile'); }}>
                        <FontAwesomeIcon color='#F1FFFF' size={22} icon={faClockRotateLeft} />
                    </Pressable>
                    <Pressable style={styles.btnMenu} onPress={() => { navigation.navigate(''); }}>
                        <FontAwesomeIcon color='#F1FFFF' size={22} icon={faEllipsis} />
                    </Pressable>
                </View>
                <View style={styles.body}>
                    <Image source={{uri: avatar}} value={avatar} style={styles.imgAvata}></Image>
                    <Pressable style={[styles.viewMenu, { marginTop: 30 }]} onPress={pickImage}>
                        <FontAwesomeIcon color='blue' size={22} icon={faImage} />
                        <Text style={styles.txtMenu}>Chọn ảnh</Text>
                    </Pressable>
                    <View style={styles.editContainer}>
                        <View style={styles.textBoxCon}>
                            <View style={styles.at}>
                                <FontAwesomeIcon icon={faBook} size={20} color="gray" />
                            </View>
                            <View style={styles.input_con}>
                                <View style={styles.textCon}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={'Nhập tên mới'}
                                        placeholderTextColor={'#aaa'}
                                        value={firstName}
                                        onChangeText={setFirstName}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={[styles.textBoxCon, { marginTop: 30 }]}>
                            <View style={styles.at}>
                                <FontAwesomeIcon icon={faBook} size={20} color="gray" />
                            </View>
                            <View style={styles.input_con}>
                                <View style={styles.textCon}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={'Nhập họ mới'}
                                        placeholderTextColor={'#aaa'}
                                        value={lastName}
                                        onChangeText={setLastName}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={[styles.textBoxCon, { marginTop: 30 }]}>
                            <View style={styles.at}>
                                <FontAwesomeIcon icon={faTransgender} size={20} color="gray" />
                            </View>
                            <View style={styles.input_con}>
                                <TouchableOpacity onPress={toggleGenderDropdown} style={styles.genderDropdown}>
                                    <Text style={styles.textInput}>{gender}</Text>
                                </TouchableOpacity>
                                {isGenderDropdownOpen && (
                                    <View style={styles.genderDropdownMenu}>
                                        <Pressable onPress={() => selectGender('Nam')} style={styles.genderDropdownItem}>
                                            <Text>Nam</Text>
                                        </Pressable>
                                        <Pressable onPress={() => selectGender('Nữ')} style={styles.genderDropdownItem}>
                                            <Text>Nữ</Text>
                                        </Pressable>
                                        <Pressable onPress={() => selectGender('Khác')} style={styles.genderDropdownItem}>
                                            <Text>Khác</Text>
                                        </Pressable>
                                    </View>
                                )}
                            </View>
                        </View>
                        <View style={[styles.textBoxCon, { marginTop: 30 }]}>
                            <View style={styles.at}>
                                <FontAwesomeIcon icon={faBirthdayCake} size={20} color="gray" />
                            </View>
                            <View style={styles.input_con}>
                                <View style={styles.textCon}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={'Nhập ngày sinh'}
                                        placeholderTextColor={'#aaa'}
                                        value={dateOfBirth}
                                        onChangeText={setDateOfBirth}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={[styles.textBoxCon, { marginTop: 30 }]}>
                            <View style={styles.at}>
                                <FontAwesomeIcon icon={faPhone} size={20} color="gray" />
                            </View>
                            <View style={styles.input_con}>
                                <View style={styles.textCon}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={'Nhập số điện thoại'}
                                        placeholderTextColor={'#aaa'}
                                        value={phone}
                                        onChangeText={setPhone}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <Pressable style={styles.btnEditProfile} onPress={handleUpdateProfile}>
                    <Text style={styles.txtEditProfile}>Lưu</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};