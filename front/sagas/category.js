import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
    SET_CATEGORY_REQUEST, SET_CATEGORY_SUCCESS, SET_CATEGORY_FAILURE,
    ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAILURE, ADD_CATEGORY_REQUEST, LOAD_CATEGORIES_REQUEST, LOAD_CATEGORIES_SUCCESS, LOAD_CATEGORIES_FAILURE,
} from '../reducers/category';
import axios from 'axios';

function setCategoryAPI(data) {
    return axios.patch(`/category`, data);
};

function* setCategory(action) {
    try {
        const result = yield call(setCategoryAPI, action.data);
        yield put({
            type: SET_CATEGORY_SUCCESS,
            data: result.data,
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
    return axios.post(`/category`, data);
};

function* addCategory(action) {
    try {
        const result = yield call(addCategoryAPI, action.data);
        yield put({
            type: ADD_CATEGORY_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.log(err);
        yield put({
            type: ADD_CATEGORY_FAILURE,
            error: err.response
        })
    };
};

function loadCategoriesAPI() {
    return axios.get(`/category`);
};

function* loadCategories() {
    try {
        const result = yield call(loadCategoriesAPI);
        yield put({
            type: LOAD_CATEGORIES_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.log(err);
        yield put({
            type: LOAD_CATEGORIES_FAILURE,
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

function* watchLoadCategories() {
    yield takeLatest(LOAD_CATEGORIES_REQUEST, loadCategories);
}

export default function* postSaga() {
    yield all([
        fork(watchSetCategory),
        fork(watchAddCategory),
        fork(watchLoadCategories),
    ])
}