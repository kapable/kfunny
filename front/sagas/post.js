import axios from 'axios';
import { all, fork, delay, put, takeLatest, call } from 'redux-saga/effects';
import {
    LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
    UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE, UPLOAD_IMAGES_REQUEST,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

function loadPostsAPI(data) {
    return axios.get(`/posts/${data.data}?lastId=${data.lastId || 0}`);
}

function* loadPosts(action) {
    try {
        const result = yield call(loadPostsAPI, action);
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.log(err);
        yield put({
            type: LOAD_POSTS_FAILURE,
            error: err.response.data
        })
    };
};

function addPostAPI(data) {
    return axios.post(`/post`, data);
}

function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data);
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
        })
        // yield put({
        //     type: ADD_POST_TO_ME,
        //     data: result.data.id,
        // })
    } catch (err) {
        console.log(err);
        yield put({
            type: ADD_POST_FAILURE,
            error: err.response.data
        })
    };
};

function removePostAPI(data) {
    return axios.delete(`/post/${data}`);
}

function* removePost(action) {
    try {
        const result = yield call(removePostAPI, action.data);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: result.data
        })
        // yield put({
        //     type: REMOVE_POST_OF_ME,
        //     data: action.data
        // })
    } catch (err) {
        console.log(err);
        yield put({
            type: REMOVE_POST_FAILURE,
            error: err.response.data
        })
    }
}

function addCommentAPI(data) {
    return axios.post(`/post/${data.postId}/comment`, data);
};

function* addComment(action) {
    try {
        const result = yield call(addCommentAPI, action.data);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.log(err);
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: err.response.data
        })
    };
};

function uploadImagesAPI(data) {
    return axios.post(`/post/images`, data);
};

function* uploadImages(action) {
    try {
        const result = yield call(uploadImagesAPI, action.data);
        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.log(err);
        yield put({
            type: UPLOAD_IMAGES_FAILURE,
            error: err.response.data
        })
    };
};

function* watchLoadPosts() {
    yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

export default function* postSaga() {
    yield all([
        fork(watchLoadPosts),
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment),
        fork(watchUploadImages),
    ])
}