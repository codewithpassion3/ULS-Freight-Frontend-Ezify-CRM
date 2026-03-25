import { useQueryClient } from "@tanstack/react-query"
import { AxiosInstance } from "axios"

function logoutUser() {
    // remove cookies / tokens
    document.cookie = "id=; Max-Age=0; path=/"

    useQueryClient().clear()
    // redirect to login
    window.location.href = "/login"
}

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
            console.log(error?.response)
            const message = error?.response?.data?.errorCode
            // if (message === "INVALID_SESSION") {
            //     console.log("User session invalid")
            //     // return message
            //     // window.location.href = "/login"
            //     logoutUser()
            //     // return Promise.reject(error)
            // }
            return Promise.reject(error)
        }
    )

}