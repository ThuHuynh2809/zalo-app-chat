import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const mainSlice = createSlice({
    name: "main",
    initialState: {
        users: [],
        recommendFriends: [],
        requestList: [],
    },
    reducers: {
        getUser(state, action) {
            state.users = action.payload;
        },
        getRecommendFriend(state, action) {
            state.recommendFriends = action.payload;
        },
        getRequestList(state, action) {
            state.requestList = action.payload;
        }
    },
});

export const { getUser } = mainSlice.actions;
export const { getRecommendFriend } = mainSlice.actions;
export const { getRequestList } = mainSlice.actions;


export default mainSlice.reducer;

export const fetchUser = () => {
    return async (dispatch, getState) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token === null) {
                console.log('Token is null');
                return;
            } else {
                const response = await axios.get(
                    `http://10.0.2.2:3000/users/get-friends`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },

                    }
                );
                console.log('get list conversations successful');
                dispatch(getUser({ users: response.data }));
            }
            // console.log(token);
        }
        catch (error) {
            console.log(error);
        }
    }
}

export const fetchRecommendFriends = () => {
    return async (dispatch, getState) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(
                `http://10.0.2.2:3000/users/get-users`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },

                }
            );
            console.log('Got list recommend to add friend');
            dispatch(getRecommendFriend({ recommendFriends: response.data }));
        }
        catch (error) {
            console.log(error);
        }
    }
}

export const fetchRequestList = () => {
    return async (dispatch, getState) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(
                `http://10.0.2.2:3000/users/get-friend-requests`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },

                }
            );
            console.log('Got list friend request');
            dispatch(getRequestList({ requestList: response.data }));
        }
        catch (error) {
            console.log(error);
        }
    }
}