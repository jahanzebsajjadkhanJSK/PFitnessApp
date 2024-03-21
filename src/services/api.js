import axios from 'axios';

const BASE_URL = 'http://localhost:5001';

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
      // Handle successful login response (e.g., store token, navigate to next screen)
      console.log('Login successful:', response);
    } catch (error) {
      // Handle login errors (e.g., display error message to user)
      console.error('Login error:', error);
    }
  },

  signup: (email, password) => api.post('/signup', { email, password }),
  confirmsignup: (email, code) => api.post('/confirmsignup', { email, code }),
  changePassword: (email, newPassword) => api.post('/change-password', { email, newPassword }),
  forgotPassword: (email) => api.post('/forgot-password', { email}),
  confirmForgotPassword: (email,code, newPassword) => api.post('confirm-forgot-password', { email,code, newPassword}),

};

export default AuthService;
