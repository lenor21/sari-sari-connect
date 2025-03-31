import { createBrowserRouter } from 'react-router';
import App from '@/App';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import Index from '@/pages/dashboard/Index';
import Dashboard from '@/pages/dashboard/Dashboard';
import Profile from '@/pages/dashboard/Profile';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';

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
        element: <SignIn />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
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
]);

export default router;
