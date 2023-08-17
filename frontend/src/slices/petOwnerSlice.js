import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  petOwnerInfo: localStorage.getItem('petOwnerInfo')
    ? JSON.parse(localStorage.getItem('petOwnerInfo'))
    : null,
}

const petOwnerSlice = createSlice({
  name: 'petOwner',
  initialState,
  reducers: {
    setPetOwnerInfo: (state, action) => {
      state.petOwnerInfo = action.payload
      localStorage.setItem('petOwnerInfo', JSON.stringify(action.payload))
    },
    clearPetOwnerInfo: (state) => {
      state.petOwnerInfo = null
      localStorage.removeItem('petOwnerInfo')
    },
  },
})

export const { setPetOwnerInfo, clearPetOwnerInfo } = petOwnerSlice.actions

export default petOwnerSlice.reducer
