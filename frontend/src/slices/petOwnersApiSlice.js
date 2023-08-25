import { PETOWNERS_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const petOwnersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPetOwners: builder.query({
      query: () => ({
        url: PETOWNERS_URL,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
    getPetOwner: builder.query({
      query: (userId) => ({
        url: `${PETOWNERS_URL}/${userId}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
    createPetOwner: builder.mutation({
      query: (data) => ({
        url: `${PETOWNERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updatePetOwner: builder.mutation({
      query: (data) => ({
        url: `${PETOWNERS_URL}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['PetOwner'],
    }),
  }),
})

export const {
  useGetPetOwnersQuery,
  useGetPetOwnerQuery,
  useCreatePetOwnerMutation,
  useUpdatePetOwnerMutation,
} = petOwnersApiSlice
