import axios from "axios"

export default axios.create({
  baseURL: process.env.PROXY_API || 'http://localhost:3001/',
});
