import Utils from "../utils/utls";
import axios from "axios"
import { notification } from "antd";

const axiosInstance =  axios.create({
  baseURL: process.env.REACT_APP_PROXY_API || 'http://localhost:3001/',
});


axiosInstance.interceptors.request.use((config) => {
  if(!config.headers.authorization) {
    Object.assign(config.headers, {authorization: Utils.getToken()})
  }
  return config;
});

axiosInstance.interceptors.response.use(undefined, (error) => {
    const message: string[] = Object.values(error.response.data.errors);
    notification.error({message: message[0], duration: 1});
})


export default axiosInstance
