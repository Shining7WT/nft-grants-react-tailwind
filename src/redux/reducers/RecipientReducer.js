import { filter } from 'lodash';
import * as types from '../../constants/actions/Recipient';

/* eslint-disable no-case-declarations */

const initialState = {
  recipient: {},
  recipients: [],
  total: 0,
  loading: false,
  error: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_RECIPIENTS_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          recipients: [],
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        recipients: (action.res.data && action.res.data.results) || [],
        total: (action.res.data && action.res.data.total) || 0,
        status: action.res.success,
        loading: false,
      };
    case types.FETCH_RECIPIENTS_REQUEST:
      return {
        ...state,
        recipients: [],
        loading: true,
      };
    case types.FETCH_RECIPIENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_RECIPIENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_RECIPIENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_RECIPIENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_RECIPIENTS_FAILED:
      return {
        ...state,
        recipients: [],
        error: 'Bad Request',
        loading: false,
      };
    case types.FETCH_RECIPIENT_SUCCESS:
      if (!action.res.data.success) {
        return {
          ...state,
          recipient: {},
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        recipient: action.res.data || {},
        status: action.res.data.success,
        loading: false,
      };
    case types.FETCH_RECIPIENT_FAILED:
      return {
        ...state,
        recipient: {},
        error: 'Bad Request',
        loading: false,
      };
    case types.ADD_RECIPIENT_SUCCESS:
      return {
        ...state,
        // recipients: [...state.recipients, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.ADD_RECIPIENT_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.UPDATE_RECIPIENT_SUCCESS:
      let recipients = filter(state.recipients, item => item.id !== action.res.data.id);
      return {
        ...state,
        recipient: action.res.data || {},
        recipients: [...recipients, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.UPDATE_RECIPIENT_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.DELETE_RECIPIENT_SUCCESS:
      recipients = filter(state.recipients, item => item.id !== action.payload.id);

      return {
        ...state,
        recipients: [...recipients],
        status: true,
        loading: false,
      };
    case types.DELETE_RECIPIENT_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    default:
      return state;
  }
}
