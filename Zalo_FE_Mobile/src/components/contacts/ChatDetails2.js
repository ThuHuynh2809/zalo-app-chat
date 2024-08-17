import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faChevronLeft, faCircleCheck, faImage, faLock, faMicrophone, faPaperPlane, faPhone, faPlayCircle, faPlusCircle, faSmile, faThumbsUp, faVideo, faVoicemail } from '@fortawesome/free-solid-svg-icons';
import { Pressable } from 'react-native';
import { styles } from "../chat/style";
import Images from '../../themes/Images';
import Colors from '../../themes/Colors';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { useRoute } from '@react-navigation/native';
import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socketClient from "../../socket/socketClient";
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';

const socket = io('http://10.0.2.2:3000');

const data = [
    {
        id: 0,
        formId: 0,
        statusOnline: 1,
        typeMessage: 0,
        message: "Message to this chat and calls are now secured with End encrypted",
    },
    {
        id: 1,
        formId: 1,
        statusOnline: 1,
        typeMessage: 0,
        message: "Hello",
    },
    {
        id: 2,
        formId: 2,
        statusOnline: 1,
        typeMessage: 0,
        message: "How are you?",
        sent: 1
    },
    {
        id: 3,
        formId: 1,
        statusOnline: 1,
        typeMessage: 0,
        message: "I'm fine, thank you!",
    },
    {
        id: 4,
        formId: 2,
        statusOnline: 1,
        typeMessage: 0,
        message: "What are you doing?",
        sent: 1

    },
    {
        id: 5,
        formId: 1,
        statusOnline: 1,
        typeMessage: 0,
        message: "I'm working",
    },
    {
        id: 6,
        formId: 2,
        statusOnline: 1,
        typeMessage: 0,
        message: "I'm working too",
        sent: 1
    },
    {
        id: 7,
        formId: 1,
        statusOnline: 1,
        typeMessage: 0,
        message: "What are you doing?",
    },
    {
        id: 8,
        formId: 2,
        statusOnline: 1,
        typeMessage: 0,
        message: "I'm working",
        sent: 1
    },
    {
        id: 9,
        formId: 1,
        statusOnline: 1,
        typeMessage: 1,
        message: "I'm working too",
    },
    {
        id: 10,
        formId: 2,
        statusOnline: 1,
        typeMessage: 2,
        message: "What are you doing?",
        sent: 1
    },
]

