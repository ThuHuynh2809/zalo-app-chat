import { StyleSheet } from 'react-native';
import Colors from '../../themes/Colors';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1,
    },
    header_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 50,
        shadowColor: 'black',   
        shadowOffset: {height: 10},
        shadowOpacity: 0.5,
        paddingBottom: 10,
    },
    text_header: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    txtInHeader: {
        fontSize: 18,
        color: '#F1FFFF',
        width: '60%',
        height: 50,
        marginLeft: 15,
    }, 

    btnSetting: {
        height: 40,
        width: 40,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 50
    },

    header: {
        flexDirection: 'row',
        width: '100%',
        height: '8%',
        alignItems: 'center',
        backgroundColor: '#009AFA',
        justifyContent: 'center',
    },

    my_story: {
        backgroundColor: Colors.blue,
        height: 100,
        width: 60,
        top: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    horizontal_container: {
        marginTop: 10,
    },
    text_horizontal: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        marginTop: 12,
    },
    my_story_container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        marginLeft: 10,
    },

    line: {
        height: 1,
        marginHorizontal: 16,
        backgroundColor: Colors.gray_sliver,
        marginTop: 10,
    },
    list_container: {
        marginHorizontal: 16,
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
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 40,
     
    },
    dot_online: {
        height: 12,
        width: 12,
        borderRadius: 5,
        backgroundColor: Colors.green,
        position: 'absolute',
        bottom: 4,
        right: 0,
        borderColor: 'white',

    },
    name: {
        fontSize: 17,
        fontWeight: 'bold',

    },
    moment: {
        fontSize: 14,
        color: 'black'

    },
    lastMessage: {
        fontSize: 14,
        color: Colors.black,
    },
    info: {
        justifyContent: 'flex-start',
        marginLeft: 15,
        paddingVertical: 10,
        width: '30%',
        height:'60%',
    },

    right_item: {
        justifyContent: 'space-around',
        marginLeft: 120,
        paddingVertical: 10,
    },
    item_time: {
        fontSize: 14,
        color: Colors.black,
    },
    dot_unread: {
        height: 9,
        width: 9,
        borderRadius: 5,
        backgroundColor: Colors.blue,
        alignSelf: 'flex-end',
    }, 
    dot_chatting: {
        height: 6,
        width: 6,
        borderRadius: 5,
        backgroundColor: Colors.blue,
        marginLeft: 5
    },
    dot_chatting_container: {
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },
    
    
})