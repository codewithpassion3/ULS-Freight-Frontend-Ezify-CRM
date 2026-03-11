import { AxiosInstance } from "axios"
export function interceptors(api: AxiosInstance) {
    api.interceptors.request.use((config) => {
        console.log(config.url)
        return config
    },
        (error) => Promise.reject(error)
    )
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                console.log("Unauthorized");
            }
            return Promise.reject(error)
        }
    )

}