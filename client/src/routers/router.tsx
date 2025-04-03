import { createBrowserRouter } from 'react-router';
import App from '@/App';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import Index from '@/pages/dashboard/Index';
import Dashboard from '@/pages/dashboard/Dashboard';
import Profile from '@/pages/dashboard/Profile';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import PrivateRoute from '@/pages/PrivateRoute';
import AuthRedirect from '@/pages/AuthRedirect';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <AuthRedirect redirectTo='/dashboard'>
            <Home />
          </AuthRedirect>
        ),
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
        path: '',
        element: <PrivateRoute />,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />,
            children: [
              {
                path: '/dashboard',
                element: <Index />,
              },
              {
                path: '/dashboard/profile',
                element: <Profile />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
