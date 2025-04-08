import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { ReactNode } from 'react';

interface StoreRouteProps {
  children: ReactNode; // Explicitly type children
  redirectTo?: string; // redirectTo is optional, so use ?
}

const StoreRoute = ({
  children,
  redirectTo = '/dashboard',
}: StoreRouteProps) => {
  // Change '/dashboard' to desired route
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return userInfo.role === 'store' ? children : <Navigate to={redirectTo} />;
};

export default StoreRoute;
