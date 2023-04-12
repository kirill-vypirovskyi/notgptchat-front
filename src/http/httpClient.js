/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-catch */
import { createClient } from './index';
import { authService } from '../services/authService';
import { accessTokenService } from '../services/accessTokenService';

export const httpClient = createClient();

function onRequest(request) {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
}

function onResponseSuccess(res) {
  return res.data;
}

async function onResponseError(error) {
  const originalRequest = error.config;

  if (error.response.status !== 401) {
    throw error;
  }

  try {
    const { accessToken } = await authService.refresh();

    accessTokenService.save(accessToken);

    return await httpClient.request(originalRequest);
  } catch (err) {
    throw err;
  }
}

httpClient.interceptors.request.use(onRequest);
httpClient.interceptors.response.use(onResponseSuccess, onResponseError);
