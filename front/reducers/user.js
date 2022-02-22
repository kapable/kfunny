export const initialState = {
    isLoggedIn: false,
    userInfo: null,
    signUpData: {},
    loginData: {},
};

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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':{
            return {
                ...state,
                isLoggedIn: true,
            }
        }
        case 'LOG_OUT':{
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            }
        }
        default:{
            return {
                ...state
            };
        };
    };
};

export default reducer;