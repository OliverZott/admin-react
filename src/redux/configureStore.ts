import { configureStore } from '@reduxjs/toolkit'
import { setUserReducer } from './reducers/setUserReducer'

export const reduxStore = configureStore({ reducer: setUserReducer })
