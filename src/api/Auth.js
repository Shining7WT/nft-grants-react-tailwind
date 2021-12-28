
import { getAccessToken, makeUrl, axios } from './index.js';
import { API_ENDPOINT_URL } from '../constants/default.js';

export const signIn = (payload) => {
  const url = `${API_ENDPOINT_URL}/auth/github`;
  return axios.post(url, payload, {
    headers: {
    //   Authorization: `Bearer ${getAccessToken()}`,
    },
  }).then(res => ({
    success: true,
    data: res.data,
  })).catch(err => ({
    success: false,
    message: err.response.data.message,
  }));
};


export const signOut = () => {
  localStorage.removeItem('grant_app_token');  
};
