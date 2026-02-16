<template>
  <div class="card">
    <h3 class="text-lg font-bold mb-4">Temperature Comparison</h3>
    
    <div v-if="!cities || cities.length === 0" class="text-center py-8 text-gray-400">
      No data available
    </div>
    
    <div v-else class="space-y-3 max-h-96 overflow-y-auto pr-2">
      <div v-for="city in sortedCities" :key="city.cityId" class="flex items-center gap-3">
        <div class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
          {{ city.cityName }}
        </div>
        <div class="flex-1">
          <div class="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
            <div
              :class="getTemperatureColor(city.temperature)"
              class="absolute top-0 left-0 h-full transition-all duration-500 flex items-center justify-end pr-2"
              :style="{ width: getBarWidth(city.temperature) }"
            >
              <span class="text-xs font-bold text-white drop-shadow">
                {{ city.temperature }}°C
              </span>
            </div>
          </div>
        </div>
        <div class="w-12 text-right text-xs text-gray-500 dark:text-gray-400">
          #{{ city.rank }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  cities: {
    type: Array,
    default: () => []
  }
});

const sortedCities = computed(() => {
  return [...props.cities].sort((a, b) => b.temperature - a.temperature);
});

const getBarWidth = (temp) => {
  // Scale temperature to percentage (assuming range -10°C to 45°C)
  const minTemp = -10;
  const maxTemp = 45;
  const normalized = Math.max(0, Math.min(100, ((temp - minTemp) / (maxTemp - minTemp)) * 100));
  return `${normalized}%`;
};

const getTemperatureColor = (temp) => {
  if (temp >= 30) return 'bg-red-600/80';
  if (temp >= 25) return 'bg-orange-600/80';
  if (temp >= 18) return 'bg-emerald-600/80';
  if (temp >= 10) return 'bg-blue-600/80';
  return 'bg-indigo-600/80';
};
</script>
