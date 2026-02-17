<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <div class="max-w-md w-full">
      <div class="card">
        <div class="text-center mb-8">
          <div class="flex items-center justify-center gap-3 mb-4">
            <svg class="w-10 h-10 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            <span class="text-2xl font-bold text-gray-900 dark:text-white">Climate Comfort</span>
          </div>
          <h1 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Weather Dashboard</h1>
          <p class="text-gray-600 dark:text-gray-300 text-sm">Welcome! Please sign in to continue</p>
        </div>

        <button
          @click="login"
          class="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
        >
          Sign In
        </button>

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
