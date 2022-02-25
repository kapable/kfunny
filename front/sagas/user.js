import axios from 'axios';
import { all, fork, delay, put, takeLatest } from 'redux-saga/effects';
import {
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
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

function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, logIn)
}

function* watchLogout() {
    yield takeLatest(LOG_OUT_REQUEST, logOut)
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
    ])
}