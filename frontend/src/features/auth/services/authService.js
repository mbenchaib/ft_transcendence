import api from '../../../lib/axios'
const csrf = () => api.get('/api/auth/csrf')
const login = async credentials => {
  await csrf()
  return (await api.post('/api/auth/login', credentials)).data
}
const signUp = async registrationData => {
  await csrf()
  return (await api.post('/api/auth/register', registrationData)).data
}
const logout = async () => (await api.post('/api/auth/logout')).data
export default { csrf, login, signUp, logout }
