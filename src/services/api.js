import axios from 'axios';

// const BASE_URL = 'http://192.168.1.6:5001';
const BASE_URL='http://ec2-34-197-168-116.compute-1.amazonaws.com:5001';

const api = axios.create({
  baseURL: BASE_URL,
});

const AuthService = {
  login: async (email, password) => {
    const headers = {
      'Content-Type': 'application/json',
      'Host': BASE_URL, // Leverage BASE_URL for host consistency (recommended)
      'Content-Length': String(JSON.stringify({ email, password }).length),
    };

    const body = {
      email,
      password,
    };

    try {
      const response = await api.post('/login', body, { headers });
       return response;
    } catch (error) {
      console.error('Login error:', error.response.data);
    }
  },

  signup: (email, password) => api.post('/signup', { email, password }),
  confirmsignup: (email, code) => api.post('/confirmsignup', { email, code }),
  changePassword: (email, newPassword) => api.post('/change-password', { email, newPassword }),
  forgotPassword: (email) => api.post('/forgot-password', { email}),
  confirmForgotPassword: (email,code, newPassword) => api.post('confirm-forgot-password', { email,code, newPassword}),

};

export default AuthService;
