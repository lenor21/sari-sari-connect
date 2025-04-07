import { apiSlice } from '../apiSlice';

const PRODUCTS_URL = '/api/products';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    add: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    getProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}`,
        method: 'GET',
      }),
      providesTags: ['Category'],
    }),
  }),
});

export const { useAddMutation, useGetProductsQuery } = productsApiSlice;
