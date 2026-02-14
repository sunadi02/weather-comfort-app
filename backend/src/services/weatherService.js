const axios = require('axios');
const NodeCache = require('node-cache');
const config = require('../config');
const comfortIndex = require('./comfortIndex');
const cities = require('../../data/cities.json');

class WeatherService {
  constructor() {
    this.cache = new NodeCache({ stdTTL: config.cacheTTL });
    this.apiKey = config.openWeatherApiKey;
    this.baseURL = 'https://api.openweathermap.org/data/2.5/weather';
  }

  async getWeatherForAllCities() {
    const cacheKey = 'all_cities_weather';
    const cached = this.cache.get(cacheKey);
    
    if (cached) {
      return { data: cached, cached: true };
    }

    const weatherPromises = cities.map(city => this.fetchWeatherForCity(city));
    const results = await Promise.all(weatherPromises);
    
    const processedData = results
      .filter(r => r !== null)
      .map(data => this.processWeatherData(data))
      .sort((a, b) => b.comfortScore - a.comfortScore)
      .map((city, index) => ({ ...city, rank: index + 1 }));

    this.cache.set(cacheKey, processedData);
    
    return { data: processedData, cached: false };
  }

  async fetchWeatherForCity(city) {
    try {
      const response = await axios.get(this.baseURL, {
        params: {
          id: city.id,
          appid: this.apiKey
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch weather for ${city.name}:`, error.message);
      return null;
    }
  }

  processWeatherData(data) {
    return {
      cityId: data.id,
      cityName: data.name,
      country: data.sys.country,
      temperature: Math.round((data.main.temp - 273.15) * 10) / 10,
      feelsLike: Math.round((data.main.feels_like - 273.15) * 10) / 10,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
      visibility: data.visibility,
      cloudiness: data.clouds.all,
      comfortScore: comfortIndex.calculate(data),
      icon: data.weather[0].icon,
      timestamp: Date.now()
    };
  }

  getCacheStats() {
    const keys = this.cache.keys();
    return {
      keys: keys.length,
      stats: this.cache.getStats()
    };
  }
}

module.exports = new WeatherService();