import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        TokenCybersoft: process.env.REACT_APP_TOKEN_CYBERSOFT,
    },
    timeout: 10000,
});

instance.interceptors.response.use(
    (response) => {
        console.log(response.data.message);
        return response;
    },
    (error) => {
        console.log(error.response.data);
        throw error.response.data;
    }
);

instance.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        Authorization: "Bearer " + localStorage.getItem("token"),
    };
    return config;
});

export default instance;