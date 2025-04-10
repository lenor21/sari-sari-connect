import { apiSlice } from '../apiSlice';

const USERS_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/sign-in`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/sign-out`,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    update: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateMutation,
  useGetUsersQuery,
} = usersApiSlice;
