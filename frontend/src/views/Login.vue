<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 px-4">
    <div class="max-w-md w-full">
      <div class="card text-center">
        <div class="mb-8">
          <svg class="w-20 h-20 mx-auto text-primary-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
          <h1 class="text-3xl font-bold mb-2">Weather Comfort Index</h1>
          <p class="text-gray-600 dark:text-gray-400">
            Discover the most comfortable cities based on real-time weather data
          </p>
        </div>

        <button
          @click="login"
          class="btn-primary w-full py-3 text-lg"
        >
          Sign In to Continue
        </button>

        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Analyzing comfort across temperature, humidity, wind, and more
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue';

const { loginWithRedirect } = useAuth0();

const login = () => {
  loginWithRedirect();
};
</script>