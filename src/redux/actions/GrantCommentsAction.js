import * as types from '../../constants/actions/GrantComments';

export const fetchGrantCommentSAction = payload => ({
  type: types.FETCH_GRANT_COMMENTS_REQUEST,
  payload,
});

export const addGrantCommentAction = payload => ({
  type: types.ADD_GRANT_COMMENT_REQUEST,
  payload,
});

export const deleteGrantCommentAction = payload => ({
  type: types.DELETE_GRANT_COMMENT_REQUEST,
  payload,
});

export const updateGrantCommentAction = payload => ({
  type: types.UPDATE_GRANT_COMMENT_REQUEST,
  payload,
});
