import { all, fork, call, put, takeLatest } from 'redux-saga/effects';

export default function* postSaga() {
    yield all([
        fork(),
    ])
}