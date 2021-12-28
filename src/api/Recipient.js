
import { getAccessToken, makeUrl, axios } from './index.js';
import { API_ENDPOINT_URL } from '../constants/default.js';

export const getRecipients = (payload = {}) => {

  let url;

  if(payload.searchValue)
    url = makeUrl(`${API_ENDPOINT_URL}/recipients?search=${payload.searchValue}`, { ...(payload.params || {}) });    
  else
    url = makeUrl(`${API_ENDPOINT_URL}/recipients/`, { ...(payload.params || {}) });

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }).then(res => ({
    success: true,
    data: res.data,
  })).catch(err => ({
    success: false,
    message: err.response.data.message,
  }));
};

export const getRecipientById = (payload) => {
  const id = payload.id
  const url = makeUrl(`${API_ENDPOINT_URL}/recipients/${id}`, { ...(payload.params || {}) });
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`
    },
  }).then(res => ({
    success: true,
    data: res.data,
  })).catch(err => ({
    success: false,
    message: err.response.data.message,
  }));
};

export const addRecipient = (payload) => {
  const url = `${API_ENDPOINT_URL}/recipients`;
  return axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }).then(res => ({
    success: true,
    data: res.data,
  })).catch(err => ({
    success: false,
    message: err.response.data.message,
  }));
};

export const updateRecipient = (payload) => {
  const id = payload.id
  const url = `${API_ENDPOINT_URL}/recipients/${id}`;
  return axios.patch(url, payload, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }).then(res => ({
    success: true,
    data: res.data,
  })).catch(err => ({
    success: false,
    message: err.response.data.message,
  }));
};

export const deleteRecipient = (payload) => {
  const id = payload.id
  const url = `${API_ENDPOINT_URL}/recipients/${id}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }).then(res => ({
    success: true,
    data: res.data,
  })).catch(err => ({
    success: false,
    message: err.response.data.message,
  }));
};
