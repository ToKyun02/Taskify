import axios from 'axios';

const axiosHelper = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default axiosHelper;
