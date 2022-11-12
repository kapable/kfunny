import { all, fork } from 'redux-saga/effects';
import userSaga from './user';
import postSaga from './post';
import articleSaga from './article';
import categorySaga from './category';
import urlSaga from './url';
import axios from 'axios';
import { backUrl } from '../config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(postSaga),
        fork(articleSaga),
        fork(categorySaga),
        fork(urlSaga),
    ])
};