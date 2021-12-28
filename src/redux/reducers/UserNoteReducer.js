import { filter } from 'lodash';
import * as types from '../../constants/actions/UserNote';

/* eslint-disable no-case-declarations */

const initialState = {
  usernote: {},
  usernotes: [],
  total: 0,
  loading: false,
  error: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_USERNOTES_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          usernotes: [],
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        usernotes: (action.res.data && action.res.data.results) || [],
        total: (action.res.data && action.res.data.total) || 0,
        status: action.res.success,
        loading: false,
      };
    case types.FETCH_USERNOTES_REQUEST:
      return {
        ...state,
        usernotes: [],
        loading: true,
      };
    case types.FETCH_USERNOTE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_USERNOTE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_USERNOTE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_USERNOTE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_USERNOTES_FAILED:
      return {
        ...state,
        usernotes: [],
        error: 'Bad Request',
        loading: false,
      };
    case types.FETCH_USERNOTE_SUCCESS:
      if (!action.res.data.success) {
        return {
          ...state,
          usernote: {},
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        usernote: action.res.data || {},
        status: action.res.data.success,
        loading: false,
      };
    case types.FETCH_USERNOTE_FAILED:
      return {
        ...state,
        usernote: {},
        error: 'Bad Request',
        loading: false,
      };
    case types.ADD_USERNOTE_SUCCESS:
      return {
        ...state,
        usernotes: [...state.usernotes, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.ADD_USERNOTE_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.UPDATE_USERNOTE_SUCCESS:
      let usernotes = filter(state.usernotes, item => item.id !== action.res.data.id);
      let newNote = action.res.data;
      newNote.user = filter(state.usernotes, item => item.id === action.res.data.id)[0].user
      return {
        ...state,
        usernote: newNote || {},
        usernotes: [...usernotes, newNote],
        status: action.res.success,
        loading: false,
      };
    case types.UPDATE_USERNOTE_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.DELETE_USERNOTE_SUCCESS:
      return {
        ...state,
        usernotes: state.usernotes.filter((el)=> el.id !== action.payload.id),
        status: true,
        loading: false,
      };
    case types.DELETE_USERNOTE_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    default:
      return state;
  }
}
