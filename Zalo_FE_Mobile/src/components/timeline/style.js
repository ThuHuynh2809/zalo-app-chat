import { StyleSheet } from 'react-native'
import Colors from '../../themes/Colors'

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

    pressTodayFeel: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
        width: '100%',
        backgroundColor: '#FFFFFF',
        
    },
    my_story_container: {
        height: 140,
        marginLeft: 10,
    },
    my_story: {
        backgroundColor: Colors.blue,
        height: 100,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text_horizontal: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        marginTop: 12,
    },
    horizontal_container: {
        margin: 10,
    },
    
    
})