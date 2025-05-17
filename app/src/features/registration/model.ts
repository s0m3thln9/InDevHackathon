import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AppThunk } from "@app/store"
import { registrationApi } from "./api"

interface RegistrationState {
  isLoading: boolean
  error: string | null
  success: boolean
}

const initialState: RegistrationState = {
  isLoading: false,
  error: null,
  success: false,
}

const registrationSlice = createSlice({
  name: "registrationSlice",
  initialState,
  reducers: {
    registrationStart(state) {
      state.isLoading = true
      state.error = null
    },
    registrationSuccess(state) {
      state.isLoading = false
      state.success = true
    },
    registrationFailure(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    resetRegistrationState(state) {
      state.isLoading = false
      state.error = null
      state.success = false
    },
  },
})

export const {
  registrationStart,
  registrationSuccess,
  registrationFailure,
  resetRegistrationState,
} = registrationSlice.actions

export default registrationSlice.reducer

export const registerUser =
  (credentials: {
    email: string
    password: string
    full_name: string
    birth_date: string
    passport_number: string
    phone: string
  }): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(registrationStart())
      await registrationApi.register(credentials)
      dispatch(registrationSuccess())
    } catch (error) {
      dispatch(registrationFailure((error as Error).message))
    }
  }
