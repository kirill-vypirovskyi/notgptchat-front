import React, { useMemo, useState } from 'react';
import { accessTokenService } from '../services/accessTokenService';
import { authService } from '../services/authService';
import { IUser } from '../types/IUser';

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [isChecked, setChecked] = useState(true);

  async function activate(activationToken: string) {
    const {
      accessToken,
      user,
    }: any = await authService.activate(activationToken);

    accessTokenService.save(accessToken);
    setCurrentUser(user);
  }

  async function checkAuth() {
    try {
      const token = accessTokenService.get();
      const { user }: any = await authService.checkAuth(token);

      setCurrentUser(user as unknown as IUser);
    } catch (error) {
      window.console.log('User is not authentincated');
    } finally {
      setChecked(true);
    }
  }

  async function login({ email, password }: any) {
    const {
      accessToken,
      user,
    }: any = await authService.login({ email, password });

    accessTokenService.save(accessToken);
    setCurrentUser(user);
  }

  async function logout() {
    accessTokenService.remove();
    setCurrentUser(null);
  }

  const value = useMemo(() => ({
    isChecked,
    currentUser,
    checkAuth,
    activate,
    login,
    logout,
  }), [currentUser, isChecked]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
