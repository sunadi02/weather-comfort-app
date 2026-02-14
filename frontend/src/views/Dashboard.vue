<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AppHeader />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-6">
        <h2 class="text-2xl font-bold mb-2">City Comfort Rankings</h2>
        <p class="text-gray-600 dark:text-gray-400">
          Real-time weather comfort analysis across {{ cities.length }} cities worldwide
        </p>
      </div>

      <FilterBar
        v-model:filter-text="filterText"
        v-model:sort-by="sortBy"
        :cached="cached"
        class="mb-6"
      />

      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
      </div>

      <div v-else-if="error" class="card bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
        <p class="text-red-800 dark:text-red-200">{{ error }}</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WeatherCard
          v-for="city in filteredCities"
          :key="city.cityId"
          :city="city"
        />
      </div>

      <div v-if="!loading && filteredCities.length === 0 && filterText" class="text-center py-12">
        <p class="text-gray-600 dark:text-gray-400">No cities match your search</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import AppHeader from '../components/AppHeader.vue';
import WeatherCard from '../components/WeatherCard.vue';
import FilterBar from '../components/FilterBar.vue';
import { useWeather } from '../composables/useWeather';

const { getAccessTokenSilently } = useAuth0();
const { cities, filteredCities, loading, error, cached, sortBy, filterText, fetchWeather } = useWeather();

onMounted(async () => {
  const token = await getAccessTokenSilently();
  await fetchWeather(token);
});
</script>