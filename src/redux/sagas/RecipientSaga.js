import { put, call, takeLatest, all } from 'redux-saga/effects';
import { addRecipient, deleteRecipient, getRecipientById, getRecipients, updateRecipient} from '../../api/Recipient';
import * as types from '../../constants/actions/Recipient';
import { SET_NOTIFICATION } from '../../constants/actions/Global';

/* eslint-disable no-use-before-define */
export default function* watchOptionsListener(context = {}) {
  yield takeLatest(types.FETCH_RECIPIENTS_REQUEST, fetchRecipientsSaga);
  yield takeLatest(types.FETCH_RECIPIENT_REQUEST, fetchRecipientSaga);
  yield takeLatest(types.ADD_RECIPIENT_REQUEST, addRecipientSaga, context);
  yield takeLatest(types.UPDATE_RECIPIENT_REQUEST, updateRecipientSaga, context);
  yield takeLatest(types.DELETE_RECIPIENT_REQUEST, deleteRecipientSaga);
}

export function* fetchRecipientsSaga({ payload }) {
  try {
    const res = yield call(getRecipients, payload);
    yield all([
      put({ type: types.FETCH_RECIPIENTS_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_RECIPIENTS_FAILED, error });
  }
}

export function* fetchRecipientSaga({ payload }) {
  try {
    const res = yield call(getRecipientById, payload);
    yield all([
      put({ type: types.FETCH_RECIPIENT_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_RECIPIENT_FAILED, error });
  }
}

export function* addRecipientSaga({ history }, { payload }) {
  try {
    const res = yield call(addRecipient, payload);
    yield all([
      put({ type: types.ADD_RECIPIENT_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Recipient added' : res.message || 'Recipient not added',
        },
      }),
    ]);
    if (res && res.success && res.data && res.data.id && history) {
      history.push('/recipients');
    }
  } catch (error) {
    yield all([
      put({ type: types.ADD_RECIPIENT_FAILED, error }),
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

export function* updateRecipientSaga({ history }, { payload }) {
  try {
    const res = yield call(updateRecipient, payload);
    yield all([
      put({ type: types.UPDATE_RECIPIENT_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Recipient updated' : res.message || 'Recipient not updated',
        },
      }),
    ]);
    if (res && res.success && res.data && res.data.id && history) {
      history.push('/recipients');
    }
  } catch (error) {
    yield all([
      put({ type: types.UPDATE_RECIPIENT_FAILED, error }),
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

export function* deleteRecipientSaga({ payload }) {
  try {
    const res = yield call(deleteRecipient, payload);
    yield all([
      put({ type: types.DELETE_RECIPIENT_SUCCESS, payload }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Recipient deleted' : res.message || 'Recipient not deleted',
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.DELETE_RECIPIENT_FAILED, error }),
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
