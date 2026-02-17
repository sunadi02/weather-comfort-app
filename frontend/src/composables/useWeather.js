import { ref } from 'vue';
import apiService from '../services/api';

export function useWeather() {
  const cities = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchWeather = async (token) => {
    loading.value = true;
    error.value = null;
    
    try {
      //attach token to api requests
      apiService.setAuthToken(token);
      const response = await apiService.getWeatherData();
      cities.value = response.data;
    } catch (err) {
      error.value = err.response?.data?.error || 'Failed to fetch weather data';
      console.error('Weather fetch error:', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    cities,
    loading,
    error,
    fetchWeather,
  };
}