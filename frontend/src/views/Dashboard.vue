<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AppHeader @refresh="refreshData" />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <LoadingSpinner v-if="loading"></LoadingSpinner>

      <ErrorDisplay 
        v-else-if="error"
        title="Failed to load weather data"
        :message="error"
      />

      <div v-else class="space-y-6">
        <FilterBar
          v-model:sort-by="sortBy"
          v-model:search-text="searchText"
          :sort-order="sortOrder"
          @toggle-sort-order="toggleSortOrder"
        />

        <section class="card">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">City Comfort Rankings</h2>
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button
                  @click="viewMode = 'grid'"
                  :class="viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'"
                  class="px-3 py-1 rounded text-sm transition-all"
                >
                  Grid
                </button>
                <button
                  @click="viewMode = 'table'"
                  :class="viewMode === 'table' ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'"
                  class="px-3 py-1 rounded text-sm transition-all"
                >
                  Table
                </button>
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400" v-if="lastUpdated">
                Last updated: {{ lastUpdated }}
              </div>
            </div>
          </div>
          <div class="overflow-y-auto pr-2" style="max-height: 600px;">
            <WeatherTable
              v-if="viewMode === 'grid'"
              :cities="sortedAndFilteredCities"
            />
            <WeatherTableView
              v-else
              :cities="sortedAndFilteredCities"
            />

            <div v-if="sortedAndFilteredCities.length === 0 && searchText" class="text-center py-8 text-gray-400">
              No cities match your search
            </div>
          </div>
        </section>

        <TemperatureChart :cities="cities" />
      </div>
    </main>
  </div>
</template>

<script setup>
import LoadingSpinner from '../components/LoadingSpinner.vue';
import ErrorDisplay from '../components/ErrorDisplay.vue';
import { ref, computed, onMounted } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import AppHeader from '../components/AppHeader.vue';
import WeatherTable from '../components/WeatherTable.vue';
import WeatherTableView from '../components/WeatherTableView.vue';
import FilterBar from '../components/FilterBar.vue';
import TemperatureChart from '../components/TemperatureChart.vue';
import { useWeather } from '../composables/useWeather';

const { getAccessTokenSilently } = useAuth0();
const { cities, loading, error, fetchWeather } = useWeather();

const searchText = ref('');
const sortBy = ref('rank');
const sortOrder = ref('asc');
const viewMode = ref('grid');
const lastUpdated = ref('');

function updateTimestamp() {
  const now = new Date();
  lastUpdated.value = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });
}

const sortedAndFilteredCities = computed(() => {
  let result = cities.value;

  if (searchText.value) {
    const search = searchText.value.toLowerCase();
    result = result.filter(city =>
      city.cityName.toLowerCase().includes(search) ||
      city.country.toLowerCase().includes(search)
    );
  }

  result = [...result].sort((a, b) => {
    let aVal = a[sortBy.value];
    let bVal = b[sortBy.value];

    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (sortOrder.value === 'asc') {
      return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
    } else {
      return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
    }
  });

  return result;
});

function toggleSortOrder() {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
}

async function refreshData() {
  const token = await getAccessTokenSilently();
  await fetchWeather(token);
  updateTimestamp();
}

onMounted(async () => {
  await refreshData();
});
</script>
