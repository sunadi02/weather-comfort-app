const request = require('supertest');
const express = require('express');
const weatherRoutes = require('./weather');
const weatherService = require('../services/weatherService');

jest.mock('../services/weatherService');
jest.mock('../middleware/auth', () => ({
  checkJwt: (req, res, next) => next()
}));

const app = express();
app.use(express.json());
app.use('/api/weather', weatherRoutes);

describe('Weather Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/weather/cities', () => {
    it('should return weather data successfully', async () => {
      const mockData = [
        {
          cityId: 5128581,
          cityName: 'New York',
          country: 'US',
          temperature: 20,
          comfortScore: 85.5,
          rank: 1
        }
      ];

      weatherService.getWeatherForAllCities.mockResolvedValue({
        data: mockData,
        cached: false
      });

      const response = await request(app)
        .get('/api/weather/cities')
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        cached: false,
        data: mockData
      });
    });

    it('should indicate when data is cached', async () => {
      const mockData = [{ cityName: 'Test', rank: 1 }];

      weatherService.getWeatherForAllCities.mockResolvedValue({
        data: mockData,
        cached: true
      });

      const response = await request(app)
        .get('/api/weather/cities')
        .expect(200);

      expect(response.body.cached).toBe(true);
    });

    it('should handle service errors', async () => {
      weatherService.getWeatherForAllCities.mockRejectedValue(
        new Error('Service error')
      );

      const response = await request(app)
        .get('/api/weather/cities')
        .expect(500);

      expect(response.body).toMatchObject({
        success: false,
        error: 'Service error'
      });
    });

    it('should return sorted data by rank', async () => {
      const mockData = [
        { cityName: 'City1', rank: 1, comfortScore: 90 },
        { cityName: 'City2', rank: 2, comfortScore: 85 },
        { cityName: 'City3', rank: 3, comfortScore: 80 }
      ];

      weatherService.getWeatherForAllCities.mockResolvedValue({
        data: mockData,
        cached: false
      });

      const response = await request(app)
        .get('/api/weather/cities')
        .expect(200);

      expect(response.body.data[0].rank).toBe(1);
      expect(response.body.data[1].rank).toBe(2);
      expect(response.body.data[2].rank).toBe(3);
    });
  });

  describe('GET /api/weather/cache/status', () => {
    it('should return cache statistics', async () => {
      const mockStats = {
        keys: 1,
        stats: {
          hits: 10,
          misses: 2
        }
      };

      weatherService.getCacheStats.mockReturnValue(mockStats);

      const response = await request(app)
        .get('/api/weather/cache/status')
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        cache: mockStats
      });
    });

    it('should return zero keys when cache is empty', async () => {
      weatherService.getCacheStats.mockReturnValue({
        keys: 0,
        stats: { hits: 0, misses: 0 }
      });

      const response = await request(app)
        .get('/api/weather/cache/status')
        .expect(200);

      expect(response.body.cache.keys).toBe(0);
    });
  });
});
