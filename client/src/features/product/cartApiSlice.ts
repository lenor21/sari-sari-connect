import { apiSlice } from '../apiSlice';

const CART_URL = '/api/cart';

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: `${CART_URL}`,
        method: 'GET',
      }),
      providesTags: ['Cart'],
    }),
    addCart: builder.mutation({
      query: (data) => ({
        url: `${CART_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const { useGetCartQuery, useAddCartMutation } = cartApiSlice;
