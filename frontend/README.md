# Weather Comfort Dashboard Frontend

Vue 3 frontend application for weather comfort analytics.

## Features

- Interactive dashboard with city rankings
- Temperature trend charts
- Search and filter functionality
- Dark mode support
- Responsive design
- Auth0 authentication

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with Auth0 credentials

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Environment Variables

```env
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your_client_id
VITE_AUTH0_AUDIENCE=your-audience
VITE_API_URL=http://localhost:3000/api
```

## Project Structure

```
src/
├── components/       # Reusable Vue components
├── composables/      # Vue composition functions
├── services/         # API and external services
├── views/           # Page components
├── auth/            # Authentication configuration
├── main.js          # Application entry point
└── style.css        # Global styles
```

## Components

- **AppHeader**: Navigation with user info and dark mode toggle
- **WeatherTable**: Grid view of cities with weather data
- **WeatherTableView**: Table view of cities with weather data
- **TemperatureChart**: Bar chart comparing city temperatures
- **FilterBar**: Search and filter controls with sort options
- **LoadingSpinner**: Loading state indicator
- **ErrorDisplay**: Error message display

## Dependencies

- vue: Progressive JavaScript framework
- @auth0/auth0-vue: Auth0 authentication
- axios: HTTP client
- tailwindcss: Utility-first CSS framework
- vite: Build tool
