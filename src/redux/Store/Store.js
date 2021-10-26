import rootReducer from "../Reducers/rootReducer";
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {movie:rootReducer},
})