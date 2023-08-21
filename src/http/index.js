import axios from 'axios';

// export const API_URL = 'http://localhost:5000';
export const API_URL = 'http://localhost:5000';

const $api = axios.create({
   baseURL: API_URL,
   withCredentials: true,
   headers: {
      'Content-Type': 'application/json'
   }
})

$api.interceptors.request.use((config) => {
   config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
   return config;
})
$api.interceptors.response.use(config => config, async err => {
   const originalRequest = err.config;
   if (err?.response?.status === 401 && err.config && !err.config._isRetry) {
      originalRequest._isRetry = true
      try {
         const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true })
         localStorage.setItem('accessToken', response.data);
         return await $api.request(originalRequest)
      } catch (e) {
         throw e
      }
   }

   if (err?.response?.status === 400) {
      return err
   }

   throw err
})

export default $api;