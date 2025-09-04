import axios from 'axios';
import { BASE_URL } from './utils/constants';
import { logout } from './actions/userActions';
import { storeCurrentUserDetails } from './redux/slices/currentUserDetailsSlice';
import { store } from './redux/store';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Add a response interceptor
api.interceptors.response.use(
  response => response, // ✅ pass through successful responses
  error => {
    if (error.response && error.response.status === 401) {
      console.warn('Session expired. Logging out...');
      logout();
      store.dispatch(storeCurrentUserDetails({ user: null }));
    }
    return Promise.reject(error);
  }
);

export default api;
