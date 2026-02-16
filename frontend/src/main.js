import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { setupAuth0 } from './auth';

if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
}

const app = createApp(App);

setupAuth0(app);

app.mount('#app');