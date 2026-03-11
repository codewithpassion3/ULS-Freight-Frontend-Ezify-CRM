import axios from "axios";
import { interceptors } from "./interceptors";

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true
})

interceptors(apiClient)

export default apiClient