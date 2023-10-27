import { PATRONS_URL, SERVICE_REQUESTS_URL, UPLOAD_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const patronsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatrons: builder.query({
      query: () => ({
        url: `${PATRONS_URL}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
    getPatron: builder.query({
      query: () => ({
        url: `${PATRONS_URL}/user`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
    getPatronById: builder.query({
      query: (patronId) => ({
        url: `${PATRONS_URL}/${patronId}`,
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
    updatePatron: builder.mutation({
      query: (data) => ({
        url: `${PATRONS_URL}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Patron'],
    }),
    getPatronsInArea: builder.mutation({
      query: (data) => ({
        url: `${PATRONS_URL}/area`,
        method: 'POST',
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),
    getPatronsAvailability: builder.query({
      query: (patronId) => ({
        url: `${SERVICE_REQUESTS_URL}/${patronId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    uploadPatronImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {
  useGetPatronsQuery,
  useGetPatronQuery,
  useGetPatronByIdQuery,
  useCreatePatronMutation,
  useUpdatePatronMutation,
  useGetPatronsInAreaMutation,
  useGetPatronsAvailabilityQuery,
  useUploadPatronImageMutation,
} = patronsApiSlice
