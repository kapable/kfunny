import axios from 'axios';
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
    LOAD_ARTICLES_REQUEST, LOAD_ARTICLES_SUCCESS, LOAD_ARTICLES_FAILURE,
    ADD_ARTICLE_REQUEST, ADD_ARTICLE_SUCCESS, ADD_ARTICLE_FAILURE,
    REMOVE_ARTICLE_REQUEST, REMOVE_ARTICLE_SUCCESS, REMOVE_ARTICLE_FAILURE,
    EDIT_ARTICLE_REQUEST, EDIT_ARTICLE_SUCCESS, EDIT_ARTICLE_FAILURE,
    UPLOAD_ARTICLE_IMAGE_SUCCESS, UPLOAD_ARTICLE_IMAGE_FAILURE, UPLOAD_ARTICLE_IMAGE_REQUEST,
    LOAD_ARTICLE_REQUEST, LOAD_ARTICLE_SUCCESS, LOAD_ARTICLE_FAILURE,
} from '../reducers/article';

function loadArticlesAPI(data) {
    return axios.get(`/articles/${data.data}?lastId=${data.lastId || 0}`);
}

function* loadArticles(action) {
    try {
        const result = yield call(loadArticlesAPI, action);
        yield put({
            type: LOAD_ARTICLES_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.log(err)
        yield put({
            type: LOAD_ARTICLES_FAILURE,
            error: err.response
        })
    };
};

function loadArticleAPI(data) {
    return axios.get(`/article/${data}`);
}

function* loadArticle(action) {
    try {
        const result = yield call(loadArticleAPI, action.data);
        yield put({
            type: LOAD_ARTICLE_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.log(err)
        yield put({
            type: LOAD_ARTICLE_FAILURE,
            error: err.response
        })
    };
};

function addArticleAPI(data) {
    return axios.post(`/article`, data);
}

function* addArticle(action) {
    try {
        const result = yield call(addArticleAPI, action.data);
        yield put({
            type: ADD_ARTICLE_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: ADD_ARTICLE_FAILURE,
            error: err.response.data
        })
    };
};

function removeArticleAPI(data) {
    return axios.delete(`/article/${data}`);
}

function* removeArticle(action) {
    try {
        const result = yield call(removeArticleAPI, action.data);
        yield put({
            type: REMOVE_ARTICLE_SUCCESS,
            data: result.data
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: REMOVE_ARTICLE_FAILURE,
            error: err.response.data
        })
    }
}

function editArticleAPI(data) {
    return axios.patch(`/article/${data.articleId}`, data);
}

function* editArticle(action) {
    try {
        const result = yield call(editArticleAPI, action.data);
        yield put({
            type: EDIT_ARTICLE_SUCCESS,
            data: result.data
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: EDIT_ARTICLE_FAILURE,
            error: err.response.data
        })
    }
}

function uploadArticleImageAPI(data) {
    return axios.post(`/article/images`, data);
};

function* uploadArticleImage(action) {
    try {
        const result = yield call(uploadArticleImageAPI, action.data);
        yield put({
            type: UPLOAD_ARTICLE_IMAGE_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.log(err);
        yield put({
            type: UPLOAD_ARTICLE_IMAGE_FAILURE,
            error: err.response.data
        })
    };
};

function* watchLoadArticles() {
    yield takeLatest(LOAD_ARTICLES_REQUEST, loadArticles);
}

function* watchLoadArticle() {
    yield takeLatest(LOAD_ARTICLE_REQUEST, loadArticle);
}

function* watchAddArticle() {
    yield takeLatest(ADD_ARTICLE_REQUEST, addArticle);
}

function* watchRemoveArticle() {
    yield takeLatest(REMOVE_ARTICLE_REQUEST, removeArticle);
}

function* watchEditArticle() {
    yield takeLatest(EDIT_ARTICLE_REQUEST, editArticle);
}

function* watchUploadArticleImage() {
    yield takeLatest(UPLOAD_ARTICLE_IMAGE_REQUEST, uploadArticleImage);
}

export default function* articleSaga() {
    yield all([
        fork(watchLoadArticles),
        fork(watchLoadArticle),
        fork(watchAddArticle),
        fork(watchRemoveArticle),
        fork(watchEditArticle),
        fork(watchUploadArticleImage),
    ])
}