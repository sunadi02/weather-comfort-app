import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { setupAuth0 } from './auth';

const app = createApp(App);

setupAuth0(app);

app.mount('#app');