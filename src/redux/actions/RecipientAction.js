import * as types from '../../constants/actions/Recipient';

export const fetchRecipientsAction = payload => ({
  type: types.FETCH_RECIPIENTS_REQUEST,
  payload,
});

export const fetchRecipientAction = payload => ({
  type: types.FETCH_RECIPIENT_REQUEST,
  payload,
});

export const addRecipientAction = payload => ({
  type: types.ADD_RECIPIENT_REQUEST,
  payload,
});

export const updateRecipientAction = payload => ({
  type: types.UPDATE_RECIPIENT_REQUEST,
  payload,
});


export const deleteRecipientAction = payload => ({
  type: types.DELETE_RECIPIENT_REQUEST,
  payload,
});
