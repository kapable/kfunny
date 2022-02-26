import { all, fork, delay, put, takeLatest } from 'redux-saga/effects';
import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';
import shortid from 'shortid';

function addPostAPI(data) {
    return axios.post(`/post`, data);
}

function* addPost(action) {
    try {
        // const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        const id = shortid.generate()
        yield put({
            type: ADD_POST_SUCCESS,
            data: {
                id,
                content: action.data,
            },
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

function addCommentAPI(data) {
    return axios.post(`/post/${data.postId}/comment`, data);
};

function* addComment(action) {
    try {
        // const result = yield call(addCommentAPI, action.data);
        yield delay(1000);
        const id = shortid.generate()
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data,
        })
    } catch (err) {
        console.log(err);
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: err.response.data
        })
    };
};

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
    ])
}