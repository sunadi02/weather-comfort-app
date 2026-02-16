const axios = require('axios');
const weatherService = require('./weatherService');
const comfortIndex = require('./comfortIndex');

jest.mock('axios');
jest.mock('./comfortIndex');

describe('WeatherService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    weatherService.cache.flushAll();
  });

  describe('fetchWeatherForCity', () => {
    it('should fetch weather data successfully', async () => {
      const mockResponse = {
        data: {
          id: 5128581,
          name: 'New York',
          sys: { country: 'US' },
          main: { temp: 293.15, feels_like: 291.15, humidity: 65, pressure: 1013 },
          weather: [{ description: 'clear sky', icon: '01d' }],
          wind: { speed: 3.5 },
          visibility: 10000,
          clouds: { all: 20 }
        }
      };

      axios.get.mockResolvedValue(mockResponse);

      const city = { id: 5128581, name: 'New York', country: 'US' };
      const result = await weatherService.fetchWeatherForCity(city);

      expect(axios.get).toHaveBeenCalledWith(
        'https://api.openweathermap.org/data/2.5/weather',
        expect.objectContaining({
          params: {
            id: 5128581,
            appid: expect.any(String)
          }
        })
      );
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle API errors gracefully', async () => {
      axios.get.mockRejectedValue(new Error('API Error'));

      const city = { id: 5128581, name: 'New York', country: 'US' };
      const result = await weatherService.fetchWeatherForCity(city);

      expect(result).toBeNull();
    });
  });

  describe('processWeatherData', () => {
    it('should process weather data correctly', () => {
      const mockData = {
        id: 5128581,
        name: 'New York',
        sys: { country: 'US' },
        main: { temp: 293.15, feels_like: 291.15, humidity: 65, pressure: 1013 },
        weather: [{ description: 'clear sky', icon: '01d' }],
        wind: { speed: 3.5 },
        visibility: 10000,
        clouds: { all: 20 }
      };

      comfortIndex.calculate.mockReturnValue(85.5);

      const result = weatherService.processWeatherData(mockData);

      expect(result).toMatchObject({
        cityId: 5128581,
        cityName: 'New York',
        country: 'US',
        temperature: 20,
        humidity: 65,
        windSpeed: 3.5,
        comfortScore: 85.5
      });
      expect(comfortIndex.calculate).toHaveBeenCalledWith(mockData);
    });

    it('should convert temperature from Kelvin to Celsius', () => {
      const mockData = {
        id: 1,
        name: 'Test',
        sys: { country: 'TS' },
        main: { temp: 273.15, feels_like: 273.15, humidity: 50, pressure: 1013 },
        weather: [{ description: 'test', icon: '01d' }],
        wind: { speed: 2 },
        visibility: 10000,
        clouds: { all: 10 }
      };

      comfortIndex.calculate.mockReturnValue(90);

      const result = weatherService.processWeatherData(mockData);

      expect(result.temperature).toBe(0);
    });
  });

  describe('getWeatherForAllCities', () => {
    it('should return cached data when available', async () => {
      const cachedData = [
        { cityId: 1, cityName: 'Test', rank: 1, comfortScore: 90 }
      ];

      weatherService.cache.set('all_cities_weather', cachedData);

      const result = await weatherService.getWeatherForAllCities();

      expect(result.cached).toBe(true);
      expect(result.data).toEqual(cachedData);
    });

    it('should fetch and process data when cache is empty', async () => {
      const mockWeatherData = {
        id: 5128581,
        name: 'New York',
        sys: { country: 'US' },
        main: { temp: 293.15, feels_like: 291.15, humidity: 65, pressure: 1013 },
        weather: [{ description: 'clear sky', icon: '01d' }],
        wind: { speed: 3.5 },
        visibility: 10000,
        clouds: { all: 20 }
      };

      axios.get.mockResolvedValue({ data: mockWeatherData });
      comfortIndex.calculate.mockReturnValue(85.5);

      const result = await weatherService.getWeatherForAllCities();

      expect(result.cached).toBe(false);
      expect(result.data).toBeInstanceOf(Array);
      expect(result.data.length).toBeGreaterThan(0);
      expect(result.data[0]).toHaveProperty('rank');
    });

    it('should sort cities by comfort score descending', async () => {
      const mockWeatherData1 = {
        id: 1,
        name: 'City1',
        sys: { country: 'C1' },
        main: { temp: 293.15, feels_like: 291.15, humidity: 65, pressure: 1013 },
        weather: [{ description: 'clear', icon: '01d' }],
        wind: { speed: 3 },
        visibility: 10000,
        clouds: { all: 20 }
      };

      const mockWeatherData2 = {
        id: 2,
        name: 'City2',
        sys: { country: 'C2' },
        main: { temp: 293.15, feels_like: 291.15, humidity: 65, pressure: 1013 },
        weather: [{ description: 'clear', icon: '01d' }],
        wind: { speed: 3 },
        visibility: 10000,
        clouds: { all: 20 }
      };

      axios.get
        .mockResolvedValueOnce({ data: mockWeatherData1 })
        .mockResolvedValueOnce({ data: mockWeatherData2 });

      comfortIndex.calculate
        .mockReturnValueOnce(70)
        .mockReturnValueOnce(90);

      const result = await weatherService.getWeatherForAllCities();

      expect(result.data[0].comfortScore).toBeGreaterThanOrEqual(result.data[1].comfortScore);
      expect(result.data[0].rank).toBe(1);
      expect(result.data[1].rank).toBe(2);
    });

    it('should cache processed data', async () => {
      const mockWeatherData = {
        id: 5128581,
        name: 'New York',
        sys: { country: 'US' },
        main: { temp: 293.15, feels_like: 291.15, humidity: 65, pressure: 1013 },
        weather: [{ description: 'clear sky', icon: '01d' }],
        wind: { speed: 3.5 },
        visibility: 10000,
        clouds: { all: 20 }
      };

      axios.get.mockResolvedValue({ data: mockWeatherData });
      comfortIndex.calculate.mockReturnValue(85.5);

      await weatherService.getWeatherForAllCities();

      const cachedValue = weatherService.cache.get('all_cities_weather');
      expect(cachedValue).toBeDefined();
      expect(cachedValue).toBeInstanceOf(Array);
    });
  });

  describe('getCacheStats', () => {
    it('should return cache statistics', () => {
      const stats = weatherService.getCacheStats();

      expect(stats).toHaveProperty('keys');
      expect(stats).toHaveProperty('stats');
      expect(typeof stats.keys).toBe('number');
    });

    it('should reflect cached items count', () => {
      weatherService.cache.set('test_key', 'test_value');

      const stats = weatherService.getCacheStats();

      expect(stats.keys).toBeGreaterThan(0);
    });
  });
});
