import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

const initialState = {
    user: {
        isLoggedIn: false,
        userInfo: null,
        signUpData: {},
        loginData: {},
    },
    post: {
        mainPosts: [],
    }
}

export const changeNicknameAction = (data) => {
    return {
        type: 'CHANGE_NICKNAME',
        data: data,
    }
}

export const loginAction = (data) => {
    return {
        type: 'LOG_IN',
        data,
    }
}

export const logoutAction = () => {
    return {
        type: 'LOG_OUT',
    }
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload }
        case 'LOG_IN':
            return {
                ...state,
                user: {
                    ...state,
                    isLoggedIn: true,
                }
            }
        case 'LOG_OUT':
            return {
                ...state,
                user: {
                    ...state,
                    isLoggedIn: false,
                    userInfo: null,
                }
            }
        default:
            return state;
    }
};

export default rootReducer;