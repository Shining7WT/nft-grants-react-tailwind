import { put, call, takeLatest, all } from 'redux-saga/effects';
import { addReport, deleteReport, getReportById, getReports, updateReport} from '../../api/Report';
import * as types from '../../constants/actions/Report';
import { SET_NOTIFICATION } from '../../constants/actions/Global';

/* eslint-disable no-use-before-define */
export default function* watchOptionsListener(context = {}) {
  yield takeLatest(types.FETCH_REPORTS_REQUEST, fetchReportsSaga);
  yield takeLatest(types.FETCH_REPORT_REQUEST, fetchReportSaga);
  yield takeLatest(types.ADD_REPORT_REQUEST, addReportSaga, context);
  yield takeLatest(types.UPDATE_REPORT_REQUEST, updateReportSaga, context);
  yield takeLatest(types.DELETE_REPORT_REQUEST, deleteReportSaga);
}

export function* fetchReportsSaga({ payload }) {
  try {
    const res = yield call(getReports, payload);
    yield all([
      put({ type: types.FETCH_REPORTS_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_REPORTS_FAILED, error });
  }
}

export function* fetchReportSaga({ payload }) {
  try {
    const res = yield call(getReportById, payload);
    yield all([
      put({ type: types.FETCH_REPORT_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_REPORT_FAILED, error });
  }
}

export function* addReportSaga({ history }, { payload }) {
  try {
    const res = yield call(addReport, payload);
    yield all([
      put({ type: types.ADD_REPORT_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Report added' : res.message || 'Report not added',
        },
      }),
    ]);
    if (res && res.success && res.data && res.data.id && history) {
      // TODO
    }
  } catch (error) {
    yield all([
      put({ type: types.ADD_REPORT_FAILED, error }),
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

export function* updateReportSaga({ history }, { payload }) {
  try {
    const res = yield call(updateReport, payload);
    yield all([
      put({ type: types.UPDATE_REPORT_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Report updated' : res.message || 'Report not updated',
        },
      }),
    ]);
    if (res && res.success && res.data && res.data.id && history) {
      // TODO
    }
  } catch (error) {
    yield all([
      put({ type: types.UPDATE_REPORT_FAILED, error }),
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

export function* deleteReportSaga({ payload }) {
  try {
    const res = yield call(deleteReport, payload);
    yield all([
      put({ type: types.DELETE_REPORT_SUCCESS, payload }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Report deleted' : res.message || 'Report not deleted',
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.DELETE_REPORT_FAILED, error }),
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
