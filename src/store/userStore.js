import { observable, action, makeAutoObservable } from 'mobx';
import { apiCaller } from '../services/apiCaller';

export class UserStore {
  @observable accessor isAuthenticated = false;
  @observable accessor user = null;
  @observable accessor error = null;
  @observable accessor email = '';
  @observable accessor token = '';

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.isAuthenticated = false;
    this.user = null;
    this.error = null;
    this.email = ''
    this.token = ''
  }

  @action
  async login(email, password) {
    try {
      const resp = await apiCaller().post('/login', { email: "sampathvinayak1453@gmail.com", password: "Sampath@123" });
      console.log('Login successful:', resp.data);
      this.email = resp.data.email;
      this.token = resp.data.token;
      this.isAuthenticated = resp.data.isVerified;
      this.error = null;
    } catch (error) {
      console.log('store error', error);
      this.isAuthenticated = false;
      this.error = error.response.data.message;
    }
  }

  @action
  async signup(email, password) {
    try {
      const resp = await apiCaller().post('/signup', { email, password })
      this.email = email;
    
    } catch (error) {
      this.isAuthenticated = false;
      this.error = error.response.data.message;
      console.log(error.response.data)
    }
  }

  @action
  async confirmSignUp(email, confirmationCode) {
    try {
      const resp = await apiCaller().post('/signup', { email, code: confirmationCode })
      this.email = resp.data.email;
      this.isAuthenticated = resp.data.isVerified;
      this.error = null;
    } catch (error) {
      this.isAuthenticated = false;
      this.error = error.response.data.message;
    }
  }

  @action
  async changePassword(oldPassword, newPassword) {
    try {
      this.error = null;
    } catch (error) {
      this.error = error.response.data.message;
    }
  }

  @action
  async forgotPassword() {
    try {
      const resp = await apiCaller().post('/forgot-password', { email: this.email });
      this.error = null;
    } catch (error) {
      this.error = error.response.data.message;
    }
  }

  @action
  async confirmForgotPassword(code, newPassword) {
    try {
      const resp = await apiCaller().post('/confirm-forgot-password',
        { email: this.email, code, newPassword }
      );

      this.error = null;
    } catch (error) {
      this.error = error.response.data.message;
    }
  }

  @action
  logout() {
    this.email = '';
    this.token = '';
    this.isAuthenticated = false;
    this.user = null;
  }
}