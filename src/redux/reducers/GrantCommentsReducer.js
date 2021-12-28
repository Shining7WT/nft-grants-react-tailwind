import { filter } from 'lodash';
import * as types from '../../constants/actions/GrantComments';

/* eslint-disable no-case-declarations */

const initialState = {
  comment: {},
  comments: [],
  total: 0,
  loading: false,
  error: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_GRANT_COMMENTS_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          comments: [],
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        comments: (action.res.data && action.res.data.results) || [],
        total: (action.res.data && action.res.data.total) || 0,
        status: action.res.success,
        loading: false,
      };

    case types.FETCH_GRANT_COMMENTS_REQUEST:
      return {
        ...state,
        comments: [],
        loading: true,
      };    
    case types.ADD_GRANT_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_GRANT_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_GRANT_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_GRANT_COMMENTS_FAILED:
      return {
        ...state,
        comments: [],
        error: 'Bad Request',
        loading: false,
      };
    
    case types.ADD_GRANT_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.ADD_GRANT_COMMENT_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.DELETE_GRANT_COMMENT_SUCCESS:
      return {
        ...state,
        total: state.total - 1,
        loading: false,
      };
    case types.DELETE_GRANT_COMMENT_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.UPDATE_GRANT_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.UPDATE_GRANT_COMMENT_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    default:
      return state;
  }
}
