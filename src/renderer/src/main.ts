import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import '@/assets/styles/tailwind.css';
import '@/assets/styles/index.css';
import 'element-plus/dist/index.css';
import router from '@/router/index';
import App from '@/App.vue';

createApp(App).use(ElementPlus).use(router).mount('#app');
