import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('AXIOS: Mengirim token -> Bearer', token.substring(0, 10) + '...');
    } else {
      console.warn('AXIOS: Tidak ada token yang dikirim (User mungkin belum login).');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;