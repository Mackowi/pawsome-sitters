import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  patronInfo: localStorage.getItem('patronInfo')
    ? JSON.parse(localStorage.getItem('patronInfo'))
    : null,
}

const patronSlice = createSlice({
  name: 'patron',
  initialState,
  reducers: {
    setPatronInfo: (state, action) => {
      state.patronInfo = action.payload
      localStorage.setItem('patronInfo', JSON.stringify(action.payload))
    },
    clearPatronInfo: (state) => {
      state.patronInfo = null
      localStorage.removeItem('patronInfo')
    },
  },
})

export const { setPatronInfo, clearPatronInfo } = patronSlice.actions

export default patronSlice.reducer
