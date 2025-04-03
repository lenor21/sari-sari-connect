import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to='/sign-in' />;
};

export default PrivateRoute;
