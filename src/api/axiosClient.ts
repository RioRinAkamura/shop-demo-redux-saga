import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosClient = axios.create({
    baseURL:"https://api-json-sever-demo.herokuapp.com/api",
    headers:{
        'Content-Type': 'application/json'
    },
});

// Add a request interceptor
axiosClient.interceptors.request.use(function (config: AxiosRequestConfig) {
    // Do something before request is sent
    return config;
  }, function (error) {

    return Promise.reject(error);
  });

axiosClient.interceptors.response.use(function (response: AxiosResponse) {

    return response.data;
  }, function (error) {

    return Promise.reject(error);
  });


export default axiosClient