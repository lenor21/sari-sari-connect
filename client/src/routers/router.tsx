import { createBrowserRouter } from 'react-router';
import App from '@/App';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import Stores from '@/pages/dashboard/Stores';
import Dashboard from '@/pages/dashboard/Dashboard';
import Profile from '@/pages/dashboard/Profile';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import PrivateRoute from '@/pages/PrivateRoute';
import AuthRedirect from '@/pages/AuthRedirect';
import Products from '@/pages/dashboard/products/Products';
import StoreRegister from '@/pages/StoreRegister';
import AddProduct from '@/pages/dashboard/products/AddProduct';
import Root from '@/pages/dashboard/products/Root';
import Category from '@/pages/dashboard/products/Category';
import StoreRoute from '@/pages/StoreRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: '/sign-in',
        element: (
          <AuthRedirect redirectTo='/dashboard'>
            <SignIn />
          </AuthRedirect>
        ),
      },
      {
        path: '/sign-up',
        element: (
          <AuthRedirect redirectTo='/dashboard'>
            <SignUp />
          </AuthRedirect>
        ),
      },
      {
        path: '/store-register',
        element: (
          <AuthRedirect redirectTo='/dashboard'>
            <StoreRegister />
          </AuthRedirect>
        ),
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            element: <Dashboard />,
            children: [
              {
                path: '/dashboard',
                element: <Profile />,
              },
              {
                path: '/dashboard/stores',
                element: <Stores />,
              },
              {
                path: '/dashboard/products',
                element: (
                  <StoreRoute>
                    <Root />
                  </StoreRoute>
                ),
                children: [
                  {
                    path: '/dashboard/products',
                    element: <Products />,
                  },
                  {
                    path: '/dashboard/products/add-product',
                    element: <AddProduct />,
                  },
                  {
                    path: '/dashboard/products/categories',
                    element: <Category />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
