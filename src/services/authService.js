import { authClient } from '../http/authClient';

const register = ({ email, username, password }) => {
  return authClient.post('./registration', { email, username, password });
};

const login = ({ email, password }) => {
  return authClient.post('/login', { email, password });
};

const logout = () => {
  return authClient.post('/logout');
};

const activate = (activationToken) => {
  return authClient.get(`/activation/${activationToken}`);
};

const refresh = () => {
  return authClient.get('/refresh');
};

export const authService = {
  register, activate, login, logout, refresh,
};
