import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Loader } from './Loader';

export const RequireAuth = ({ children }: any) => {
  const { isChecked, currentUser }: any = useContext(AuthContext);
  const location = useLocation();

  if (!isChecked) {
    return <Loader />;
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children || <Outlet />;
};
