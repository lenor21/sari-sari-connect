import { apiSlice } from '../apiSlice';

const CATEGORY_URL = '/api/category-products';

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Category'],
    }),
    getCategories: builder.query({
      query: () => ({
        url: `${CATEGORY_URL}`,
        method: 'GET',
      }),
      providesTags: ['Category'],
    }),
  }),
});

export const { useAddCategoryMutation, useGetCategoriesQuery } =
  categoriesApiSlice;