const ChatDetails2 = ({ navigation }) => { 
    const route = useRoute();
    const [groupName, setGroupName] = useState('');
    const [messages, setMessages] = useState([]);

    async function getSocket () {
        return await socketClient.getClientSocket();
    }

    const getMessage = async () => {
        const socket = await getSocket();
        const userId = await AsyncStorage.getItem('user_id');
        socket.on('message_group_chat', async (data) => {
            setGroupName(data[0].groupName);
            let messages = [];
            data[0].messages.map((item) => {
                messages.push({
                    id: item._id,
                    formId: userId == item.sender._id ? 2 : 1,
                    statusOnline: 1,
                    typeMessage: item.type == 'Text' ? 0 : (item.type == 'Sound' ? 1 : 2),
                    message: userId == item.sender._id
                        ? `${item.text}`
                        : `${item.sender.firstName} ${item.sender.lastName}\n\n${item.text}`

                })
            })
            setMessages(messages);
        })

        const { itemId } = route.params;
        socket.emit('get_message_group_chat', { itemId });

        socket.on('new_group_chat_message', async (data) => {
            socket.emit('get_message_group_chat', { itemId });
        })
    }

    const sendMessage = async () => {
        const from = await AsyncStorage.getItem('user_id');
        const { itemId } = route.params;
        const groupId = itemId;
        const socket = await socketClient.getClientSocket();
        // Gửi tin nhắn tới server thông qua socket
        try {
            socket.emit('chat_group_message',
                {
                    groupId: groupId,
                    senderId: from,
                    text: value,
                    messageType: 'Text'
                },
                (result, err) => {
                    if (err) {
                        throw (err);
                    }
                    console.log("Send message success:", result);
                });

            setValue('');
        } catch (error) {
            console.log(error);
        }

    };
    
    useEffect(() => {
        getMessage();
    }, [])

    const [value, setValue] = useState('')

    const renderMessage = (item) => {
        switch (item.formId) {
            case 0:
                return (
                    <View style={styles.message_system}>
                        <FontAwesomeIcon icon={faLock} color='#009AFA' size={20} />
                        <Text style={styles.text_system}>{item.message}</Text>
                    </View>
                )
            case 1:
                return (
                    <View style={styles.message_customer}>
                        <View style={styles.left_message}>
                            <Image source={Images.avatar1} style={styles.avatar_item} />
                            <View style={styles.dot_online} />
                        </View>
                        <View style={styles.message_customer_text_container}>
                            {renderTextMessage(item)}
                        </View>
                    </View>
                )
            case 2:
                return (
                    <View style={styles.message_onwer}>
                        <View style={styles.right_message}>
                            <View style={[styles.message_owner_text_container, {
                                backgroundColor: item.typeMessage === 2 ? Colors.white : Colors.blue,
                                paddingHorizontal: item.typeMessage === 2 ? 0 : 15,
                                paddingVertical: item.typeMessage === 2 ? 0 : 10,
                            }]}>
                                {renderTextMessage(item)}
                            </View>
                            <View style={styles.ic_check}>
                                <FontAwesomeIcon icon={faCircleCheck} color='#009AFA' size={15} />
                            </View>
                        </View>

                    </View>
                )
        }
    }

    const renderTextMessage = (item) => {
        switch (item.typeMessage) {
            case 0:
                return (
                    <Text style={[styles.text_message, { color: item.formId === 1 ? Colors.black : Colors.white }]}>{item.message}</Text>
                )

            case 1:
                return (
                    <View style={styles.sound_message}>
                        <TouchableOpacity >
                            <FontAwesomeIcon icon={faPlayCircle} color='#009AFA' size={25} />
                        </TouchableOpacity>
                        {/* <FontAwesomeIcon icon={faGripLines} color='#009AFA' size={25}/> */}
                        <Image source={Images.Timeline} style={styles.timeline} />
                        <Text style={styles.text_time_line}>1:20</Text>
                    </View>
                )

            case 2:
                return (
                    <Image source={{ uri: item.file }} style={styles.image} />
                )
        }
    }

    const pickImage = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
                copyTo: 'cachesDirectory',
            });
            console.log(res);
            const uri = res[0].fileCopyUri;
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
                
                if (file.type == 'application/pdf') {
                    sendFileAndImage(3, response.data.data.url);
                } else {
                    sendFileAndImage(2, response.data.data.url);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const sendFileAndImage = async (type, uri) => {
        const { itemId } = route.params;
        const from = await AsyncStorage.getItem('user_id');
        const socket = await socketClient.getClientSocket();
        console.log('Sending file');
        try {
            socket.emit(
                'file_message_group',
                {
                    groupId: itemId,
                    senderId: from,
                    file: uri,
                    type: type,
                },
                (result, err) => {
                    if (err) {
                        throw err;
                    }
                    console.log('Send message success:', result);
                },
            );
        } catch (error) {
            console.log(error);
        }
    };

    const selectFile = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                copyTo: 'cachesDirectory',
            });
            console.log(res);

            const uri = res[0].fileCopyUri;
            const name = res[0].name;
            const type = res[0].type;

            // Call handleSubmitFile with the selected file
            handleSubmitFile({ uri, name, type });
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                throw err;
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.pressBack} onPress={() => { navigation.navigate('Contacts') }}>
                    <FontAwesomeIcon icon={faChevronLeft} style={{ marginLeft: 10 }} color='#F5F8FF' size={20} />
                    <Text style={styles.txtInHeader}>{ groupName }</Text>
                </Pressable>

                <Pressable>
                    <FontAwesomeIcon
                        style={{ marginLeft: 170 }}
                        color="#F1FFFF"
                        size={22}
                        icon={faPhone}
                    />
                </Pressable>

                <Pressable>
                    <FontAwesomeIcon
                        style={{ marginLeft: 20 }}
                        color="#F1FFFF"
                        size={22}
                        icon={faVideo}
                    />
                </Pressable>

                <Pressable>
                    <FontAwesomeIcon
                        style={{ marginLeft: 20 }}
                        color="#F1FFFF"
                        size={22}
                        icon={faBars}
                    />
                </Pressable>
            </View>

            {/* <View style={styles.content_container}> */}
            <FlatList
                inverted
                data={messages.reverse()}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <View key={index} style={styles.item_container}>
                        {renderMessage(item)}
                    </View>
                )}
            />
            {/* </View> */}
            <View style={styles.bottom_container}>
                <TouchableOpacity>
                    <FontAwesomeIcon
                        icon={faFaceSmile}
                        size={25}
                        color="#009AFA"
                        style={{ marginTop: 5 }}
                    />
                </TouchableOpacity>
                <View style={styles.text_input_container}>
                    <View style={styles.text_input_left}>
                        <TextInput
                            style={styles.textInput}
                            value={value}
                            onChangeText={setValue}
                            placeholder="Start Typing..."
                        />
                    </View>
                </View>
                <View style={styles.bottom_right_container}>
                    <TouchableOpacity onPress={selectFile}>
                        <FontAwesomeIcon
                            icon={faPlusCircle}
                            size={25}
                            color="#009AFA"
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pickImage}>
                        <FontAwesomeIcon
                            icon={faImage}
                            size={25}
                            color="#009AFA"
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={sendMessage}>
                        <FontAwesomeIcon
                            icon={faPaperPlane}
                            size={25}
                            color="#009AFA"
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ChatDetails2;