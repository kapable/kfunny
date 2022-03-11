import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
    SET_URL_REQUEST, SET_URL_SUCCESS, SET_URL_FAILURE,
    ADD_URL_SUCCESS, ADD_URL_FAILURE, ADD_URL_REQUEST, LOAD_URLS_REQUEST, LOAD_URLS_SUCCESS, LOAD_URLS_FAILURE,
} from '../reducers/url';
import axios from 'axios';

function setUrlAPI(data) {
    return axios.patch(`/urls`, data);
};

function* setUrl(action) {
    try {
        const result = yield call(setUrlAPI, action.data);
        yield put({
            type: SET_URL_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.log(err);
        yield put({
            type: SET_URL_FAILURE,
            error: err.response.data
        })
    };
};

function addUrlAPI(data) {
    return axios.post(`/urls`, data);
};

function* addUrl(action) {
    try {
        const result = yield call(addUrlAPI, action.data);
        yield put({
            type: ADD_URL_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.log(err);
        yield put({
            type: ADD_URL_FAILURE,
            error: err.response
        })
    };
};

function loadUrlsAPI() {
    return axios.get(`/urls`);
};

function* loadUrls() {
    try {
        const result = yield call(loadUrlsAPI);
        yield put({
            type: LOAD_URLS_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.log(err);
        yield put({
            type: LOAD_URLS_FAILURE,
            error: err.response.data
        })
    };
};

function* watchSetUrl() {
    yield takeLatest(SET_URL_REQUEST, setUrl);
}

function* watchAddUrl() {
    yield takeLatest(ADD_URL_REQUEST, addUrl);
}

function* watchLoadUrls() {
    yield takeLatest(LOAD_URLS_REQUEST, loadUrls);
}

export default function* postSaga() {
    yield all([
        fork(watchSetUrl),
        fork(watchAddUrl),
        fork(watchLoadUrls),
    ])
}