import produce from '../util/produce';

export const initialState = {
    logInLoading: false,
    logInDone: false,
    logInError: false,
    logOutLoading: false,
    logOutDone: false,
    logOutError: false,
    signUpLoading: false,
    signUpDone: false,
    signUpError: false,
    loadMyInfoLoading: false,
    loadMyInfoDone: false,
    loadMyInfoError: false,
    changeNicknameLoading: false,
    changeNicknameDone: false,
    changeNicknameError: false,
    changeDescriptionLoading: false,
    changeDescriptionDone: false,
    changeDescriptionError: false,
    userInfo: null,
    signUpData: {},
    loginData: {},
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const CHANGE_DESCRIPTION_REQUEST = 'CHANGE_DESCRIPTION_REQUEST';
export const CHANGE_DESCRIPTION_SUCCESS = 'CHANGE_DESCRIPTION_SUCCESS';
export const CHANGE_DESCRIPTION_FAILURE = 'CHANGE_DESCRIPTION_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOG_IN_REQUEST:
                draft.logInLoading = true;
                draft.logInDone = false;
                draft.logInError = null;
                break;
            case LOG_IN_SUCCESS:
                draft.logInLoading = false;
                draft.logInDone = true;
                draft.userInfo = action.data;
                break;
            case LOG_IN_FAILURE:
                draft.logInLoading = false;
                draft.logInError = action.error;
                break;
            case LOG_OUT_REQUEST:
                draft.logOutLoading = true;
                draft.logOutDone = false;
                draft.logOutError = null;
                break;
            case LOG_OUT_SUCCESS:
                draft.logOutLoading = false;
                draft.logOutDone = true;
                draft.logInDone = false;
                draft.userInfo = null;
                break;
            case LOG_OUT_FAILURE:
                draft.logOutLoading = false;
                draft.logOutError = action.error;
                break;
            case SIGN_UP_REQUEST:
                draft.signUpLoading = true;
                draft.signUpDone = false;
                draft.signUpError = null;
                break;
            case SIGN_UP_SUCCESS:
                draft.signUpLoading = false;
                draft.signUpDone = true;
                break;
            case SIGN_UP_FAILURE:
                draft.signUpLoading = false;
                draft.signUpDone = false;
                draft.signUpError = action.error;
                break;
            case LOAD_MY_INFO_REQUEST:
                draft.loadMyInfoLoading = true;
                draft.loadMyInfoDone = false;
                draft.loadMyInfoError = null;
                break;
            case LOAD_MY_INFO_SUCCESS:
                draft.loadMyInfoLoading = false;
                draft.loadMyInfoDone = true;
                draft.userInfo = action?.data || null;
                break;
            case LOAD_MY_INFO_FAILURE:
                draft.loadMyInfoLoading = false;
                draft.loadMyInfoDone = false;
                draft.loadMyInfoError = action.error;
                break;
            case CHANGE_NICKNAME_REQUEST:
                draft.changeNicknameLoading = true;
                draft.changeNicknameDone = false;
                draft.changeNicknameError = null;
                break;
            case CHANGE_NICKNAME_SUCCESS:
                draft.changeNicknameLoading = false;
                draft.changeNicknameDone = true;
                draft.nickname = action.data.data;
                break;
            case CHANGE_NICKNAME_FAILURE:
                draft.changeNicknameLoading = false;
                draft.changeNicknameDone = false;
                draft.changeNicknameError = action.error;
                break;
            case CHANGE_DESCRIPTION_REQUEST:
                draft.changeDescriptionLoading = true;
                draft.changeDescriptionDone = false;
                draft.changeDescriptionError = null;
                break;
            case CHANGE_DESCRIPTION_SUCCESS:
                draft.changeDescriptionLoading = false;
                draft.changeDescriptionDone = true;
                draft.description = action.data.data;
                break;
            case CHANGE_DESCRIPTION_SUCCESS:
                draft.changeDescriptionLoading = false;
                draft.changeDescriptionDone = false;
                draft.changeDescriptionError = action.error;
                break;
            case ADD_POST_TO_ME:
                draft.userInfo.Posts.unshift({ id: action.data });
                break;
            case REMOVE_POST_OF_ME:
                draft.userInfo.Posts = draft.userInfo.Posts.filter((v) => v.id !== action.data);
                break;
            default:
                break;
        };
    });
};

export default reducer;