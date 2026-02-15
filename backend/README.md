# Weather Comfort API Backend

Express.js backend API for weather comfort analytics.

## Features

- OpenWeatherMap API integration
- Custom comfort index calculation
- JWT authentication with Auth0
- Server-side caching (5 min TTL)
- Rate limiting and security headers
- RESTful API design

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with required variables

3. Run development server:
```bash
npm run dev
```

4. Run production server:
```bash
npm start
```

## Environment Variables

```env
PORT=3000
OPENWEATHER_API_KEY=your_api_key
CACHE_TTL=300
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_AUDIENCE=your-audience
```

## API Documentation

### GET /api/weather/cities
Fetch weather data and comfort scores for all cities.

**Authentication**: Required (JWT Bearer token)

**Response**:
```json
{
  "success": true,
  "cached": false,
  "data": [
    {
      "cityId": 5128581,
      "cityName": "New York",
      "country": "US",
      "temperature": 15.5,
      "humidity": 65,
      "windSpeed": 3.5,
      "comfortScore": 78.5,
      "rank": 1
    }
  ]
}
```

### GET /api/weather/cache/status
Get cache statistics.

**Authentication**: Not required

**Response**:
```json
{
  "success": true,
  "cache": {
    "keys": 1,
    "stats": {
      "hits": 10,
      "misses": 2
    }
  }
}
```

### GET /health
Health check endpoint.

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2026-02-15T10:30:00.000Z"
}
```

## Testing

Run tests:
```bash
npm test
```

## Dependencies

- express: Web framework
- axios: HTTP client
- node-cache: Caching library
- express-oauth2-jwt-bearer: Auth0 authentication
- helmet: Security headers
- cors: Cross-origin resource sharing
- express-rate-limit: Rate limiting
- dotenv: Environment variables
