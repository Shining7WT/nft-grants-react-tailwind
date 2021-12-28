
import { getAccessToken, makeUrl, axios } from './index.js';
import { API_ENDPOINT_URL } from '../constants/default.js';

export const getGrantComments = (payload = {}) => {
  const url = makeUrl(`${API_ENDPOINT_URL}/grant-comments/`, { ...(payload.params || {}) });

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

export const addGrantComment = (payload) => {
  const url = `${API_ENDPOINT_URL}/grant-comments`;
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

export const deleteGrantComment = (payload) => {
  const id = payload.id
  const url = `${API_ENDPOINT_URL}/grant-comments/${id}`;
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

export const updateGrantComment = (payload) => {
  const id = payload.id
  const url = `${API_ENDPOINT_URL}/grant-comments/${id}`;
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

