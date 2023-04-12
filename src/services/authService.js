import { authClient } from '../http/authClient';

const register = ({ email, username, password }) => {
  return authClient.post('./registration', { email, username, password });
};

const login = ({ email, password }) => {
  return authClient.post('/login', { email, password });
};

const activate = (activationToken) => {
  return authClient.get(`/activation/${activationToken}`);
};

const checkAuth = (token) => {
  return authClient.post('/check', { token });
};

export const authService = {
  register, activate, login, checkAuth,
};
