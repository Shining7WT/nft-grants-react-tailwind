import { put, call, takeLatest, all } from 'redux-saga/effects';
import { addMilestone, deleteMilestone, getMilestoneById, getMilestones, updateMilestone, updateMilestoneData } from '../../api/Milestone';
import * as types from '../../constants/actions/Milestone';
import { SET_NOTIFICATION } from '../../constants/actions/Global';

/* eslint-disable no-use-before-define */
export default function* watchOptionsListener(context = {}) {
  yield takeLatest(types.FETCH_MILESTONES_REQUEST, fetchMilestonesSaga);
  yield takeLatest(types.FETCH_MILESTONE_REQUEST, fetchMilestoneSaga);
  yield takeLatest(types.ADD_MILESTONE_REQUEST, addMilestoneSaga, context);
  yield takeLatest(types.UPDATE_MILESTONE_REQUEST, updateMilestoneSaga, context);
  yield takeLatest(types.UPDATE_MILESTONE_DATA_REQUEST, updateMilestoneDataSaga, context);
  yield takeLatest(types.DELETE_MILESTONE_REQUEST, deleteMilestoneSaga);
}

export function* fetchMilestonesSaga({ payload }) {
  try {
    const res = yield call(getMilestones, payload);
    yield all([
      put({ type: types.FETCH_MILESTONES_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_MILESTONES_FAILED, error });
  }
}

export function* fetchMilestoneSaga({ payload }) {
  try {
    const res = yield call(getMilestoneById, payload);
    yield all([
      put({ type: types.FETCH_MILESTONE_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_MILESTONE_FAILED, error });
  }
}

export function* addMilestoneSaga({ history }, { payload }) {
  try {
    const res = yield call(addMilestone, payload);
    yield all([
      put({ type: types.ADD_MILESTONE_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Milestone added' : res.message || 'Milestone not added',
        },
      }),
    ]);
    // if (res && res.success && res.data && res.data.id && history) {
    //   history.push('/milestones');
    // }
  } catch (error) {
    yield all([
      put({ type: types.ADD_MILESTONE_FAILED, error }),
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

export function* updateMilestoneSaga({ history }, { payload }) {
  try {
    const res = yield call(updateMilestone, payload);
    yield all([
      put({ type: types.UPDATE_MILESTONE_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Milestone updated' : res.message || 'Milestone not updated',
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.UPDATE_MILESTONE_FAILED, error }),
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


export function* updateMilestoneDataSaga({ history }, { payload }) {
  try {
    const res = yield call(updateMilestoneData, payload);
    yield all([
      put({ type: types.UPDATE_MILESTONE_DATA_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Milestone updated' : res.message || 'Milestone not updated',
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.UPDATE_MILESTONE_DATA_FAILED, error }),
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

export function* deleteMilestoneSaga({ payload }) {
  try {
    const res = yield call(deleteMilestone, payload);
    yield all([
      put({ type: types.DELETE_MILESTONE_SUCCESS, payload }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Milestone deleted' : res.message || 'Milestone not deleted',
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.DELETE_MILESTONE_FAILED, error }),
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
