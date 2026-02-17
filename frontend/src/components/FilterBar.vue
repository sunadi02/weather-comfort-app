<template>
  <div class="card">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div class="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
        <h3 class="text-lg font-bold whitespace-nowrap">Sort by:</h3>
        <select
          :value="sortBy"
          @change="$emit('update:sortBy', $event.target.value)"
          class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="rank">Rank</option>
          <option value="cityName">City Name</option>
          <option value="country">Country</option>
          <option value="temperature">Temperature</option>
          <option value="humidity">Humidity</option>
          <option value="windSpeed">Wind Speed</option>
          <option value="comfortScore">Comfort Score</option>
        </select>

        <button
          @click="$emit('toggleSortOrder')"
          class="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
          :title="sortOrder === 'asc' ? 'Ascending' : 'Descending'"
        >
          <svg v-if="sortOrder === 'asc'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
          </svg>
          <span class="hidden sm:inline">{{ sortOrder === 'asc' ? 'Ascending' : 'Descending' }}</span>
        </button>
      </div>

      <div class="flex-1 lg:max-w-md">
        <div class="relative">
          <svg
            class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            :value="searchText"
            @input="$emit('update:searchText', $event.target.value)"
            type="text"
            placeholder="Search by city or country..."
            class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  sortBy: {
    type: String,
    default: 'rank'
  },
  sortOrder: {
    type: String,
    default: 'asc'
  },
  searchText: {
    type: String,
    default: ''
  }
});

defineEmits(['update:sortBy', 'update:searchText', 'toggleSortOrder']);
</script>
