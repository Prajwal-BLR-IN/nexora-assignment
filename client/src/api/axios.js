import axios from "axios"
const api = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api` || "https://nexora-assignment-one.vercel.app/api"
})

export default api