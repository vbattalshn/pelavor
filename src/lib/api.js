import axios from 'axios';
import Cookies from 'js-cookie';

const getLangFromCookie = () => {
  const matches = document.cookie.match(new RegExp('(?:^|; )lang=([^;]*)'));
  return matches ? decodeURIComponent(matches[1]) : 'tr';
};

const apiClient = axios.create({
  baseURL: "https://api.pelavor.com",
});

apiClient.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer GG839uzFjVhae7cpW6yqzBq7NvOzOfHY`;
  if (Cookies.get("session")) {
    config.headers['x-user-token'] = Cookies.get("session");
  }
  
  const lang = getLangFromCookie();
  config.params = {
    ...config.params,
    lang: lang
  };

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
