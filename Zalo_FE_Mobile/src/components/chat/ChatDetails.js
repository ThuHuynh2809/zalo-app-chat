import {
    FlatList,
    Image,
    Linking,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faBars,
    faCamera,
    faChevronLeft,
    faCircleCheck,
    faFile,
    faImage,
    faLock,
    faPaperPlane,
    faPhone,
    faPlayCircle,
    faPlusCircle,
    faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { Pressable } from 'react-native';
import { styles } from './style';
import Images from '../../themes/Images';
import Colors from '../../themes/Colors';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import socketClient from '../../socket/socketClient';
import { getUserById } from '../../reduxToolkit/slice/authSlice';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';

const ChatDetails = ({ navigation }) => {
    const route = useRoute();
    const { itemId } = route.params; // Get itemId from parameters
    const [value, setValue] = useState('');
    const [conversationId, setConversationId] = useState('');

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth.user);

    // hàm lấy thông tin người dùng
    useEffect(() => {
        dispatch(getUserById(itemId));
    }, [dispatch]);

    const renderMessage = item => {
        switch (item.from) {
            case 0:
                return (
                    <View style={styles.message_system}>
                        <FontAwesomeIcon icon={faLock} color="#009AFA" size={20} />
                        <Text style={styles.text_system}>{item.message}</Text>
                    </View>
                );
            case itemId:
                return (
                    <View style={styles.message_customer}>
                        <View style={styles.left_message}>
                            <Image source={Images.avatar1} style={styles.avatar_item} />
                            <View style={styles.dot_online} />
                        </View>
                        <View style={[styles.message_customer_text_container,
                        {
                            backgroundColor:
                                item.type === 'Media' || item.type === 'Document'
                                    ? Colors.white
                                    : Colors.blue,
                            paddingHorizontal:
                                item.type === 'Media' || item.type === 'Document'
                                    ? 0
                                    : 15,
                            paddingVertical:
                                item.type === 'Media' || item.type === 'Document'
                                    ? 0
                                    : 10,
                        }
                        ]}
                        >
                            {renderTextMessage(item)}
                        </View>
                    </View>
                );
            default:
                return (
                    <View style={styles.message_onwer}>
                        <View style={styles.right_message}>
                            <View
                                style={[
                                    styles.message_owner_text_container,
                                    {
                                        backgroundColor:
                                            item.type === 'Media' || item.type === 'Document'
                                                ? Colors.white
                                                : Colors.blue,
                                        paddingHorizontal:
                                            item.type === 'Media' || item.type === 'Document'
                                                ? 0
                                                : 15,
                                        paddingVertical:
                                            item.type === 'Media' || item.type === 'Document'
                                                ? 0
                                                : 10,
                                    },
                                ]}>
                                {renderTextMessage(item)}
                            </View>
                            <View style={styles.ic_check}>
                                <FontAwesomeIcon
                                    icon={faCircleCheck}
                                    color="#009AFA"
                                    size={15}
                                />
                            </View>
                        </View>
                    </View>
                );
        }
    };

    const renderTextMessage = item => {
        switch (item.type) {
            case 'Text':
                return (
                    <Text
                        style={[
                            styles.text_message,
                            { color: item.from === itemId ? Colors.white : Colors.white },
                        ]}>
                        {item.text}
                    </Text>
                );
            case 'Sound':
                return (
                    <View style={styles.sound_message}>
                        <TouchableOpacity>
                            <FontAwesomeIcon icon={faPlayCircle} color="#009AFA" size={25} />
                        </TouchableOpacity>
                        {/* <FontAwesomeIcon icon={faGripLines} color='#009AFA' size={25}/> */}
                        <Image source={Images.Timeline} style={styles.timeline} />
                        <Text style={styles.text_time_line}>1:20</Text>
                    </View>
                );
            case 'Media':
                return <Image source={{ uri: item.file }} style={styles.image} />;
            case 'Document':
                return (
                    <TouchableOpacity onPress={() => openDocument(item.file)}>
                        <View style={styles.document_message}>
                            <FontAwesomeIcon icon={faFile} color="#009AFA" size={25} />
                            <Text style={styles.text_document}>View Document</Text>
                        </View>
                    </TouchableOpacity>
                );
            default:
                return null;
        }
    };

    const openDocument = fileUrl => {
        // Logic to open the document, e.g., using a web browser or an in-app document viewer
        Linking.openURL(fileUrl);
    };

    // Hàm gửi tin nhắn

    const sendMessage = async () => {
        const from = await AsyncStorage.getItem('user_id');
        console.log('sending..');
        const socket = await socketClient.getClientSocket();
        // Gửi tin nhắn tới server thông qua socket
        try {
            socket.emit(
                'text-message',
                {
                    to: itemId, // ID của người nhận tin nhắn
                    from: from, // ID của người gửi tin nhắn
                    message: text, // Nội dung tin nhắn
                    conversation_id: conversationId,
                    type: 'Text', // Loại tin nhắn (text, image, file, v.v.)
                },
                (result, err) => {
                    if (err) {
                        throw err;
                    }
                    console.log('Send message success:', result);
                },
            );
            // Xóa nội dung tin nhắn sau khi gửi
            setText('');
        } catch (error) {
            console.log(error);
        }
    };

    // Hàm xử lý khi nhận được tin nhắn mới
    useEffect(() => {
        async function getUserId() {
            return await socketClient.getClientSocket();
        }
        async function handleMessage() {
            const socket = await getUserId();
            if (socket) {
                socket.on('new_message', data => {
                    // Nhận thông điệp mới từ server
                    const { conversation_id, message } = data;

                    console.log(message);

                    // Cập nhật danh sách tin nhắn trên client
                    // setMessages(prevMessages => {
                    //     return [...prevMessages, message];
                    // });
                    setMessages(prevMessages => [message, ...prevMessages]);
                });
            }
        }
        handleMessage();

        // Hủy đăng ký lắng nghe khi component bị unmount
        // return () => {
        //     if (socket) {
        //         socket.off('new_message');
        //     }
        // };
    }, []);

    const getConversations = async () => {
        const socket = await socketClient.getClientSocket();
        const from = await AsyncStorage.getItem('user_id');
        console.log('from: ' + from);
        console.log('to: ' + itemId);
        socket.emit(
            'get_direct_conversations',
            { user_id: from, partner_id: itemId },
            async response => {
                const chat = response[0]?.messages ?? [];
                const reversedChat = chat.reverse();
                setConversationId(response[0]?._id);
                console.log('length: ' + reversedChat.length);
                setMessages(prevMessages => {
                    let updatedMessages = [...prevMessages];
                    reversedChat.forEach(value => {
                        // console.log(value);
                        updatedMessages.push(value);
                    });
                    return updatedMessages;
                });
                // console.log(messages);
                // socket.close();
            },
        );
    };

    const startConversation = async () => {
        const socket = await socketClient.getClientSocket();
        const from = await AsyncStorage.getItem('user_id');
        socket.emit('start_conversation', {
            to: itemId,
            from: from,
        });
    };

    useEffect(() => {
        getConversations();
        startConversation();
        // Hủy bỏ việc đăng ký lắng nghe khi component bị unmount
        // return () => {
        //     socket.off('text-message');
        // };
    }, []);

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

                if (file.type == 'application/pdf') {
                    sendFileAndImage('Document', response.data.data.url);
                } else {
                    sendFileAndImage('Media', response.data.data.url);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const sendFileAndImage = async (type, uri) => {
        const from = await AsyncStorage.getItem('user_id');
        const socket = await socketClient.getClientSocket();
        console.log('Sending file');
        try {
            socket.emit(
                'file_message',
                {
                    to: itemId,
                    from: from,
                    file: uri,
                    conversation_id: conversationId,
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

            const uri = res[0].fileCopyUri.replace('//', '');
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
                <Pressable
                    style={styles.pressBack}
                    onPress={() => {
                        navigation.navigate('Messages');
                    }}>
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        style={{ marginLeft: 10 }}
                        color="#F5F8FF"
                        size={20}
                    />
                    <Text style={styles.txtInHeader}>
                        {user?.data.firstName} {user?.data.lastName}
                    </Text>
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
                // data={data.reverse()}
                data={messages}
                // keyExtractor={(item) => item._id}
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
                            value={text}
                            onChangeText={setText}
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
    );
};

export default ChatDetails;
