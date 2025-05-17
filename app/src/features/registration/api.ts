import axios from "axios"

export const registrationApi = {
  register: async (credentials: {
    username: string
    email: string
    password: string
  }) => {
    const response = await axios.post(
      "http://127.0.0.1:5000/api/registration",
      credentials
    )
    return response.data
  },
  // login: async (credentials: { email: string; password: string }) => {
  //   const response = await axios.post("/api/auth/login", credentials)
  //   return response.data
  // },
}
