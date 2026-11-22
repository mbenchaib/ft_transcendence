import axios from "axios"

const api = axios.create({
    baseURL: "https://lend-ungodly-hypnotism.ngrok-free.dev/"
})

export default api