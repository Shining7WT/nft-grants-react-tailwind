import { put, call, takeLatest, all } from 'redux-saga/effects';
import { addGrant, applyGrant, deleteGrant, getGrantById, getGrants, updateGrant, getGrantByToken, getStaleGrants, updateStaleGrant, getQueuedGrants, updateQueuedGrant, denyGrant, updateGrantStatus, approveGrant } from '../../api/Grant';
import * as types from '../../constants/actions/Grant';
import { SET_NOTIFICATION } from '../../constants/actions/Global';

/* eslint-disable no-use-before-define */
export default function* watchOptionsListener(context = {}) {
  yield takeLatest(types.FETCH_GRANTS_REQUEST, fetchGrantsSaga);
  yield takeLatest(types.FETCH_STALE_GRANTS_REQUEST, fetchStaleGrantsSaga);
  yield takeLatest(types.FETCH_QUEUED_GRANTS_REQUEST, fetchQueuedGrantsSaga);
  yield takeLatest(types.FETCH_GRANT_REQUEST, fetchGrantSaga);
  yield takeLatest(types.FETCH_GRANT_BY_TOKEN_REQUEST, fetchGrantByTokenSaga);
  yield takeLatest(types.ADD_GRANT_REQUEST, addGrantSaga, context);
  yield takeLatest(types.APPLY_GRANT_REQUEST, applyGrantSaga, context);
  yield takeLatest(types.UPDATE_GRANT_REQUEST, updateGrantSaga, context);
  yield takeLatest(types.UPDATE_GRANT_STATUS_REQUEST, updateGrantStatusSaga, context);
  yield takeLatest(types.APPROVE_GRANT_REQUEST, approveGrantSaga, context);
  yield takeLatest(types.DENY_GRANT_REQUEST, denyGrantSaga, context);
  yield takeLatest(types.UPDATE_STALE_GRANT_REQUEST, updateStaleGrantSaga, context);
  yield takeLatest(types.UPDATE_QUEUED_GRANT_REQUEST, updateQueuedGrantSaga, context);
  yield takeLatest(types.DELETE_GRANT_REQUEST, deleteGrantSaga);
}

export function* fetchGrantsSaga({ payload }) {
  try {
    const res = yield call(getGrants, payload);
    yield all([
      put({ type: types.FETCH_GRANTS_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_GRANTS_FAILED, error });
  }
}

export function* fetchStaleGrantsSaga({ payload }) {
  try {
    const res = yield call(getStaleGrants, payload);
    yield all([
      put({ type: types.FETCH_STALE_GRANTS_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_STALE_GRANTS_FAILED, error });
  }
}

export function* fetchQueuedGrantsSaga({ payload }) {
  try {
    const res = yield call(getQueuedGrants, payload);
    yield all([
      put({ type: types.FETCH_QUEUED_GRANTS_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_QUEUED_GRANTS_FAILED, error });
  }
}

export function* fetchGrantSaga({ payload }) {
  try {
    const res = yield call(getGrantById, payload);
    yield all([
      put({ type: types.FETCH_GRANT_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_GRANT_FAILED, error });
  }
}

export function* fetchGrantByTokenSaga({ payload }) {
  try {
    const res = yield call(getGrantByToken, payload);
    yield all([
      put({ type: types.FETCH_GRANT_BY_TOKEN_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_GRANT_BY_TOKEN_FAILED, error });
  }
}

export function* addGrantSaga({ history }, { payload }) {
  try {
    const res = yield call(addGrant, payload);
    yield all([
      put({ type: types.ADD_GRANT_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Grant added' : res.message || 'Grant not added',
        },
      }),
    ]);
    if (res && res.success && res.data && res.data.id && history) {
      // TODO
    }
  } catch (error) {
    yield all([
      put({ type: types.ADD_GRANT_FAILED, error }),
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

export function* applyGrantSaga({ history }, { payload }) {
  try {
    const res = yield call(applyGrant, payload);
    yield all([
      put({ type: types.APPLY_GRANT_SUCCESS, res }),
    ]);
    if (res && res.success) {
      // TODO
    } else {
      yield all([
        put({
          type: SET_NOTIFICATION,
          payload: {
            success: false,
            message: 'Grant application not sent',
          },
        }),
        put({
          type: types.APPLY_GRANT_STATUS,
          payload: {
            status: false,
          },
        }),
      ])
    }
  } catch (error) {
    yield all([
      put({ type: types.APPLY_GRANT_FAILED, error }),
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

export function* updateGrantSaga({ history }, { payload }) {
  try {
    const res = yield call(updateGrant, payload);
    yield all([
      put({ type: types.UPDATE_GRANT_SUCCESS, res })
    ]);
    if (res && res.success && res.data && res.data.id && history) {
      localStorage.removeItem('grant_app_token')
      // TODO
    }
  } catch (error) {
    yield all([
      put({ type: types.UPDATE_GRANT_FAILED, error }),
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

export function* updateGrantStatusSaga({ history }, { payload }) {
  try {
    const res = yield call(updateGrantStatus, payload);
    yield all([
      put({ type: types.UPDATE_GRANT_STATUS_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Grant Status Updated' : res.message || 'Grant Status is not Updated',
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.UPDATE_GRANT_STATUS_FAILED, error }),
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
export function* updateStaleGrantSaga({ history }, { payload }) {
  try {
    const res = yield call(updateStaleGrant, payload);
    yield all([
      put({ type: types.UPDATE_STALE_GRANT_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Followed Up' : res.message || 'Something went wrong',
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.UPDATE_STALE_GRANT_FAILED, error }),
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

export function* approveGrantSaga({ history }, { payload }) {
  try {
    const res = yield call(approveGrant, payload);
    yield all([
      put({ type: types.APPROVE_GRANT_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Grant Approved' : res.message || 'Something went wrong',
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.UPDATE_QUEUED_GRANT_FAILED, error }),
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

export function* denyGrantSaga({ history }, { payload }) {
  try {
    const res = yield call(denyGrant, payload);
    yield all([
      put({ type: types.DENY_GRANT_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Grant Denied' : res.message || 'Something went wrong',
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.DENY_GRANT_FAILED, error }),
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

export function* updateQueuedGrantSaga({ history }, { payload }) {
  try {
    const res = yield call(updateQueuedGrant, payload);
    yield all([
      put({ type: types.UPDATE_QUEUED_GRANT_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Followed Up' : res.message || 'Something went wrong',
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.UPDATE_QUEUED_GRANT_FAILED, error }),
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

export function* deleteGrantSaga({ payload }) {
  try {
    const res = yield call(deleteGrant, payload);
    yield all([
      put({ type: types.DELETE_GRANT_SUCCESS, payload }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Grant deleted' : res.message || 'Grant not deleted',
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.DELETE_GRANT_FAILED, error }),
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
