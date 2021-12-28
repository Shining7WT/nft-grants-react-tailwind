import { put, call, takeLatest, all } from 'redux-saga/effects';
import { addGrantComment, getGrantComments, deleteGrantComment, updateGrantComment } from '../../api/GrantComments';
import * as types from '../../constants/actions/GrantComments';
import { SET_NOTIFICATION } from '../../constants/actions/Global';

/* eslint-disable no-use-before-define */
export default function* watchOptionsListener(context = {}) {
  yield takeLatest(types.FETCH_GRANT_COMMENTS_REQUEST, getGrantCommentsSaga);
  yield takeLatest(types.ADD_GRANT_COMMENT_REQUEST, addGrantCommentSaga, context);
  yield takeLatest(types.UPDATE_GRANT_COMMENT_REQUEST, updateGrantCommentSaga, context);
  yield takeLatest(types.DELETE_GRANT_COMMENT_REQUEST, deleteGrantCommentSaga);
}

export function* getGrantCommentsSaga({ payload }) {
  try {
    const res = yield call(getGrantComments, payload);
    yield all([
      put({ type: types.FETCH_GRANT_COMMENTS_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_GRANT_COMMENTS_FAILED, error });
  }
}



export function* addGrantCommentSaga({ history }, { payload }) {
  try {
    const res = yield call(addGrantComment, payload);
    yield all([
      put({ type: types.ADD_GRANT_COMMENT_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Comment added' : res.message || 'Comment not added',
        },
      }),
    ]);    
  } catch (error) {
    yield all([
      put({ type: types.ADD_GRANT_COMMENT_FAILED, error }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: false,
          message: error && error.message ? error.message : 'Server error',
        },
      }),
    ]);
  }
}


export function* deleteGrantCommentSaga({ payload }) {
  try {
    const res = yield call(deleteGrantComment, payload);
    yield all([
      put({ type: types.DELETE_GRANT_COMMENT_SUCCESS, payload }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Comment deleted' : res.message || 'Comment not deleted',
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.DELETE_GRANT_COMMENT_FAILED, error }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: false,
          message: error && error.message ? error.message : 'Server error',
        },
      }),
    ]);
  }
};


export function* updateGrantCommentSaga({ history }, { payload }) {
  try {
    const res = yield call(updateGrantComment, payload);
    yield all([
      put({ type: types.UPDATE_GRANT_COMMENT_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Comment updated' : res.message || 'Comment not updated',
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.UPDATE_GRANT_COMMENT_FAILED, error }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: false,
          message: error && error.message ? error.message : 'Server error',
        },
      }),
    ]);
  }
}