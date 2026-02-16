<template>
  <div>
    <div v-if="!cities || cities.length === 0" class="text-center py-8 text-gray-400">
      No cities to display
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="city in cities" 
        :key="city.cityId"
        class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 dark:border-gray-600"
      >
        <div class="flex items-start justify-between mb-3">
          <div>
            <div class="font-bold text-lg text-gray-900 dark:text-white">
              {{ city.cityName }}, {{ city.country }}
            </div>
          </div>
          <div class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-500/20 text-primary-400 font-bold text-sm">
            {{ city.rank }}
          </div>
        </div>

        <div class="flex items-center gap-2 mb-2">
          <img
            v-if="city.icon"
            :src="`https://openweathermap.org/img/wn/${city.icon}.png`"
            :alt="city.description"
            class="w-10 h-10"
          />
          <div class="text-sm text-gray-600 dark:text-gray-300 capitalize">
            {{ city.description }}
          </div>
        </div>

        <div class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {{ city.temperature }}°C
        </div>

        <div class="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          <span>{{ city.windSpeed }} m/s</span>
        </div>

        <div class="flex items-center justify-between pt-3 border-t border-gray-300 dark:border-gray-600">
          <span class="text-sm text-gray-500 dark:text-gray-400">Comfort Score</span>
          <span class="text-lg font-bold text-primary-500">{{ city.comfortScore }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  cities: {
    type: Array,
    default: () => []
  }
});
</script>
