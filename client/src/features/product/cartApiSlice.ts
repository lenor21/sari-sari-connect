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
  }),
});

export const { useGetCartQuery } = cartApiSlice;
