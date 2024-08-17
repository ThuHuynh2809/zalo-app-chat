import { StyleSheet } from 'react-native'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'flex-start',
    },
    header: {
        backgroundColor: '#008CD7',
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        width: '100%',
        height: '9%',
    },
    btnBack: {
        zIndex: 10,
        width: '50px',
        position: 'absolute',
        top: 15,
        marginLeft: 10,
    },
    btnLoad: {
        zIndex: 10,
        width: '50px',
        position: 'absolute',
        top: 15,
        marginLeft: 320,

    },
    btnMenu: {
        zIndex: 10,
        width: '50px',
        position: 'absolute',
        top: 15,
        marginLeft: 360,
    },
    textThongTinCN: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    },

    imgAvata: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginHorizontal: 10,
        marginTop: 20
    },
    txtViewNameInfo: {
        marginTop: 10,
        fontSize: 24,
        fontWeight: 'bold',
    },
    body: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '75%',
    },
    btnEditProfile: {
        width: '80%',
        height: 40,
        backgroundColor: '#008CD7',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    txtEditProfile: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    viewMenuList: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
    },
    viewMenu: {
        marginLeft: 15,
        width: '45%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        borderWidth: 1,

    },
    txtMenu: {
        fontSize: 16,
        marginLeft: 10,
    },
    viewNhatKy: {
        width: '100%',
        height: '50%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    txtNhatKy: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    txtNhatKy1: {
        marginLeft: 60,
        marginRight: 60,
        marginTop: 5,
        fontSize: 14,
        color: 'gray',
    },
    footer: {
        width: '100%',
        height: '12%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtHeader: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 100,
        marginTop: 5
    },
    editContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    textBoxCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textCon: {
        width: '90%',
    },
    textInput: {
        borderBottomColor: '#aaa',
        borderWidth: 2,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        color: '#000',
        fontSize: 16,
        height: 40,
        width: '80%',
    },
    at: {
        alignSelf: 'center',
        width: '10%',
        marginLeft: 45
    },
    input_con: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    genderDropdown: {
        width: '80%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
        marginLeft: 0,
    },
    genderDropdownMenu: {
        marginTop: 5,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 10,
    },
    genderDropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },


});