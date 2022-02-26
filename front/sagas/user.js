import axios from 'axios';
import { all, fork, delay, put, takeLatest } from 'redux-saga/effects';
import {
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
} from '../reducers/user';

function logInAPI(data) {
    return axios.post(`/user/login`, data);
}

function* logIn(action) {
    try {
        // const result = yield call(logInAPI, action.data);
        yield delay(1000);
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data
        })
    } catch (err) {
        console.log(err);
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data
        })
    }
}

function logOutAPI(data) {
    return axios.post(`/user/logout`);
}

function* logOut(action) {
    try {
        // yield call(logOutAPI);
        yield delay(1000);
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
    return axios.post(`/user/signup`);
}

function* signUp(action) {
    try {
        // yield call(signUpAPI);
        yield delay(1000);
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

function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, logIn)
}

function* watchLogout() {
    yield takeLatest(LOG_OUT_REQUEST, logOut)
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp)
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignUp),
    ])
}