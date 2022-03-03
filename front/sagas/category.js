import { all, fork, delay, put, takeLatest, call } from 'redux-saga/effects';
import {
    SET_CATEGORY_REQUEST, SET_CATEGORY_SUCCESS, SET_CATEGORY_FAILURE,
    ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAILURE, ADD_CATEGORY_REQUEST,
} from '../reducers/category';

function setCategoryAPI(data) {
    return axios.post(`/post/${data.postId}/comment`, data);
};

function* setCategory(action) {
    try {
        // const result = yield call(setCategoryAPI, action.data);
        yield delay(1000);
        yield put({
            type: SET_CATEGORY_SUCCESS,
            data: action.data,
        })
    } catch (err) {
        console.log(err);
        yield put({
            type: SET_CATEGORY_FAILURE,
            error: err.response.data
        })
    };
};

function addCategoryAPI(data) {
    return axios.post(`/post/${data.postId}/comment`, data);
};

function* addCategory(action) {
    try {
        // const result = yield call(addCategoryAPI, action.data);
        yield delay(1000);
        yield put({
            type: ADD_CATEGORY_SUCCESS,
            data: action.data,
        })
    } catch (err) {
        console.log(err);
        yield put({
            type: ADD_CATEGORY_FAILURE,
            error: err.response.data
        })
    };
};

function* watchSetCategory() {
    yield takeLatest(SET_CATEGORY_REQUEST, setCategory);
}

function* watchAddCategory() {
    yield takeLatest(ADD_CATEGORY_REQUEST, addCategory);
}

export default function* postSaga() {
    yield all([
        fork(watchSetCategory),
        fork(watchAddCategory),
    ])
}