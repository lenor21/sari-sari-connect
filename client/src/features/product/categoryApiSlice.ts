import { apiSlice } from '../apiSlice';

const CATEGORY_URL = '/api/category-products';

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    add: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        url: `${CATEGORY_URL}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useAddMutation, useGetCategoriesQuery } = categoriesApiSlice;
