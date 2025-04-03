import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { ReactNode } from 'react';

interface AuthRedirectProps {
  children: ReactNode; // Explicitly type children
  redirectTo?: string; // redirectTo is optional, so use ?
}

const AuthRedirect = ({
  children,
  redirectTo = '/dashboard',
}: AuthRedirectProps) => {
  // Change '/dashboard' to desired route
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return !userInfo ? children : <Navigate to={redirectTo} />;
};

export default AuthRedirect;
