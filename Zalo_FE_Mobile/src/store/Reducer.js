import { SET_USER } from "./Actions";
//innite state
const initState = {
    user: null,
    isSignedIn: false,
    showDialog: false,
    showUpdateForm: false,
    showAlert: false,
    showTabHistorySearch: false,
    showTabInfo: false,
}

//depatch
const Reducer = (state, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                isSignedIn: true,
            };
        case SIGN_OUT:
            return {
                ...state,
                user: null,
                isSignedIn: false,
            };
        case SHOW_DIALOG:
            return {
                ...state,
                showDialog: true,
            };
        case HIDE_DIALOG:
            return {
                ...state,
                showDialog: false,
            };
        case SHOW_UPDATE_FORM:
            return {
                ...state,
                showUpdateForm: true,
            };
        case HIDE_UPDATE_FORM:
            return {
                ...state,
                showUpdateForm: false,
            };
        case SHOW_ALERT:
            return {
                ...state,
                showAlert: true,
            };
        case HIDE_ALERT:
            return {
                ...state,
                showAlert: false,
            };
        case SHOW_TAB_HISTORY_SEARCH:
            return {
                ...state,
                showTabHistorySearch: true,
            };
        case HIDE_TAB_HISTORY_SEARCH:
            return {
                ...state,
                showTabHistorySearch: false,
            };
        case SHOW_TAB_INFO:
            return {
                ...state,
                showTabInfo: true,
            };
        case HIDE_TAB_INFO:
            return {
                ...state,
                showTabInfo: false,
            };
        default:
            return state;
    }
}

export { initState };
export default Reducer;