import { apiSlice } from '../apiSlice';

const PRODUCTS_URL = '/api/products';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    getProducts: builder.query({
      query: (userId) => ({
        url: `${PRODUCTS_URL}/${userId}`,
        method: 'GET',
      }),
      providesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query: (categoryId) => ({
        url: `${PRODUCTS_URL}/${categoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
} = productsApiSlice;
