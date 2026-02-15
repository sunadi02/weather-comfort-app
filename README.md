# Weather Comfort Index Application

A full-stack application that ranks cities based on a custom comfort index calculated from real-time weather data.

## Overview

This application fetches weather data from OpenWeatherMap API, processes it using a custom algorithm, and displays ranked results with authentication and caching.

## Comfort Index Algorithm

The comfort score (0-100) uses six weighted parameters:

**Formula:**
```
Score = Temperature(30%) + Humidity(25%) + Wind(15%) + Pressure(10%) + Visibility(10%) + Cloudiness(10%)
```

**Parameter Details:**

- **Temperature (30%)**: Optimal 18-24°C. Temperature has the strongest impact on human comfort.
- **Humidity (25%)**: Optimal 40-60%. High humidity reduces evaporative cooling effectiveness.
- **Wind Speed (15%)**: Optimal 0-5 m/s. Light breeze preferred, strong winds cause discomfort.
- **Pressure (10%)**: Optimal 1008-1018 hPa. Deviations can affect some individuals.
- **Visibility (10%)**: Optimal ≥10km. Clear conditions indicate pleasant weather.
- **Cloudiness (10%)**: Optimal 0-20%. Some cloud cover acceptable, overcast reduces comfort.

**Design Rationale:**

Temperature receives highest weight as it most directly affects thermal comfort. Humidity ranked second due to its impact on perceived temperature. Wind, pressure, visibility, and cloudiness have supporting roles. Non-linear scoring penalizes values outside optimal ranges more heavily, reflecting human comfort thresholds.

**Trade-offs:**

- Single universal formula rather than regional variations
- Current weather only (no forecasts)
- Excludes precipitation (not always available)
- No user preference customization

## Technology Stack

**Backend:**
- Node.js + Express
- node-cache (in-memory caching, 5min TTL)
- Auth0 JWT validation
- Rate limiting and security middleware

**Frontend:**
- Vue 3 (Composition API)
- Tailwind CSS with dark mode
- Auth0 authentication
- Chart.js for visualizations
- Axios for API requests

## Setup Instructions

### Prerequisites

- Node.js 16+
- Auth0 account (free tier)
- OpenWeatherMap API key (free tier)

### Get API Keys

**OpenWeatherMap:**
1. Register at https://openweathermap.org/api
2. Copy API key from dashboard

**Auth0:**
1. Create account at https://auth0.com
2. Create Single Page Application
3. Create API in Auth0 with identifier (e.g., `https://weather-comfort-api`)
4. Configure Application Settings:
   - Allowed Callback URLs: `http://localhost:5173`
   - Allowed Logout URLs: `http://localhost:5173`
   - Allowed Web Origins: `http://localhost:5173`
5. Enable Multi-Factor Authentication:
   - Navigate to Security > Multi-factor Auth
   - Enable Email verification
6. Restrict Signups:
   - Go to Authentication > Database > Username-Password-Authentication
   - Toggle "Disable Sign Ups" to ON
7. Create Test User:
   - Email: `careers@fidenz.com`
   - Password: `Pass#fidenz`
   - Verify email manually if needed

### Installation

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env` with your credentials:
```env
PORT=3000
OPENWEATHER_API_KEY=your_openweather_api_key
CACHE_TTL=300
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_AUDIENCE=https://weather-comfort-api
```

Start backend server:
```bash
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env
```

Edit `frontend/.env` with your credentials:
```env
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your_spa_client_id
VITE_AUTH0_AUDIENCE=https://weather-comfort-api
VITE_API_URL=http://localhost:3000/api
```

Start frontend server:
```bash
npm run dev
```

Access application at `http://localhost:5173`

## Cache Design

**Implementation:**
- In-memory storage using node-cache
- 5-minute TTL on weather data
- Single cache key for all cities (processed together)
- Automatic invalidation on expiry

**Rationale:**
Weather changes gradually, so 5 minutes balances data freshness with API quota conservation. Caching entire response rather than individual cities reduces complexity. Processing all cities together is more efficient than individual requests.

**Limitations:**
- Cache lost on server restart
- Not shared across multiple instances
- Memory-bound storage

**Debug Endpoint:**
```bash
GET http://localhost:3000/api/weather/cache/status
```

Returns cache statistics and hit/miss counts.

## Authentication

Uses Auth0 with OAuth 2.0 flow:

1. User redirected to Auth0 login
2. Email verification (MFA) required
3. JWT token issued on success
4. Token validated on each protected API request
5. Public signups disabled (whitelist only)

**Test Credentials:**
- Email: `careers@fidenz.com`
- Password: `Pass#fidenz`

## Project Structure
```
weather-comfort-app/
├── backend/
│   ├── data/
│   │   └── cities.json          # City IDs for OpenWeatherMap
│   ├── src/
│   │   ├── config/
│   │   │   └── index.js         # Environment configuration
│   │   ├── middleware/
│   │   │   └── auth.js          # JWT validation
│   │   ├── routes/
│   │   │   └── weather.js       # API routes
│   │   ├── services/
│   │   │   ├── comfortIndex.js  # Scoring algorithm
│   │   │   └── weatherService.js # API integration
│   │   └── server.js            # Express app entry
│   ├── .env.example
│   ├── jest.config.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── auth/
│   │   │   └── index.js         # Auth0 setup
│   │   ├── components/
│   │   │   ├── AppHeader.vue
│   │   │   ├── FilterBar.vue
│   │   │   ├── TemperatureChart.vue
│   │   │   └── WeatherTable.vue
│   │   ├── composables/
│   │   │   ├── useDarkMode.js
│   │   │   └── useWeather.js
│   │   ├── services/
│   │   │   └── api.js           # Axios client
│   │   ├── views/
│   │   │   ├── Dashboard.vue
│   │   │   └── Login.vue
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── style.css
│   ├── .env.example
│   ├── index.html
│   └── package.json
├── .gitignore
└── README.md
```

## API Endpoints

```
GET  /health                      - Health check (returns 200 OK)
GET  /api/weather/cities          - Get ranked cities (JWT protected)
GET  /api/weather/cache/status    - Cache statistics (public)
```

**Response Format:**
```json
{
  "success": true,
  "cached": false,
  "data": [
    {
      "rank": 1,
      "cityName": "San Francisco",
      "country": "US",
      "temperature": 18.5,
      "humidity": 55,
      "windSpeed": 3.2,
      "comfortScore": 92.4,
      "icon": "01d",
      "description": "clear sky"
    }
  ]
}
```

## Features

- Real-time weather data from OpenWeatherMap
- Custom comfort scoring algorithm (6 parameters)
- Server-side caching (5-minute TTL)
- Secure authentication with MFA
- Responsive design (mobile + desktop)
- Dark mode support
- Search by city/country
- Sort by 7 criteria (rank, name, country, temperature, humidity, wind, score)
- Temperature trend visualization
- Last updated timestamp

## Known Limitations

- In-memory cache (lost on restart, not distributed)
- OpenWeatherMap free tier: 60 calls/min
- Temperature trends use mock data (historical API requires paid tier)
- Fixed comfort algorithm (no user customization)
- 24 cities maximum (expandable but affects performance)
- Weather data differences from Google (different providers/update times)

## Development

Start both servers in separate terminals:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

Backend runs on `http://localhost:3000`
Frontend runs on `http://localhost:5173`

## Testing

Run unit tests for comfort index calculator:
```bash
cd backend
npm test
```

Coverage includes all scoring functions and edge cases.

## Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## License

MIT
