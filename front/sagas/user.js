import axios from 'axios';
import { all, fork, delay, put, takeLatest, call } from 'redux-saga/effects';
import {
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
    CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, CHANGE_NICKNAME_FAILURE,
    CHANGE_DESCRIPTION_REQUEST, CHANGE_DESCRIPTION_SUCCESS, CHANGE_DESCRIPTION_FAILURE,
    LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE
} from '../reducers/user';

function logInAPI(data) {
    return axios.post(`/user/login`, data);
}

function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.data);
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data
        })
    } catch (err) {
        console.log(err);
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data
        })
    }
}

function logOutAPI() {
    return axios.post(`/user/logout`);
}

function* logOut() {
    try {
        yield call(logOutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,
        })
    } catch (err) {
        console.log(err);
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data
        })
    }
}

function signUpAPI(data) {
    return axios.post(`/user`, data);
}

function* signUp(action) {
    try {
        const result = yield call(signUpAPI, action.data);
        yield put({
            type: SIGN_UP_SUCCESS,
        })
    } catch (err) {
        console.log(err);
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data
        })
    }
}

function loadMyInfoAPI() {
    return axios.get(`/user`);
}

function* loadMyInfo(action) {
    try {
        const result = yield call(loadMyInfoAPI, action.data);
        console.log('SAGA', result);
        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            data: result?.data || null
        })
    } catch (err) {
        console.log(err);
        yield put({
            type: LOAD_MY_INFO_FAILURE,
            error: err.response.data
        })
    }
};

function changeNicknameAPI(data) {
    return axios.patch(`/user/nickname`, { nickname: data });
}

function* changeNickname(action) {
    try {
        const result = yield call(changeNicknameAPI, action.data);
        yield put({
            type: CHANGE_NICKNAME_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.log(err);
        yield put({
            type: CHANGE_NICKNAME_FAILURE,
            error: err.response.data
        })
    }
}

function changeDescriptionAPI(data) {
    return axios.patch(`/user/description`, { description: data });
}

function* changeDescription(action) {
    try {
        const result = yield call(changeDescriptionAPI, action.data);
        yield put({
            type: CHANGE_DESCRIPTION_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.log(err);
        yield put({
            type: CHANGE_DESCRIPTION_FAILURE,
            error: err.response.data
        })
    }
}

function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, logIn)
}

function* watchLogout() {
    yield takeLatest(LOG_OUT_REQUEST, logOut)
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp)
}

function* watchChangeNickname() {
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname)
}

function* watchChangeDescription() {
    yield takeLatest(CHANGE_DESCRIPTION_REQUEST, changeDescription)
}

function* watchLoadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo)
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignUp),
        fork(watchChangeNickname),
        fork(watchChangeDescription),
        fork(watchLoadMyInfo),
    ])
}