import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice'
import userSliceReducer from './slices/userSlice'
import patronSliceReducer from './slices/patronSlice'
import petOwnersSliceReducer from './slices/petOwnerSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userSliceReducer,
    patron: patronSliceReducer,
    petOwner: petOwnersSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

export default store
