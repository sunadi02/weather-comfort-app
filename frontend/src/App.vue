<template>
  <div v-if="isLoading" class="min-h-screen flex items-center justify-center">
    <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
  </div>
  <Dashboard v-else-if="isAuthenticated" />
  <Login v-else />
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
import Dashboard from './views/Dashboard.vue';
import Login from './views/Login.vue';

const { isLoading, isAuthenticated } = useAuth0();
</script>