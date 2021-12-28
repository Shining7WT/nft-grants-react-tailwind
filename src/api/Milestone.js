
import { getAccessToken, makeUrl, axios } from './index.js';
import { API_ENDPOINT_URL } from '../constants/default.js';

export const getMilestones = (payload = {}) => {
  const url = makeUrl(`${API_ENDPOINT_URL}/milestones/`, {});

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
    params: {
      ...(payload.params || {})
    }
  }).then(res => ({
    success: true,
    data: res.data,
  })).catch(err => ({
    success: false,
    message: err.response.data.message,
  }));
};

export const getMilestoneById = (payload) => {
  const id = payload.id
  const url = makeUrl(`${API_ENDPOINT_URL}/milestones/${id}`, { ...(payload.params || {}) });
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

export const addMilestone = (payload) => {
  const url = `${API_ENDPOINT_URL}/milestones`;
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

export const updateMilestone = (payload) => {
  const id = payload.id
  const url = `${API_ENDPOINT_URL}/milestones/${id}`;
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


export const updateMilestoneData = (payload) => {
  const id = payload.id
  const url = `${API_ENDPOINT_URL}/milestones/${id}`;
  return axios.put(url, payload, {
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

export const deleteMilestone = (payload) => {
  const id = payload.id
  const url = `${API_ENDPOINT_URL}/milestones/${id}`;
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
