import api from "../../../lib/axios"

const login = async (credentials) => {
  const response = await api.post('auth/register', credentials)
  return response.data
}

const signUp = async (registrationData) => {
  const response = await api.post('/auth/login', registrationData)
  return response.data
}

export default {
  login: login,
  signUp: signUp,
}