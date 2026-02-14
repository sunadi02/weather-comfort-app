import { ref, computed } from 'vue';
import apiService from '../services/api';

export function useWeather() {
  const cities = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const cached = ref(false);
  const sortBy = ref('rank');
  const filterText = ref('');

  const fetchWeather = async (token) => {
    loading.value = true;
    error.value = null;
    
    try {
      apiService.setAuthToken(token);
      const response = await apiService.getWeatherData();
      cities.value = response.data;
      cached.value = response.cached;
    } catch (err) {
      error.value = err.response?.data?.error || 'Failed to fetch weather data';
      console.error('Weather fetch error:', err);
    } finally {
      loading.value = false;
    }
  };

  const filteredCities = computed(() => {
    let filtered = cities.value;

    if (filterText.value) {
      const search = filterText.value.toLowerCase();
      filtered = filtered.filter(city => 
        city.cityName.toLowerCase().includes(search) ||
        city.country.toLowerCase().includes(search)
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy.value) {
        case 'rank':
          return a.rank - b.rank;
        case 'temperature':
          return b.temperature - a.temperature;
        case 'name':
          return a.cityName.localeCompare(b.cityName);
        default:
          return 0;
      }
    });

    return sorted;
  });

  const getComfortLevel = (score) => {
    if (score >= 80) return { label: 'Excellent', color: 'text-green-600 dark:text-green-400' };
    if (score >= 60) return { label: 'Good', color: 'text-blue-600 dark:text-blue-400' };
    if (score >= 40) return { label: 'Fair', color: 'text-yellow-600 dark:text-yellow-400' };
    return { label: 'Poor', color: 'text-red-600 dark:text-red-400' };
  };

  return {
    cities,
    filteredCities,
    loading,
    error,
    cached,
    sortBy,
    filterText,
    fetchWeather,
    getComfortLevel,
  };
}