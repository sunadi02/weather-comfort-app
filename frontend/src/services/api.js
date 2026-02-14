import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  setAuthToken(token) {
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.client.defaults.headers.common['Authorization'];
    }
  }

  async getWeatherData() {
    const response = await this.client.get('/weather/cities');
    return response.data;
  }

  async getCacheStatus() {
    const response = await this.client.get('/weather/cache/status');
    return response.data;
  }
}

export default new ApiService();