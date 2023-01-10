// ** Toolkit imports
import { configureStore, Dispatch } from '@reduxjs/toolkit'

// ** Reducers
import example from '../store/apps/example'




export const store = configureStore({
  reducer: {
    example,
   
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

