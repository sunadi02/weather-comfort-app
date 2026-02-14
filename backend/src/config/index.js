require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  openWeatherApiKey: process.env.OPENWEATHER_API_KEY,
  cacheTTL: parseInt(process.env.CACHE_TTL) || 300,
  auth0: {
    domain: process.env.AUTH0_DOMAIN,
    audience: process.env.AUTH0_AUDIENCE
  }
};