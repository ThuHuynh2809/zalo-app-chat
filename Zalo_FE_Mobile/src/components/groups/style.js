import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
        backgroundColor: '#009AFA',
    },

    header: {
        flexDirection: 'row',
        width: '100%',
        height: '8%',
        alignItems: 'center',
        backgroundColor: '#009AFA',

    },

    txtInHeader: {
        fontSize: 18,
        color: '#F5F5F5',
        width: '60%',
        height: 50,
        marginLeft: 15,
    },

    body: {
        flex: 1,
        backgroundColor: '#F4F5F7',
    },
    body1: {
        flexDirection: 'row',
        width: '100%',
        height: 45,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    body2: {
        flexDirection: 'column',
        width: '100%',
        height: 240,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderStartEndRadius: 10,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderWidth: 1,
        borderColor: '#E5E5E5'
    },
    body3: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'flex-start',
        alignItems: 'center',
       
    },
    viewAll: {
        marginLeft:20,
        width: '25%',
        height: '75%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    button4: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        

    },

    pressZaloVideo: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
        width: '100%',
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
    },
    body4: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
    },
    item: {
        flexDirection: 'row',
        marginTop: 15,
        marginLeft:20,
        marginRight:20,
        alignItems: 'center',
        justifyContent: 'flex-start',
        
    },
    avatar_left: {
        height: 60,
        width: 60,
        right: -5,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    left_item: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
        width: 70,
        // borderColor: 'blue',
        // borderWidth: 1,
        // borderRadius: 40,
     
    },
    name: {
        fontSize: 17,
        color: 'black',

    },
    moment: {
        fontSize: 14,
        color: 'black'

    },
    info: {
        width: '55%',
        height:'60%',
        justifyContent: 'flex-start',
        marginLeft: 10,
        paddingVertical: 10,

    },
    call:{
        flexDirection: 'row',
        alignItems: 'center',
        height: '60%',
        width: '20%',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        // marginStart: 150
    },
    


})