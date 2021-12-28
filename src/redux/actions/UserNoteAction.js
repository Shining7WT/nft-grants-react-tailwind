import * as types from '../../constants/actions/UserNote';

export const fetchUserNotesAction = payload => ({
  type: types.FETCH_USERNOTES_REQUEST,
  payload,
});

export const fetchUserNoteAction = payload => ({
  type: types.FETCH_USERNOTE_REQUEST,
  payload,
});

export const addUserNoteAction = payload => ({
  type: types.ADD_USERNOTE_REQUEST,
  payload,
});

export const updateUserNoteAction = payload => ({
  type: types.UPDATE_USERNOTE_REQUEST,
  payload,
});


export const deleteUserNoteAction = payload => ({
  type: types.DELETE_USERNOTE_REQUEST,
  payload,
});
