import axios, {AxiosInstance} from "axios";

const baseURL = 'https://pre-onboarding-selection-task.shop/';
const accessToken = localStorage.getItem('access_token');

const customAxios : AxiosInstance = axios.create({
    baseURL : `${baseURL}`,
});

customAxios.interceptors.request.use(
    (config) => {
        if(accessToken) {
            (config.headers)['Authorization'] = 'Bearer' + accessToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// access_token이 없거나 값이 이상할때 signin으로 redirect
customAxios.interceptors.response.use(
    (res) => {
        return res;
    },
    async (error) => {
        if(error.response) {
            if(error.response.status === 401) {
                localStorage.setItem('access_token', '');
                window.location.href = '/signin';
            }
        }
    }
)

export default customAxios;