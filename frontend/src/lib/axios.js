import axios from "axios"
import getCookie from "./getCookie"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

api.interceptors.request.use(async (config) => {
  let token = getCookie("csrftoken")
  if (!token){
    await api.get('/auth/csrf')
    token = getCookie("csrftoken")
  }
  if (token)
    config.headers["X-CSRFToken"] = token
  return config;
})

export default api