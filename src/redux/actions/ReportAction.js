import * as types from '../../constants/actions/Report';

export const fetchReportsAction = payload => ({
  type: types.FETCH_REPORTS_REQUEST,
  payload,
});

export const fetchReportAction = payload => ({
  type: types.FETCH_REPORT_REQUEST,
  payload,
});

export const addReportAction = payload => ({
  type: types.ADD_REPORT_REQUEST,
  payload,
});

export const updateReportAction = payload => ({
  type: types.UPDATE_REPORT_REQUEST,
  payload,
});


export const deleteReportAction = payload => ({
  type: types.DELETE_REPORT_REQUEST,
  payload,
});
