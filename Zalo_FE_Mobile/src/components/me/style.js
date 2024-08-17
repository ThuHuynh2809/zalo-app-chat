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
        color: '#F1FFFF',
        width: '60%',
        height: 50,
        marginLeft: 15,
    }, 
    
    body: {
        flex: 1,
        backgroundColor: '#F1F2F4',
    },

    pressViewInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
        width: '100%',
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
    },

    avatar: {
        height: 50, 
        width: 50, 
        marginLeft: 15,
        borderRadius: 25,
    },

    viewInfo: {
        marginLeft: - 120,
    },

    txtViewInfo: {
        fontSize: 15,
        opacity: 0.8,
    },

    txtViewNameInfo: {
        fontSize: 20,
        fontWeight: '400',
    },

    btnChangeAcc: {
        height: 40,
        width: 40,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },

    pressViewQR: {
        marginTop: 9,
        height: 70, 
        width: '100%',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center'
    },

    viewQR: {
        marginLeft: 20,
    },

    viewCloud: {
        marginLeft: 20,
        width: 280
    },

    txtViewQR: {
        fontSize: 18,
        
    },

    txtViewQR1: {
        fontSize: 15,
        marginTop: 5,
    },

    pressMusic: {
        // marginTop: 2,
        height: 70, 
        width: '100%',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center'
    },

    viewMusicTxt: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    pressCloud: {
        // marginTop: 2,
        height: 95, 
        width: '100%',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center'
    },

    percentCloud: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 10
    },

    percentCloud1: {
        height: 5,
        backgroundColor: '#1A66D4',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },

    percentCloud2: {
        height: 5,
        backgroundColor: '#F1F2F4',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },

    pressData: {
        marginTop: 9,
        height: 70, 
        width: '100%',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center'
    },

    pressShield: {
        marginTop: 9,
        height: 55, 
        width: '100%',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center'
    },

    pressPrivacy: {
        // marginTop: 2,
        height: 55, 
        width: '100%',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center'
    },

    btnSetting: {
        height: 40,
        width: 40,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 50
    },

    line1: {
        height: 2,
        backgroundColor: '#FFFFFF',
        width: '15%'
        
    },

    line2: {
        height: 2,
        backgroundColor: '#F1F2F4',
        width: '85%'
    },

    line: {
        flexDirection: 'row'
    },


    
})