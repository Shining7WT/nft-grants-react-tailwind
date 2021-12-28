import { filter } from 'lodash';
import * as types from '../../constants/actions/Report';

/* eslint-disable no-case-declarations */

const initialState = {
  report: {},
  reports: [],
  total: 0,
  loading: false,
  error: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_REPORTS_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          reports: [],
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        report: (action.res.data) || {},
        status: action.res.success,
        loading: false,
      };
    case types.FETCH_REPORTS_REQUEST:
      return {
        ...state,
        reports: [],
        loading: true,
      };
    case types.FETCH_REPORT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_REPORT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_REPORT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_REPORT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_REPORTS_FAILED:
      return {
        ...state,
        reports: [],
        error: 'Bad Request',
        loading: false,
      };
    case types.FETCH_REPORT_SUCCESS:
      if (!action.res.data.success) {
        return {
          ...state,
          report: {},
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        report: action.res.data || {},
        status: action.res.data.success,
        loading: false,
      };
    case types.FETCH_REPORT_FAILED:
      return {
        ...state,
        report: {},
        error: 'Bad Request',
        loading: false,
      };
    case types.ADD_REPORT_SUCCESS:
      return {
        ...state,
        // reports: [...state.reports, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.ADD_REPORT_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.UPDATE_REPORT_SUCCESS:
      let reports = filter(state.reports, item => item.id !== action.res.data.id);
      return {
        ...state,
        report: action.res.data || {},
        reports: [...reports, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.UPDATE_REPORT_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.DELETE_REPORT_SUCCESS:
      reports = filter(state.reports, item => item.id !== action.payload.id);

      return {
        ...state,
        reports: [...reports],
        status: true,
        loading: false,
      };
    case types.DELETE_REPORT_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    default:
      return state;
  }
}
