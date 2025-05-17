import {
  configureStore,
  combineReducers,
  type ThunkAction,
} from "@reduxjs/toolkit"
import { registrationSlice } from "@features/registration"

const rootReducer = combineReducers({
  registrationSlice: registrationSlice,
  // login: loginReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  any
>
