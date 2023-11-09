import { REVIEWS_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => ({
        url: `${REVIEWS_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${REVIEWS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    getPatronReviews: builder.query({
      query: (patronId) => ({
        url: `${REVIEWS_URL}/patron/${patronId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetReviewsQuery,
  useCreateReviewMutation,
  useGetPatronReviewsQuery,
} = reviewApiSlice
