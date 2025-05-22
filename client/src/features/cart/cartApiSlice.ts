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
    updateQuantity: builder.mutation({
      query: (data) => ({
        url: `${CART_URL}/update-quantity`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Cart'],
    }),
    removeItem: builder.mutation({
      query: (data) => ({
        url: `${CART_URL}/remove-item`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddCartMutation,
  useUpdateQuantityMutation,
  useRemoveItemMutation,
} = cartApiSlice;
