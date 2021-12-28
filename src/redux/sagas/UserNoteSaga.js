import { put, call, takeLatest, all } from 'redux-saga/effects';
import { addUserNote, deleteUserNote, getUserNoteById, getUserNotes, updateUserNote } from '../../api/UserNote';
import * as types from '../../constants/actions/UserNote';
import { SET_NOTIFICATION } from '../../constants/actions/Global';

/* eslint-disable no-use-before-define */
export default function* watchOptionsListener(context = {}) {
  yield takeLatest(types.FETCH_USERNOTES_REQUEST, fetchUserNotesSaga);
  yield takeLatest(types.FETCH_USERNOTE_REQUEST, fetchUserNoteSaga);
  yield takeLatest(types.ADD_USERNOTE_REQUEST, addUserNoteSaga, context);
  yield takeLatest(types.UPDATE_USERNOTE_REQUEST, updateUserNoteSaga, context);
  yield takeLatest(types.DELETE_USERNOTE_REQUEST, deleteUserNoteSaga);
}

export function* fetchUserNotesSaga({ payload }) {
  try {
    const res = yield call(getUserNotes, payload);
    yield all([
      put({ type: types.FETCH_USERNOTES_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_USERNOTES_FAILED, error });
  }
}

export function* fetchUserNoteSaga({ payload }) {
  try {
    const res = yield call(getUserNoteById, payload);
    yield all([
      put({ type: types.FETCH_USERNOTE_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_USERNOTE_FAILED, error });
  }
}

export function* addUserNoteSaga({ history }, { payload }) {
  try {
    const res = yield call(addUserNote, payload);
    yield all([
      put({ type: types.ADD_USERNOTE_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Note added' : res.message || 'UserNote not added',
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.ADD_USERNOTE_FAILED, error }),
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

export function* updateUserNoteSaga({ history }, { payload }) {
  try {
    const res = yield call(updateUserNote, payload);
    yield all([
      put({ type: types.UPDATE_USERNOTE_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Note updated' : res.message || 'UserNote not updated',
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.UPDATE_USERNOTE_FAILED, error }),
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

export function* deleteUserNoteSaga({ payload }) {
  try {
    const res = yield call(deleteUserNote, payload);
    yield all([
      put({ type: types.DELETE_USERNOTE_SUCCESS, payload }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'UserNote deleted' : res.message || 'UserNote not deleted',
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.DELETE_USERNOTE_FAILED, error }),
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
