import Utils from "../utils/utls";
import axios from "axios"

const axiosInstance =  axios.create({
  baseURL: process.env.REACT_APP_PROXY_API || 'http://localhost:3001/',
});


axiosInstance.interceptors.request.use((config) => {
  if(!config.headers.authorization) {
    Object.assign(config.headers, {authorization: Utils.getToken()})
  }
  return config;
});


export default axiosInstance
