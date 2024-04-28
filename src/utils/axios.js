import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://api.openweathermap.org/",
    params: {
        appid: "342b9f3be9c30100ec4e8f8516a30c47"
    }
})

export default axiosInstance