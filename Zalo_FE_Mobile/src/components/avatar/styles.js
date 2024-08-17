import { StyleSheet } from 'react-native'
import Colors from '../../themes/Colors'

export const styles = StyleSheet.create({
    container: {
        height: 140,
        marginLeft: 10,
    },

    avatar_container: {
        height: 100,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'blue',
        borderWidth: 1,
    },

    avatar: {
        height: 90,
        width: 50,
    },

    text: {
        textAlign: 'center',
        marginTop: 10,
    }, 
    dot_online: {
        height: 12,
        width: 12,
        borderRadius: 5,
        backgroundColor: Colors.green,
        position: 'absolute',
        bottom: -2,
        right: -3,
        borderColor: 'white',

    },

})