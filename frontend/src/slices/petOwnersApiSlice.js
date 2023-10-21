import { PETOWNERS_URL, SERVICE_REQUESTS_URL } from '../constants'
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
    addPet: builder.mutation({
      query: (data) => ({
        url: `${PETOWNERS_URL}/pets`,
        method: 'POST',
        body: data,
      }),
    }),
    updatePet: builder.mutation({
      query: (data) => ({
        url: `${PETOWNERS_URL}/pets`,
        method: 'PUT',
        body: data,
      }),
    }),
    removePet: builder.mutation({
      query: (petId) => ({
        url: `${PETOWNERS_URL}/pets/${petId}`,
        method: 'DELETE',
      }),
    }),
    addServiceRequest: builder.mutation({
      query: (data) => ({
        url: `${SERVICE_REQUESTS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {
  useGetPetOwnersQuery,
  useGetPetOwnerQuery,
  useCreatePetOwnerMutation,
  useUpdatePetOwnerMutation,
  useAddPetMutation,
  useRemovePetMutation,
  useUpdatePetMutation,
  useAddServiceRequestMutation,
} = petOwnersApiSlice
