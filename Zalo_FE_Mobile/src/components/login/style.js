import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },

    txtZaloX: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#0471F2'
    },

    btnLogin: {
        width: 260,
        height: 50,
        backgroundColor: '#008FFF',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    }, 

    btnSignIn: {
        width: 260,
        height: 50,
        marginTop: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        borderColor: '#008FFF',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, 

    txtLogin: {
        fontSize: 18,
        color: '#FFFFFF',
    },

    txtSignIn: {
        fontSize: 18,
        color: 'black',
    },
    btn_container: {
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
})