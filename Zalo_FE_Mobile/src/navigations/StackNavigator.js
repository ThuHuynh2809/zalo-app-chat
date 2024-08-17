import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from '../components/login/Home';
import { Setting } from '../components/settings/Setting';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Messages } from '../components/messages/Messages';
import { Contacts } from '../components/contacts/Contacts';
import { Discovery } from '../components/discovery/Discovery';
import { Timeline } from '../components/timeline/Timeline';
import { Me } from '../components/me/Me';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAddressBook, faClock, faCommentDots, faUser } from '@fortawesome/free-regular-svg-icons';
import { faTableCells } from '@fortawesome/free-solid-svg-icons';
import ChatDetails from '../components/chat/ChatDetails';
import Login from '../components/login/Login';
import Register from '../components/login/Register';
import auth from '@react-native-firebase/auth';
import ChatDetails2 from '../components/contacts/ChatDetails2';
import VerifyEmail from '../components/login/VerifyEmail';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logIn, login } from '../reduxToolkit/slice/authSlice';
import { Profile } from '../components/profile/Profile';
import { Recommend } from '../components/recommend/Recommend';
import { Request } from '../components/request/Request';
import ResetPasswordScreen from '../components/login/ResetPassword';
import NewPassword from '../components/login/NewPassword';
import { EditProfile } from '../components/profile/EditProfile';
import { NewGroup } from '../components/groups/NewGroup';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName='Messages'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    if (route.name === 'Messages') {
                        return <FontAwesomeIcon icon={faCommentDots} size={22} color={color} />;
                    } else if (route.name === 'Contacts') {
                        return <FontAwesomeIcon icon={faAddressBook} size={22} color={color} />;
                    } else if (route.name === 'Discovery') {
                        return <FontAwesomeIcon icon={faTableCells} size={22} color={color} />;
                    } else if (route.name === 'Timeline') {
                        return <FontAwesomeIcon icon={faClock} size={22} color={color} />;
                    } else if (route.name === 'Me') {
                        return <FontAwesomeIcon icon={faUser} size={22} color={color} />;
                    }
                },
                headerShown: false,
                tabBarStyle: { paddingBottom: 8, height: '8%' }
            })}
        >
            <Tab.Screen name="Messages" component={Messages} options={{ tabBarLabel: 'Tin nhắn', tabBarLabelStyle: { fontSize: 12 }, tabBarBadge: '3' }} />
            <Tab.Screen name="Contacts" component={Contacts} options={{ tabBarLabel: 'Danh bạ', tabBarLabelStyle: { fontSize: 12 } }} />
            <Tab.Screen name="Discovery" component={Discovery} options={{ tabBarLabel: 'Khám phá', tabBarLabelStyle: { fontSize: 12 } }} />
            <Tab.Screen name="Timeline" component={Timeline} options={{ tabBarLabel: 'Nhật ký', tabBarLabelStyle: { fontSize: 12 }, tabBarBadge: 'N' }} />
            <Tab.Screen name="Me" component={Me} options={{ tabBarLabel: 'Cá nhân', tabBarLabelStyle: { fontSize: 12 } }} />
        </Tab.Navigator>
    )
}

const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name='VerifyEmail' component={VerifyEmail} />
            <Stack.Screen name='MainNavigator' component={MainNavigator} />
            <Stack.Screen name='ResetPassword' component={ResetPasswordScreen} />
            <Stack.Screen name='NewPassword' component={NewPassword} />
        </Stack.Navigator>
    )
}

const MainNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='MainScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name='Setting' component={Setting} />
            <Stack.Screen name='ChatDetails' component={ChatDetails} />
            <Stack.Screen name='ChatDetails2' component={ChatDetails2} />
            <Stack.Screen name='Profile' component={Profile} />
            <Stack.Screen name='Recommend' component={Recommend} />
            <Stack.Screen name='Request' component={Request} />
            <Stack.Screen name='EditProfile' component={EditProfile} />
            <Stack.Screen name='NewGroup' component={NewGroup} />
        </Stack.Navigator>
    )
}

const MainApp = () => {
    const [isLogin, setIsLogin] = useState(false);

    // dùng cho firebase login
    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
            setIsLogin(!!user);
        });
        return unsubscribe;
    }, []);

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    useEffect(() => {
        const checkLogin = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                dispatch(logIn({ token: token }));
            }
        }
        checkLogin();
    }, []);


    return (
        <NavigationContainer>
            {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )
}

export default MainApp;
