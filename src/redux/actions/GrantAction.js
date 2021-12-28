import * as types from '../../constants/actions/Grant';

export const fetchGrantsAction = payload => ({
  type: types.FETCH_GRANTS_REQUEST,
  payload,
});

export const fetchQueuedGrantsAction = payload => ({
  type: types.FETCH_QUEUED_GRANTS_REQUEST,
  payload,
});

export const fetchStaleGrantsAction = payload => ({
  type: types.FETCH_STALE_GRANTS_REQUEST,
  payload,
});

export const fetchGrantAction = payload => ({
  type: types.FETCH_GRANT_REQUEST,
  payload,
});

export const fetchGrantByTokenAction = payload => ({
  type: types.FETCH_GRANT_BY_TOKEN_REQUEST,
  payload,
});

export const addGrantAction = payload => ({
  type: types.ADD_GRANT_REQUEST,
  payload,
});

export const applyGrantAction = payload => ({
  type: types.APPLY_GRANT_REQUEST,
  payload,
});

export const setGrantApplicationStatusAction = payload => ({
  type: types.APPLY_GRANT_STATUS,
  payload,
});

export const updateGrantAction = payload => ({
  type: types.UPDATE_GRANT_REQUEST,
  payload,
});

export const updateGrantStatusAction = payload => ({
  type: types.UPDATE_GRANT_STATUS_REQUEST,
  payload,
});

export const approveGrantAction = payload => ({
  type: types.APPROVE_GRANT_REQUEST,
  payload,
});

export const denyGrantAction = payload => ({
  type: types.DENY_GRANT_REQUEST,
  payload
});

export const updateStaleGrantAction = payload => ({
  type: types.UPDATE_STALE_GRANT_REQUEST,
  payload,
});

export const updateQueuedGrantAction = payload => ({
  type: types.UPDATE_QUEUED_GRANT_REQUEST,
  payload,
});

export const deleteGrantAction = payload => ({
  type: types.DELETE_GRANT_REQUEST,
  payload,
});
