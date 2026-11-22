import axios from 'axios'

function cookie(name) {
  return document.cookie.split('; ').find(part => part.startsWith(`${name}=`))?.split('=')[1]
}
const api = axios.create({ baseURL: '/', withCredentials: true })
api.interceptors.request.use(config => {
  const token = cookie('csrftoken')
  if (token) config.headers['X-CSRFToken'] = decodeURIComponent(token)
  return config
})
export default api
