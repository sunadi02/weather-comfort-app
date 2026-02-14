<template>
  <div class="card hover:shadow-lg transition-shadow">
    <div class="flex justify-between items-start mb-4">
      <div>
        <div class="flex items-center gap-2">
          <h3 class="text-lg font-semibold">{{ city.cityName }}</h3>
          <span class="text-sm text-gray-500 dark:text-gray-400">{{ city.country }}</span>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400 capitalize">{{ city.description }}</p>
      </div>
      <img 
        :src="`https://openweathermap.org/img/wn/${city.icon}@2x.png`"
        :alt="city.description"
        class="w-16 h-16"
      />
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <p class="text-sm text-gray-600 dark:text-gray-400">Temperature</p>
        <p class="text-2xl font-bold">{{ city.temperature }}°C</p>
      </div>
      <div>
        <p class="text-sm text-gray-600 dark:text-gray-400">Feels Like</p>
        <p class="text-2xl font-bold">{{ city.feelsLike }}°C</p>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-3 mb-4 text-sm">
      <div>
        <p class="text-gray-600 dark:text-gray-400">Humidity</p>
        <p class="font-medium">{{ city.humidity }}%</p>
      </div>
      <div>
        <p class="text-gray-600 dark:text-gray-400">Wind</p>
        <p class="font-medium">{{ city.windSpeed }} m/s</p>
      </div>
      <div>
        <p class="text-gray-600 dark:text-gray-400">Pressure</p>
        <p class="font-medium">{{ city.pressure }} hPa</p>
      </div>
    </div>

    <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
      <div class="flex justify-between items-center">
        <div>
          <p class="text-sm text-gray-600 dark:text-gray-400">Comfort Score</p>
          <p class="text-3xl font-bold" :class="comfortLevel.color">{{ city.comfortScore }}</p>
        </div>
        <div class="text-right">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30">
            <span class="text-lg">🏆</span>
            <span class="font-semibold text-primary-700 dark:text-primary-300">Rank #{{ city.rank }}</span>
          </div>
          <p class="text-sm mt-1" :class="comfortLevel.color">{{ comfortLevel.label }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  city: {
    type: Object,
    required: true,
  },
});

const comfortLevel = computed(() => {
  const score = props.city.comfortScore;
  if (score >= 80) return { label: 'Excellent', color: 'text-green-600 dark:text-green-400' };
  if (score >= 60) return { label: 'Good', color: 'text-blue-600 dark:text-blue-400' };
  if (score >= 40) return { label: 'Fair', color: 'text-yellow-600 dark:text-yellow-400' };
  return { label: 'Poor', color: 'text-red-600 dark:text-red-400' };
});
</script>