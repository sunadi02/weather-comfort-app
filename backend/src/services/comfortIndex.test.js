const comfortIndex = require('./comfortIndex');

describe('ComfortIndexCalculator', () => {
  describe('calculate', () => {
    it('should return a score between 0 and 100', () => {
      const weatherData = {
        main: {
          temp: 293.15,
          humidity: 50,
          pressure: 1013
        },
        wind: { speed: 3 },
        visibility: 10000,
        clouds: { all: 20 }
      };

      const score = comfortIndex.calculate(weatherData);
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    });

    it('should return perfect score for ideal conditions', () => {
      const weatherData = {
        main: {
          temp: 294.15,
          humidity: 50,
          pressure: 1013
        },
        wind: { speed: 3 },
        visibility: 10000,
        clouds: { all: 10 }
      };

      const score = comfortIndex.calculate(weatherData);
      expect(score).toBeGreaterThan(95);
    });

    it('should return lower score for extreme temperature', () => {
      const weatherData = {
        main: {
          temp: 313.15,
          humidity: 50,
          pressure: 1013
        },
        wind: { speed: 3 },
        visibility: 10000,
        clouds: { all: 10 }
      };

      const score = comfortIndex.calculate(weatherData);
      expect(score).toBeLessThan(80);
    });

    it('should return lower score for high humidity', () => {
      const weatherData = {
        main: {
          temp: 293.15,
          humidity: 90,
          pressure: 1013
        },
        wind: { speed: 3 },
        visibility: 10000,
        clouds: { all: 10 }
      };

      const score = comfortIndex.calculate(weatherData);
      expect(score).toBeLessThan(80);
    });

    it('should return lower score for high wind speed', () => {
      const weatherData = {
        main: {
          temp: 293.15,
          humidity: 50,
          pressure: 1013
        },
        wind: { speed: 15 },
        visibility: 10000,
        clouds: { all: 10 }
      };

      const score = comfortIndex.calculate(weatherData);
      expect(score).toBeLessThan(90);
    });
  });

  describe('calculateTemperatureScore', () => {
    it('should return 100 for optimal temperature range', () => {
      expect(comfortIndex.calculateTemperatureScore(20)).toBe(100);
      expect(comfortIndex.calculateTemperatureScore(22)).toBe(100);
    });

    it('should return lower score for cold temperature', () => {
      expect(comfortIndex.calculateTemperatureScore(5)).toBeLessThan(50);
    });

    it('should return lower score for hot temperature', () => {
      expect(comfortIndex.calculateTemperatureScore(35)).toBeLessThan(50);
    });
  });

  describe('calculateHumidityScore', () => {
    it('should return 100 for optimal humidity', () => {
      expect(comfortIndex.calculateHumidityScore(50)).toBe(100);
    });

    it('should return lower score for low humidity', () => {
      expect(comfortIndex.calculateHumidityScore(20)).toBeLessThan(100);
    });

    it('should return lower score for high humidity', () => {
      expect(comfortIndex.calculateHumidityScore(80)).toBeLessThan(100);
    });
  });

  describe('calculateWindScore', () => {
    it('should return 100 for calm wind', () => {
      expect(comfortIndex.calculateWindScore(2)).toBe(100);
    });

    it('should return lower score for strong wind', () => {
      expect(comfortIndex.calculateWindScore(15)).toBeLessThan(50);
    });
  });

  describe('calculatePressureScore', () => {
    it('should return 100 for standard pressure', () => {
      expect(comfortIndex.calculatePressureScore(1013)).toBe(100);
    });

    it('should return lower score for pressure deviation', () => {
      expect(comfortIndex.calculatePressureScore(1030)).toBeLessThan(100);
    });
  });

  describe('calculateVisibilityScore', () => {
    it('should return 100 for excellent visibility', () => {
      expect(comfortIndex.calculateVisibilityScore(10)).toBe(100);
      expect(comfortIndex.calculateVisibilityScore(15)).toBe(100);
    });

    it('should return proportional score for reduced visibility', () => {
      expect(comfortIndex.calculateVisibilityScore(5)).toBe(50);
    });
  });

  describe('calculateCloudinessScore', () => {
    it('should return 100 for clear skies', () => {
      expect(comfortIndex.calculateCloudinessScore(10)).toBe(100);
    });

    it('should return lower score for overcast conditions', () => {
      expect(comfortIndex.calculateCloudinessScore(80)).toBeLessThan(50);
    });
  });
});
