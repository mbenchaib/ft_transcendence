import api from "../../../lib/axios"

const login = async (credentials) => {
  const response = await api.post('/api/sign_up/', credentials)
  return response.data
}

const signUp = async (registrationData) => {
  const response = await api.post('/api/sign_up/', registrationData)
  return response.data
}

export default {
  login: login,
  signUp: signUp
}