import { PATRONS_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const patronsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatrons: builder.query({
      query: () => ({
        url: PATRONS_URL,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
    createPatron: builder.mutation({
      query: (data) => ({
        url: `${PATRONS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    getPatron: builder.query({
      query: (userId) => ({
        url: `${PATRONS_URL}/${userId}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
    updatePatron: builder.mutation({
      query: (patronId, data) => ({
        url: `${PATRONS_URL}/${patronId}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
})

export const {
  useGetPatronsQuery,
  useCreatePatronMutation,
  useGetPatronQuery,
  useUpdatePatronMutation,
} = patronsApiSlice
