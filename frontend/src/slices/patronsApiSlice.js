import { PATRONS_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const patronsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatrons: builder.query({
      query: () => ({
        url: PATRONS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const { useGetPatronsQuery } = patronsApiSlice
