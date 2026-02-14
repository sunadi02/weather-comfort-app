<template>
  <div class="card">
    <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div class="flex-1 w-full sm:w-auto">
        <label class="block text-sm font-medium mb-2">Search Cities</label>
        <input
          v-model="filterText"
          type="text"
          placeholder="Filter by city or country..."
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div class="w-full sm:w-auto">
        <label class="block text-sm font-medium mb-2">Sort By</label>
        <select
          v-model="sortBy"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="rank">Comfort Rank</option>
          <option value="temperature">Temperature</option>
          <option value="name">City Name</option>
        </select>
      </div>

      <div v-if="cached" class="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 mt-6">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span>Cached</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  filterText: String,
  sortBy: String,
  cached: Boolean,
});

defineEmits(['update:filterText', 'update:sortBy']);
</script>