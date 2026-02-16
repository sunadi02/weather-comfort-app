class ComfortIndexCalculator {
  calculate(weatherData) {
    const temp = weatherData.main.temp - 273.15;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const pressure = weatherData.main.pressure;
    const visibility = weatherData.visibility / 1000;
    const cloudiness = weatherData.clouds.all;

    const tempScore = this.calculateTemperatureScore(temp);
    const humidityScore = this.calculateHumidityScore(humidity);
    const windScore = this.calculateWindScore(windSpeed);
    const pressureScore = this.calculatePressureScore(pressure);
    const visibilityScore = this.calculateVisibilityScore(visibility);
    const cloudinessScore = this.calculateCloudinessScore(cloudiness);

    const comfortScore = (
      tempScore * 0.30 +
      humidityScore * 0.25 +
      windScore * 0.15 +
      pressureScore * 0.10 +
      visibilityScore * 0.10 +
      cloudinessScore * 0.10
    );

    return Math.round(comfortScore * 100) / 100;
  }

  calculateTemperatureScore(temp) {
    if (temp >= 18 && temp <= 24) return 100;
    if (temp >= 15 && temp < 18) return 100 - (18 - temp) * 10;
    if (temp > 24 && temp <= 27) return 100 - (temp - 24) * 10;
    if (temp >= 10 && temp < 15) return 70 - (15 - temp) * 8;
    if (temp > 27 && temp <= 35) return 70 - (temp - 27) * 8;
    return Math.max(0, 30 - Math.abs(temp - 21) * 3);
  }

  calculateHumidityScore(humidity) {
    if (humidity >= 40 && humidity <= 60) return 100;
    if (humidity >= 30 && humidity < 40) return 100 - (40 - humidity) * 3;
    if (humidity > 60 && humidity <= 70) return 100 - (humidity - 60) * 3;
    return Math.max(0, 70 - Math.abs(humidity - 50) * 2);
  }

  calculateWindScore(windSpeed) {
    if (windSpeed <= 5) return 100;
    if (windSpeed <= 10) return 100 - (windSpeed - 5) * 10;
    return Math.max(0, 50 - (windSpeed - 10) * 5);
  }

  calculatePressureScore(pressure) {
    const ideal = 1013;
    const deviation = Math.abs(pressure - ideal);
    if (deviation <= 5) return 100;
    return Math.max(0, 100 - deviation * 2);
  }

  calculateVisibilityScore(visibility) {
    if (visibility >= 10) return 100;
    return Math.max(0, visibility * 10);
  }

  calculateCloudinessScore(cloudiness) {
    if (cloudiness <= 20) return 100;
    if (cloudiness <= 50) return 100 - (cloudiness - 20);
    return Math.max(0, 50 - (cloudiness - 50) * 0.8);
  }
}

module.exports = new ComfortIndexCalculator();