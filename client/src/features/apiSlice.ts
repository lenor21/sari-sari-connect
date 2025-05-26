import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { clearCredentials } from './auth/authSlice';
import Swal from 'sweetalert2';

const baseQuery = fetchBaseQuery({
  baseUrl: '',
});

const baseQueryWithAuthHandling = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log(
      'RTK Query baseQuery: Detected 401 Unauthorized. Dispatching logoutUser.'
    );

    Swal.fire({
      color: '#0a0a0a',
      title: 'Session Expired!',
      text: 'Your account has been logged out.',
      icon: 'error',
      confirmButtonColor: '#0a0a0a',
    });

    api.dispatch(clearCredentials());
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuthHandling,
  tagTypes: ['User', 'Product', 'Category', 'Cart'],
  endpoints: () => ({}),
});
