<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead class="bg-gray-100 dark:bg-gray-800">
        <tr>
          <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            Rank
          </th>
          <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            City
          </th>
          <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            Weather
          </th>
          <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            Temperature
          </th>
          <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            Humidity
          </th>
          <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            Wind
          </th>
          <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            Comfort Score
          </th>
        </tr>
      </thead>
      <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
        <tr 
          v-for="city in cities" 
          :key="city.cityId"
          class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <td class="px-4 py-3 whitespace-nowrap">
            <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-500/20 text-primary-400 font-bold text-sm">
              {{ city.rank }}
            </span>
          </td>
          <td class="px-4 py-3 whitespace-nowrap">
            <div class="font-medium text-gray-900 dark:text-white">{{ city.cityName }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">{{ city.country }}</div>
          </td>
          <td class="px-4 py-3 whitespace-nowrap">
            <div class="flex items-center gap-2">
              <img
                v-if="city.icon"
                :src="`https://openweathermap.org/img/wn/${city.icon}.png`"
                :alt="city.description"
                class="w-8 h-8"
              />
              <span class="text-sm text-gray-600 dark:text-gray-300 capitalize">
                {{ city.description }}
              </span>
            </div>
          </td>
          <td class="px-4 py-3 whitespace-nowrap">
            <span class="text-lg font-semibold text-gray-900 dark:text-white">{{ city.temperature }}°C</span>
          </td>
          <td class="px-4 py-3 whitespace-nowrap">
            <span class="text-gray-700 dark:text-gray-300">{{ city.humidity }}%</span>
          </td>
          <td class="px-4 py-3 whitespace-nowrap">
            <span class="text-gray-700 dark:text-gray-300">{{ city.windSpeed }} m/s</span>
          </td>
          <td class="px-4 py-3 whitespace-nowrap">
            <span class="text-lg font-bold text-primary-500">{{ city.comfortScore }}</span>
          </td>
        </tr>
      </tbody>
    </table>
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
