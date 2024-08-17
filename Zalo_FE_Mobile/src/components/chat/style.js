import { StyleSheet } from "react-native";
import Colors from "../../themes/Colors";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        height: '8%',
        alignItems: 'center',
        backgroundColor: '#009AFA',
    },

    pressBack: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 120,
        height: 40,
    },

    txtInHeader: {
        fontSize: 21,
        flexDirection: 'row',
        color: '#F1FFFF',
        marginLeft: 12,
        marginBottom: 2,
        width: 400,
    },

    content_container: {
        marginHorizontal: 16,
    },
    item_container: {
        marginTop: 20,
        marginBottom: 20,
    },
    message_system: {
        backgroundColor: Colors.pale_blue,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginHorizontal: 32,
        borderRadius: 12,
        flexDirection: "row",
    },
    text_system: {
        fontSize: 15,
        marginLeft: 5,
        color: Colors.blue_gray
    },
    message_customer: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar_item: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    dot_online: {
        width: 7.27,
        height: 7.27,
        backgroundColor: Colors.green,
        borderColor: Colors.white,
        borderWidth: 1,
        bottom: 2,
        right: 1,
        position: "absolute",
        borderRadius: 4,
    },
    left_message: {
        alignSelf: "flex-start",
        marginRight: 5
    },
    right_message: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        marginLeft: 5
    },
    ic_check: {
        justifyContent: 'flex-end'
    },
    text_message: {
        fontSize: 15,
    },
    sound_message: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeline: {
        width: 170,
        height: 20,
        alignItems: 'center',
        marginHorizontal: 5
    },
    text_time_line: {
        fontSize: 16,
        color: Colors.blue
    },
    sticker: {
        width: 100,
        height: 100,
    },
    message_customer_text_container: {
        backgroundColor: Colors.blue,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 24,
        alignSelf: "flex-start",
    },
    message_owner_text_container: {
        borderRadius: 24,
    },
    bottom_container: {
        flexDirection: "row",
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: { height: -8 },
        shadowOpacity: 0.05,
        height: 50,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        bottom: 7,
    },
    text_input_container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.pale_blue,
        borderRadius: 20,
        padding: 6,
        justifyContent: 'space-between',
        width: '60%',
    },
    text_input_left: {
        flexDirection: 'row',
    },
    bottom_right_container: {
        flexDirection: 'row',
    },
    like: {
        marginLeft: 12
    },
    text_input: {
        marginLeft: 10
    },
    icon: {
        marginLeft: 10,
    }, 
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        borderColor: 'black'
    },
    document_message: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text_document: {
        marginLeft: 10,
        color: '#009AFA',
        textDecorationLine: 'underline',
    },
})

